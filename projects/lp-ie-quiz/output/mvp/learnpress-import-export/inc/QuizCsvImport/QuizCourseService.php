<?php
/**
 * Course / section helpers for multi-quiz import.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCourseService {

	/**
	 * Search courses user can edit.
	 *
	 * @return array<int,array{id:int,title:string}>
	 */
	public static function search_courses( string $search = '', int $limit = 30 ): array {
		$cpt  = defined( 'LP_COURSE_CPT' ) ? LP_COURSE_CPT : 'lp_course';
		$args = array(
			'post_type'              => $cpt,
			'post_status'            => array( 'publish', 'draft', 'pending', 'private' ),
			'posts_per_page'         => $limit,
			'orderby'                => 'title',
			'order'                  => 'ASC',
			's'                      => $search,
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		);
		if ( ! current_user_can( 'manage_options' ) && ! current_user_can( 'edit_others_lp_courses' ) ) {
			$args['author'] = get_current_user_id();
		}
		$query = new \WP_Query( $args );
		$items = array();
		foreach ( $query->posts as $post ) {
			if ( ! current_user_can( 'edit_post', $post->ID ) ) {
				continue;
			}
			$items[] = array(
				'id'    => (int) $post->ID,
				'title' => get_the_title( $post ),
			);
		}
		return $items;
	}

	public static function can_edit_course( int $course_id ): bool {
		if ( $course_id <= 0 ) {
			return false;
		}
		$post = get_post( $course_id );
		$cpt  = defined( 'LP_COURSE_CPT' ) ? LP_COURSE_CPT : 'lp_course';
		if ( ! $post || $post->post_type !== $cpt ) {
			return false;
		}
		return current_user_can( 'edit_post', $course_id );
	}

	/**
	 * Find a section in a course by exact name.
	 */
	public static function find_section_id_by_name( int $course_id, string $section_name ): int {
		if ( $course_id <= 0 || $section_name === '' ) {
			return 0;
		}

		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		return (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT section_id FROM {$wpdb->prefix}learnpress_sections WHERE section_course_id = %d AND section_name = %s LIMIT 1",
				$course_id,
				$section_name
			)
		);
	}

	/**
	 * Get or create a section for imported quizzes.
	 *
	 * @return int|WP_Error section_id
	 */
	public static function get_or_create_import_section( int $course_id, string $section_name = '' ) {
		if ( ! class_exists( 'LP_Section_CURD' ) ) {
			return new \WP_Error( 'lp_ie_no_section', __( 'LearnPress section API is not available.', 'learnpress-import-export' ) );
		}
		if ( $section_name === '' ) {
			$section_name = __( 'Imported quizzes', 'learnpress-import-export' );
		}

		$existing = self::find_section_id_by_name( $course_id, $section_name );
		if ( $existing > 0 ) {
			QuizCsvDebug::log(
				'section_found',
				array(
					'course_id'    => $course_id,
					'section_id'   => $existing,
					'section_name' => $section_name,
				)
			);
			return $existing;
		}

		$curd         = new \LP_Section_CURD( $course_id );
		$section_args = array(
			'section_name'        => $section_name,
			'section_course_id'   => $course_id,
			'section_description' => __( 'Created by Quiz Import', 'learnpress-import-export' ),
		);
		$section      = $curd->create( $section_args );
		if ( empty( $section['section_id'] ) ) {
			global $wpdb;
			QuizCsvDebug::log(
				'section_create_failed',
				array(
					'course_id'    => $course_id,
					'section_name' => $section_name,
					'last_error'   => $wpdb->last_error ?? '',
					'result'       => $section,
				)
			);
			return new \WP_Error( 'lp_ie_section_create', __( 'Failed to create course section for quizzes.', 'learnpress-import-export' ) );
		}
		QuizCsvDebug::log(
			'section_created',
			array(
				'course_id'    => $course_id,
				'section_id'   => (int) $section['section_id'],
				'section_name' => $section_name,
			)
		);
		return (int) $section['section_id'];
	}

	/**
	 * Attach quiz to course section curriculum.
	 */
	public static function attach_quiz_to_section( int $course_id, int $section_id, int $quiz_id ): bool {
		if ( ! class_exists( 'LP_Section_CURD' ) ) {
			QuizCsvDebug::log(
				'section_attach_unavailable',
				array(
					'course_id'  => $course_id,
					'section_id' => $section_id,
					'quiz_id'    => $quiz_id,
				)
			);
			return false;
		}

		global $wpdb;
		$curd     = new \LP_Section_CURD( $course_id );
		$quiz_cpt = defined( 'LP_QUIZ_CPT' ) ? LP_QUIZ_CPT : 'lp_quiz';
		$order    = self::next_section_item_order( $section_id );
		$status   = get_post_status( $quiz_id );

		QuizCsvDebug::log(
			'section_attach_start',
			array(
				'course_id'    => $course_id,
				'section_id'   => $section_id,
				'quiz_id'      => $quiz_id,
				'item_type'    => $quiz_cpt,
				'item_order'   => $order,
				'quiz_status'  => $status,
				'visibility'   => $status === 'publish' ? 'visible_to_learnpress_course_query' : 'may_be_hidden_until_published',
			)
		);

		if ( method_exists( $curd, 'assign_item_section' ) ) {
			$curd->assign_item_section(
				$section_id,
				array(
					'item_id'    => $quiz_id,
					'item_type'  => $quiz_cpt,
					'item_order' => $order,
				)
			);
		} else {
			$curd->add_items_section(
				$section_id,
				array(
					array(
						'id'   => $quiz_id,
						'type' => $quiz_cpt,
					),
				)
			);
		}

		$row = self::get_section_item_row( $section_id, $quiz_id );
		if ( ! $row ) {
			self::upsert_section_item( $section_id, $quiz_id, $quiz_cpt, $order );
			$row = self::get_section_item_row( $section_id, $quiz_id );
		}

		self::clean_course_curriculum_cache( $course_id, $section_id, $quiz_id );

		QuizCsvDebug::log(
			'section_attach_done',
			array(
				'course_id'  => $course_id,
				'section_id' => $section_id,
				'quiz_id'    => $quiz_id,
				'db_row'     => $row,
				'last_error' => $wpdb->last_error ?? '',
			)
		);

		return ! empty( $row );
	}

	private static function next_section_item_order( int $section_id ): int {
		global $wpdb;
		$table = self::section_items_table();
		return max(
			1,
			1 + (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT MAX(item_order) FROM {$table} WHERE section_id = %d",
					$section_id
				)
			)
		);
	}

	private static function get_section_item_row( int $section_id, int $item_id ) {
		global $wpdb;
		$table = self::section_items_table();
		return $wpdb->get_row(
			$wpdb->prepare(
				"SELECT section_item_id, section_id, item_id, item_order, item_type FROM {$table} WHERE section_id = %d AND item_id = %d LIMIT 1",
				$section_id,
				$item_id
			),
			ARRAY_A
		);
	}

	private static function upsert_section_item( int $section_id, int $item_id, string $item_type, int $item_order ): void {
		global $wpdb;
		$table = self::section_items_table();
		$row   = self::get_section_item_row( $section_id, $item_id );
		if ( $row ) {
			$wpdb->update(
				$table,
				array(
					'item_order' => $item_order,
					'item_type'  => $item_type,
				),
				array(
					'section_id' => $section_id,
					'item_id'    => $item_id,
				),
				array( '%d', '%s' ),
				array( '%d', '%d' )
			);
			return;
		}

		$wpdb->insert(
			$table,
			array(
				'section_id' => $section_id,
				'item_id'    => $item_id,
				'item_order' => $item_order,
				'item_type'  => $item_type,
			),
			array( '%d', '%d', '%d', '%s' )
		);
	}

	private static function clean_course_curriculum_cache( int $course_id, int $section_id, int $quiz_id ): void {
		try {
			if ( class_exists( '\LearnPress\Models\CourseModel' ) ) {
				$course_model = \LearnPress\Models\CourseModel::find( $course_id, true );
				if ( $course_model ) {
					$course_model->sections_items = null;
					$course_model->total_items    = null;
					$course_model->save( true );
				}
			}
			if ( class_exists( 'LP_Course_Cache' ) ) {
				$cache = \LP_Course_Cache::instance();
				$cache->clear( "{$course_id}/sections_items" );
				$cache->clear( "{$quiz_id}/course_id_of_item_id" );
			}
			if ( class_exists( 'LP_Cache' ) ) {
				$cache = new \LP_Cache();
				$cache->clear( "courseSectionItem/find/{$section_id}/{$quiz_id}" );
			}
			clean_post_cache( $course_id );
			clean_post_cache( $quiz_id );
		} catch ( \Throwable $e ) {
			QuizCsvDebug::log(
				'course_cache_clean_failed',
				array(
					'course_id'  => $course_id,
					'section_id' => $section_id,
					'quiz_id'    => $quiz_id,
					'error'      => $e->getMessage(),
				)
			);
		}
	}

	private static function section_items_table(): string {
		global $wpdb;
		return isset( $wpdb->learnpress_section_items ) ? $wpdb->learnpress_section_items : $wpdb->prefix . 'learnpress_section_items';
	}
}
