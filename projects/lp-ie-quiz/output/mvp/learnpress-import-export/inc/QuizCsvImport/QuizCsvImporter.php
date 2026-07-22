<?php
/**
 * Create/update LP questions from validated CSV rows via CURD APIs.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvImporter {

	/**
	 * Create a new LearnPress quiz (for "import full quiz" destination).
	 *
	 * @param array $args title, content, status
	 * @return int|WP_Error Quiz post ID
	 */
	public static function create_quiz( array $args ) {
		if ( ! class_exists( 'LP_Quiz_CURD' ) ) {
			return new \WP_Error( 'lp_ie_no_quiz_curd', __( 'LearnPress quiz APIs are not available.', 'learnpress-import-export' ) );
		}

		$title = trim( (string) ( $args['title'] ?? '' ) );
		if ( $title === '' ) {
			return new \WP_Error( 'lp_ie_quiz_title', __( 'Quiz title is required to create a new quiz.', 'learnpress-import-export' ) );
		}

		$status = strtolower( trim( (string) ( $args['status'] ?? 'publish' ) ) );
		if ( ! in_array( $status, array( 'draft', 'publish', 'pending', 'private' ), true ) ) {
			$status = 'publish';
		}

		$curd      = new \LP_Quiz_CURD();
		$quiz_args = array(
			'title'   => $title,
			'content' => wp_kses_post( (string) ( $args['content'] ?? '' ) ),
			'status'  => $status,
			'author'  => get_current_user_id(),
		);
		$quiz_id   = $curd->create( $quiz_args );

		if ( ! $quiz_id || is_wp_error( $quiz_id ) ) {
			QuizCsvDebug::log(
				'quiz_create_failed',
				array(
					'title'  => $title,
					'status' => $status,
					'result' => $quiz_id,
				)
			);
			return is_wp_error( $quiz_id )
				? $quiz_id
				: new \WP_Error( 'lp_ie_quiz_create_failed', __( 'Failed to create quiz.', 'learnpress-import-export' ) );
		}

		QuizCsvDebug::log(
			'quiz_created',
			array(
				'quiz_id'    => (int) $quiz_id,
				'title'      => $title,
				'status'     => get_post_status( (int) $quiz_id ),
				'visibility' => get_post_status( (int) $quiz_id ) === 'publish' ? 'visible_to_learnpress_course_query' : 'may_be_hidden_until_published',
			)
		);

		return (int) $quiz_id;
	}

	/**
	 * Import a batch of normalized rows into a quiz or content bank.
	 *
	 * @param int   $quiz_id Quiz ID, or 0 = content bank (questions only, not assigned to a quiz).
	 * @param array $items Normalized items with action create|update and normalized payload.
	 * @param array $opts  insert_position, after_n, next_order seed.
	 * @return array{created:int,updated:int,failed:int,errors:array,next_order:int}
	 */
	public static function import_batch( int $quiz_id, array $items, array $opts = array() ): array {
		$result = array(
			'created'    => 0,
			'updated'    => 0,
			'failed'     => 0,
			'errors'     => array(),
			'next_order' => (int) ( $opts['next_order'] ?? 0 ),
		);

		if ( ! class_exists( 'LP_Question_CURD' ) ) {
			$result['failed']   = count( $items );
			$result['errors'][] = __( 'LearnPress question APIs are not available.', 'learnpress-import-export' );
			return $result;
		}

		$to_quiz = $quiz_id > 0;
		if ( $to_quiz && ! class_exists( 'LP_Quiz_CURD' ) ) {
			$result['failed']   = count( $items );
			$result['errors'][] = __( 'LearnPress quiz APIs are not available.', 'learnpress-import-export' );
			return $result;
		}

		if ( $to_quiz && $result['next_order'] <= 0 ) {
			$result['next_order'] = self::resolve_start_order( $quiz_id, $opts );
		}

		$question_curd = new \LP_Question_CURD();
		$quiz_curd     = $to_quiz ? new \LP_Quiz_CURD() : null;

		foreach ( $items as $item ) {
			if ( empty( $item['normalized'] ) || ( $item['status'] ?? '' ) === 'invalid' ) {
				continue;
			}
			$n = $item['normalized'];
			try {
				if ( ( $item['action'] ?? '' ) === 'update' && ! empty( $n['existing_id'] ) ) {
					$qid = (int) $n['existing_id'];
					self::update_question( $qid, $n );
					if ( $to_quiz && $quiz_curd && ! self::quiz_question_exists( $quiz_id, $qid ) ) {
						$added = self::attach_question_to_quiz( $quiz_id, $qid, $result['next_order'], 'update_attach' );
						if ( $added ) {
							++$result['next_order'];
						} else {
							++$result['failed'];
							$result['errors'][] = sprintf(
								/* translators: %s: title */
								__( 'Question updated but could not be attached to quiz: %s', 'learnpress-import-export' ),
								$n['title']
							);
						}
					}
					++$result['updated'];
				} else {
					$question_args = array(
						'quiz_id'        => 0,
						'title'          => $n['title'],
						'content'        => wp_kses_post( $n['content'] ),
						'type'           => $n['type'],
						'status'         => $n['status'] ?: 'publish',
						'create_answers' => false,
					);
					$q             = $question_curd->create( $question_args );
					if ( ! $q || is_wp_error( $q ) ) {
						++$result['failed'];
						$result['errors'][] = sprintf(
							/* translators: %s: title */
							__( 'Failed to create question: %s', 'learnpress-import-export' ),
							$n['title']
						);
						QuizCsvDebug::log(
							'question_create_failed',
							array(
								'quiz_id' => $quiz_id,
								'title'   => $n['title'],
								'type'    => $n['type'],
								'status'  => $n['status'] ?: 'publish',
								'result'  => $q,
							)
						);
						continue;
					}
					$qid = is_object( $q ) && method_exists( $q, 'get_id' ) ? (int) $q->get_id() : (int) $q;
					self::write_meta_and_answers( $qid, $n );
					if ( $to_quiz && $quiz_curd ) {
						$order = $result['next_order'];
						if ( self::attach_question_to_quiz( $quiz_id, $qid, $order, 'create_attach' ) ) {
							++$result['next_order'];
						} else {
							++$result['failed'];
							$result['errors'][] = sprintf(
								/* translators: %s: title */
								__( 'Question created but could not be attached to quiz: %s', 'learnpress-import-export' ),
								$n['title']
							);
							continue;
						}
					}
					++$result['created'];
				}
			} catch ( \Throwable $e ) {
				++$result['failed'];
				$result['errors'][] = $e->getMessage();
				QuizCsvDebug::log(
					'question_import_throwable',
					array(
						'quiz_id' => $quiz_id,
						'title'   => $n['title'] ?? '',
						'type'    => $n['type'] ?? '',
						'error'   => $e->getMessage(),
						'file'    => $e->getFile(),
						'line'    => $e->getLine(),
					)
				);
			}
		}

		return $result;
	}

	private static function attach_question_to_quiz( int $quiz_id, int $question_id, int $order, string $source ): bool {
		global $wpdb;

		$question_post = get_post( $question_id );
		QuizCsvDebug::log(
			'quiz_question_attach_start',
			array(
				'source'          => $source,
				'quiz_id'         => $quiz_id,
				'question_id'     => $question_id,
				'question_title'  => $question_post ? $question_post->post_title : '',
				'question_status' => $question_post ? $question_post->post_status : '',
				'question_type'   => get_post_meta( $question_id, '_lp_type', true ),
				'order'           => $order,
			)
		);

		if ( self::quiz_question_exists( $quiz_id, $question_id ) ) {
			QuizCsvDebug::log(
				'quiz_question_attach_skip_existing',
				array(
					'quiz_id'     => $quiz_id,
					'question_id' => $question_id,
				)
			);
			return true;
		}

		$added = false;
		if ( class_exists( 'LP_Quiz_CURD' ) ) {
			$quiz_curd = new \LP_Quiz_CURD();
			$added     = $quiz_curd->add_question( $quiz_id, $question_id, array( 'order' => $order ) );
		}

		$row = self::get_quiz_question_row( $quiz_id, $question_id );
		if ( ! $row ) {
			self::direct_insert_quiz_question( $quiz_id, $question_id, $order );
			$row = self::get_quiz_question_row( $quiz_id, $question_id );
		}

		self::clean_quiz_question_cache( $quiz_id, $question_id );

		QuizCsvDebug::log(
			'quiz_question_attach_done',
			array(
				'quiz_id'           => $quiz_id,
				'question_id'       => $question_id,
				'requested_order'   => $order,
				'curd_return'       => $added,
				'db_row'            => $row,
				'db_question_count' => self::count_quiz_questions( $quiz_id ),
				'last_error'        => $wpdb->last_error ?? '',
			)
		);

		return ! empty( $row );
	}

	private static function quiz_question_exists( int $quiz_id, int $question_id ): bool {
		return ! empty( self::get_quiz_question_row( $quiz_id, $question_id ) );
	}

	private static function get_quiz_question_row( int $quiz_id, int $question_id ) {
		global $wpdb;
		$table = self::quiz_questions_table();
		return $wpdb->get_row(
			$wpdb->prepare(
				"SELECT quiz_question_id, quiz_id, question_id, question_order FROM {$table} WHERE quiz_id = %d AND question_id = %d LIMIT 1",
				$quiz_id,
				$question_id
			),
			ARRAY_A
		);
	}

	private static function direct_insert_quiz_question( int $quiz_id, int $question_id, int $order ): void {
		global $wpdb;
		$table = self::quiz_questions_table();
		$wpdb->insert(
			$table,
			array(
				'quiz_id'        => $quiz_id,
				'question_id'    => $question_id,
				'question_order' => $order,
			),
			array( '%d', '%d', '%d' )
		);
	}

	private static function clean_quiz_question_cache( int $quiz_id, int $question_id ): void {
		try {
			if ( class_exists( 'LP_Quiz_Cache' ) ) {
				\LP_Quiz_Cache::instance()->clear( "{$quiz_id}/question_ids" );
			}
			if ( class_exists( 'LP_Cache' ) ) {
				$cache = new \LP_Cache();
				$cache->clear( "quizQuestion/find/{$quiz_id}/{$question_id}" );
			}
			clean_post_cache( $quiz_id );
			clean_post_cache( $question_id );
		} catch ( \Throwable $e ) {
			QuizCsvDebug::log(
				'quiz_question_cache_clean_failed',
				array(
					'quiz_id'     => $quiz_id,
					'question_id' => $question_id,
					'error'       => $e->getMessage(),
				)
			);
		}
	}

	private static function quiz_questions_table(): string {
		global $wpdb;
		return isset( $wpdb->learnpress_quiz_questions ) ? $wpdb->learnpress_quiz_questions : $wpdb->prefix . 'learnpress_quiz_questions';
	}

	/**
	 * @param array $opts insert_position end|start|after, after_n
	 */
	public static function resolve_start_order( int $quiz_id, array $opts ): int {
		global $wpdb;
		$position = $opts['insert_position'] ?? 'end';
		$after_n  = max( 1, (int) ( $opts['after_n'] ?? 1 ) );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$max = (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT MAX(question_order) FROM {$wpdb->prefix}learnpress_quiz_questions WHERE quiz_id = %d",
				$quiz_id
			)
		);

		if ( $position === 'start' ) {
			return 1;
		}
		if ( $position === 'after' ) {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$orders = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT question_order FROM {$wpdb->prefix}learnpress_quiz_questions WHERE quiz_id = %d ORDER BY question_order ASC",
					$quiz_id
				)
			);
			if ( empty( $orders ) ) {
				return 1;
			}
			$idx = min( count( $orders ), $after_n ) - 1;
			return (int) $orders[ $idx ] + 1;
		}

		return $max > 0 ? $max + 1 : 1;
	}

	/**
	 * Make room for inserted questions when using start/after positions.
	 */
	public static function shift_existing_question_orders( int $quiz_id, int $start_order, int $offset ): void {
		if ( $quiz_id <= 0 || $start_order <= 0 || $offset <= 0 ) {
			return;
		}

		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$wpdb->prefix}learnpress_quiz_questions SET question_order = question_order + %d WHERE quiz_id = %d AND question_order >= %d",
				$offset,
				$quiz_id,
				$start_order
			)
		);
	}

	/**
	 * Count new questions that will be attached to a quiz. Updates keep their current relation/order.
	 */
	public static function count_creates( array $items ): int {
		$count = 0;
		foreach ( $items as $item ) {
			if ( ( $item['status'] ?? '' ) === 'invalid' || empty( $item['normalized'] ) ) {
				continue;
			}
			if ( ( $item['action'] ?? 'create' ) !== 'update' ) {
				++$count;
			}
		}
		return $count;
	}

	/**
	 * Count questions currently on quiz.
	 */
	public static function count_quiz_questions( int $quiz_id ): int {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		return (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->prefix}learnpress_quiz_questions WHERE quiz_id = %d",
				$quiz_id
			)
		);
	}

	/**
	 * @param array $n Normalized row.
	 */
	private static function update_question( int $question_id, array $n ): void {
		wp_update_post(
			array(
				'ID'           => $question_id,
				'post_title'   => $n['title'],
				'post_content' => wp_kses_post( $n['content'] ),
				'post_status'  => $n['status'] ?: 'publish',
			)
		);

		$curd = new \LP_Question_CURD();
		$curd->clear( $question_id );
		self::write_meta_and_answers( $question_id, $n );
		QuizCsvDebug::log(
			'question_updated',
			array(
				'question_id' => $question_id,
				'title'       => $n['title'],
				'type'        => $n['type'],
				'status'      => get_post_status( $question_id ),
			)
		);
	}

	/**
	 * @param array $n Normalized row.
	 */
	private static function write_meta_and_answers( int $question_id, array $n ): void {
		global $wpdb;

		update_post_meta( $question_id, '_lp_type', $n['type'] );
		update_post_meta( $question_id, '_lp_mark', $n['mark'] );
		update_post_meta( $question_id, '_lp_explanation', wp_kses_post( $n['explanation'] ) );
		update_post_meta( $question_id, '_lp_hint', wp_kses_post( $n['hint'] ) );

		$answers = $n['answers'];
		$flags   = $n['correct_flags'];
		$table   = $wpdb->prefix . 'learnpress_question_answers';
		if ( isset( $wpdb->learnpress_question_answers ) ) {
			$table = $wpdb->learnpress_question_answers;
		}

		foreach ( $answers as $index => $title ) {
			$is_true = ! empty( $flags[ $index ] ) ? 'yes' : '';
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$wpdb->insert(
				$table,
				array(
					'question_id' => $question_id,
					'title'       => wp_strip_all_tags( $title ),
					'value'       => function_exists( 'learn_press_random_value' ) ? learn_press_random_value() : wp_generate_password( 8, false ),
					'is_true'     => $is_true,
					'order'       => $index + 1,
				),
				array( '%d', '%s', '%s', '%s', '%d' )
			);
			$answer_id = (int) $wpdb->insert_id;
			if ( $answer_id > 0 && ( $n['type'] ?? '' ) === 'fill_in_blanks' && $index === 0 ) {
				self::write_answer_meta( $answer_id, '_blanks', $n['fib_blanks'] ?? array() );
			}
		}
		QuizCsvDebug::log(
			'question_meta_answers_written',
			array(
				'question_id'  => $question_id,
				'type'         => $n['type'] ?? '',
				'status'       => get_post_status( $question_id ),
				'answer_count' => count( $answers ),
				'last_error'   => $wpdb->last_error ?? '',
			)
		);
	}

	private static function write_answer_meta( int $answer_id, string $key, $value ): void {
		if ( function_exists( 'learn_press_update_question_answer_meta' ) ) {
			learn_press_update_question_answer_meta( $answer_id, $key, $value );
			return;
		}
		update_metadata( 'learnpress_question_answer', $answer_id, $key, $value );
	}
}
