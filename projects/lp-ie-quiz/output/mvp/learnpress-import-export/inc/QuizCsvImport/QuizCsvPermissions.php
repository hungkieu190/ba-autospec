<?php
/**
 * Capability helpers for quiz CSV import.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvPermissions {

	/**
	 * User may open the import tool (admin tools or edit quizzes).
	 */
	public static function can_use_tool(): bool {
		if ( ! is_user_logged_in() ) {
			return false;
		}

		return current_user_can( 'manage_options' )
			|| current_user_can( 'edit_lp_quizzes' )
			|| current_user_can( 'edit_posts' );
	}

	/**
	 * Admin-only global settings.
	 */
	public static function can_manage_settings(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Whether current user can edit a quiz post.
	 */
	public static function can_edit_quiz( int $quiz_id ): bool {
		if ( $quiz_id <= 0 ) {
			return false;
		}

		$post = get_post( $quiz_id );
		if ( ! $post || $post->post_type !== ( defined( 'LP_QUIZ_CPT' ) ? LP_QUIZ_CPT : 'lp_quiz' ) ) {
			return false;
		}

		return current_user_can( 'edit_post', $quiz_id );
	}

	/**
	 * Whether current user may create a new quiz (import full quiz).
	 */
	public static function can_create_quiz(): bool {
		if ( current_user_can( 'manage_options' ) ) {
			return true;
		}
		if ( current_user_can( 'edit_lp_quizzes' ) || current_user_can( 'publish_lp_quizzes' ) ) {
			return true;
		}
		// Fallback: can create posts of quiz type.
		$cpt = defined( 'LP_QUIZ_CPT' ) ? LP_QUIZ_CPT : 'lp_quiz';
		return current_user_can( 'edit_posts' ) || current_user_can( 'create_posts' ) || post_type_exists( $cpt );
	}

	/**
	 * Query args for quiz list (admin: all; instructor: own author or editable).
	 *
	 * @return array WP_Query args fragment.
	 */
	public static function quiz_query_args( string $search = '', int $limit = 20 ): array {
		$cpt = defined( 'LP_QUIZ_CPT' ) ? LP_QUIZ_CPT : 'lp_quiz';
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

		if ( ! current_user_can( 'manage_options' ) && ! current_user_can( 'edit_others_lp_quizzes' ) ) {
			$args['author'] = get_current_user_id();
		}

		return $args;
	}
}
