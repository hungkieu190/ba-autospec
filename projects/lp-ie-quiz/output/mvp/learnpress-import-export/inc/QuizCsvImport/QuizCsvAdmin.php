<?php
/**
 * Admin UI: two screens — Import Quizzes + Import Questions.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvAdmin {

	public function __construct() {
		add_filter( 'lpie_admin_tabs', array( $this, 'register_import_export_tabs' ), 10, 1 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	/**
	 * @param array $tabs
	 * @return array
	 */
	public function register_import_export_tabs( $tabs ) {
		if ( ! is_array( $tabs ) ) {
			$tabs = array();
		}
		if ( ! QuizCsvPermissions::can_use_tool() ) {
			return $tabs;
		}
		// Two separate screens as product requires.
		$tabs['import_quizzes']   = __( 'Import Quizzes', 'learnpress-import-export' );
		$tabs['import_questions'] = __( 'Import Questions', 'learnpress-import-export' );
		if ( QuizCsvPermissions::can_manage_settings() ) {
			$tabs['quiz_csv_settings'] = __( 'Quiz Import Settings', 'learnpress-import-export' );
		}
		// Remove legacy single-tab slug if present.
		unset( $tabs['import_quiz_questions'] );

		return $tabs;
	}

	public static function render_import_quizzes_page(): void {
		if ( ! QuizCsvPermissions::can_use_tool() ) {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'You cannot import quizzes.', 'learnpress-import-export' ) . '</p></div>';
			return;
		}
		$settings = QuizCsvSettings::get();
		include LP_ADDON_IMPORT_EXPORT_PATH . '/inc/QuizCsvImport/views/import-quizzes-page.php';
	}

	public static function render_import_questions_page(): void {
		if ( ! QuizCsvPermissions::can_use_tool() ) {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'You cannot import questions.', 'learnpress-import-export' ) . '</p></div>';
			return;
		}
		$settings = QuizCsvSettings::get();
		include LP_ADDON_IMPORT_EXPORT_PATH . '/inc/QuizCsvImport/views/import-questions-page.php';
	}

	/** @deprecated */
	public static function render_import_page(): void {
		self::render_import_questions_page();
	}

	public static function render_settings_page(): void {
		if ( ! QuizCsvPermissions::can_manage_settings() ) {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'Permission denied.', 'learnpress-import-export' ) . '</p></div>';
			return;
		}
		$settings = QuizCsvSettings::get();
		include LP_ADDON_IMPORT_EXPORT_PATH . '/inc/QuizCsvImport/views/settings-page.php';
	}

	public function enqueue( string $hook ): void {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
		if ( $page !== 'learnpress-import-export' ) {
			return;
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : '';
		if ( ! in_array( $tab, array( 'import_quizzes', 'import_questions', 'quiz_csv_settings', 'import_quiz_questions' ), true ) ) {
			return;
		}
		if ( ! QuizCsvPermissions::can_use_tool() ) {
			return;
		}

		$ver = defined( 'LP_ADDON_IMPORT_EXPORT_VER' ) ? LP_ADDON_IMPORT_EXPORT_VER : '1.0.0';
		$url = defined( 'LP_ADDON_IMPORT_EXPORT_URL' ) ? LP_ADDON_IMPORT_EXPORT_URL : plugin_dir_url( LP_ADDON_IMPORT_EXPORT_FILE );

		wp_enqueue_style( 'lp-ie-quiz-csv-import', $url . 'assets/css/quiz-csv-import.css', array(), $ver );
		wp_enqueue_script( 'lp-ie-quiz-csv-import', $url . 'assets/js/quiz-csv-import.js', array( 'jquery' ), $ver, true );

		wp_localize_script(
			'lp-ie-quiz-csv-import',
			'lpIeQuizCsv',
			array(
				'ajaxUrl'          => admin_url( 'admin-ajax.php' ),
				'restUrl'          => esc_url_raw( rest_url( 'lp-ie-quiz-csv/v1/batch' ) ),
				'nonce'            => wp_create_nonce( 'lp_ie_quiz_csv' ),
				'restNonce'        => wp_create_nonce( 'wp_rest' ),
				'settings'         => QuizCsvSettings::get(),
				'tab'              => $tab,
				'i18n'             => array(
					'selectCourse' => __( 'Select a target course before validating.', 'learnpress-import-export' ),
					'selectQuiz'   => __( 'Select a destination quiz.', 'learnpress-import-export' ),
					'selectFile'   => __( 'Choose a .csv or .json file to upload.', 'learnpress-import-export' ),
					'importing'    => __( 'Importing…', 'learnpress-import-export' ),
					'done'         => __( 'Import complete', 'learnpress-import-export' ),
					'noValid'      => __( 'No valid rows to import.', 'learnpress-import-export' ),
					'saved'        => __( 'Settings saved.', 'learnpress-import-export' ),
					'error'        => __( 'Something went wrong.', 'learnpress-import-export' ),
					'importValid'  => __( 'Import %d valid questions', 'learnpress-import-export' ),
					'contentBank'  => __( 'Content bank (no quiz)', 'learnpress-import-export' ),
					'nA'           => '—',
				),
				'editQuizBase'     => admin_url( 'post.php?action=edit&post=' ),
				'editCourseBase'   => admin_url( 'post.php?action=edit&post=' ),
				'questionsListUrl' => admin_url( 'edit.php?post_type=lp_question' ),
			)
		);
	}
}
