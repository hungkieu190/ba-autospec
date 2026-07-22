<?php
/**
 * Admin AJAX + REST handlers for quiz CSV import.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvAjaxController {

	public function __construct() {
		add_action( 'wp_ajax_lp_ie_quiz_csv_search_quizzes', array( $this, 'search_quizzes' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_search_courses', array( $this, 'search_courses' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_upload_validate', array( $this, 'upload_validate' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_upload_validate_quizzes', array( $this, 'upload_validate_quizzes' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_start_import', array( $this, 'start_import' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_start_import_quizzes', array( $this, 'start_import_quizzes' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_process_batch', array( $this, 'process_batch' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_process_quiz_batch', array( $this, 'process_quiz_batch' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_download_template', array( $this, 'download_template' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_error_log', array( $this, 'error_log' ) );
		add_action( 'wp_ajax_lp_ie_quiz_csv_save_settings', array( $this, 'save_settings' ) );

		add_action( 'rest_api_init', array( $this, 'register_rest' ) );
	}

	public function register_rest(): void {
		register_rest_route(
			'lp-ie-quiz-csv/v1',
			'/batch',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_process_batch' ),
				'permission_callback' => static function () {
					return QuizCsvPermissions::can_use_tool();
				},
			)
		);
	}

	/**
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_process_batch( $request ) {
		$job_id = sanitize_text_field( (string) $request->get_param( 'job_id' ) );
		return rest_ensure_response( $this->run_batch( $job_id ) );
	}

	public function search_quizzes(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );

		$search = sanitize_text_field( wp_unslash( $_GET['q'] ?? $_POST['q'] ?? '' ) );
		$args   = QuizCsvPermissions::quiz_query_args( $search, 30 );
		$query  = new \WP_Query( $args );
		$items  = array();
		foreach ( $query->posts as $post ) {
			if ( ! QuizCsvPermissions::can_edit_quiz( (int) $post->ID ) ) {
				continue;
			}
			$items[] = array(
				'id'        => (int) $post->ID,
				'title'     => get_the_title( $post ),
				'questions' => QuizCsvImporter::count_quiz_questions( (int) $post->ID ),
			);
		}
		wp_send_json_success( array( 'items' => $items ) );
	}

	public function search_courses(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$search = sanitize_text_field( wp_unslash( $_GET['q'] ?? $_POST['q'] ?? '' ) );
		wp_send_json_success( array( 'items' => QuizCourseService::search_courses( $search, 30 ) ) );
	}

	public function download_template(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$format = isset( $_GET['format'] ) ? sanitize_key( wp_unslash( $_GET['format'] ) ) : 'csv';
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$kind = isset( $_GET['kind'] ) ? sanitize_key( wp_unslash( $_GET['kind'] ) ) : 'questions';
		if ( ! in_array( $format, array( 'csv', 'json' ), true ) ) {
			$format = 'csv';
		}
		if ( ! in_array( $kind, array( 'questions', 'quizzes' ), true ) ) {
			$kind = 'questions';
		}

		nocache_headers();
		if ( $format === 'json' ) {
			header( 'Content-Type: application/json; charset=utf-8' );
			$fname = $kind === 'quizzes' ? 'learnpress-multi-quiz-template.json' : 'learnpress-quiz-questions-template.json';
			header( 'Content-Disposition: attachment; filename=' . $fname );
			echo $kind === 'quizzes' ? QuizCsvTemplate::generate_multi_quiz_json() : QuizCsvTemplate::generate_json(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			exit;
		}

		header( 'Content-Type: text/csv; charset=utf-8' );
		$fname = $kind === 'quizzes' ? 'learnpress-multi-quiz-template.csv' : 'learnpress-quiz-questions-template.csv';
		header( 'Content-Disposition: attachment; filename=' . $fname );
		echo "\xEF\xBB\xBF";
		echo $kind === 'quizzes' ? QuizCsvTemplate::generate_multi_quiz_csv() : QuizCsvTemplate::generate(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		exit;
	}

	/**
	 * Screen 1: multi-quiz file → course.
	 */
	public function upload_validate_quizzes(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );

		$course_id = absint( $_POST['course_id'] ?? 0 );
		if ( ! QuizCourseService::can_edit_course( $course_id ) ) {
			wp_send_json_error( array( 'message' => __( 'Select a course you can edit.', 'learnpress-import-export' ) ), 403 );
		}
		$fallback_section_name = sanitize_text_field( wp_unslash( $_POST['section_name'] ?? '' ) );
		if ( $fallback_section_name === '' ) {
			$fallback_section_name = __( 'Imported quizzes', 'learnpress-import-export' );
		}

		$parsed = $this->parse_uploaded_file();
		if ( is_wp_error( $parsed ) ) {
			wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
		}

		$validated = QuizCsvValidator::validate_all( $parsed['rows'] );
		// Multi-quiz: do not override by existing quiz questions across groups.
		foreach ( $validated['rows'] as &$r ) {
			if ( $r['status'] !== 'invalid' && ! empty( $r['normalized'] ) ) {
				$r['action'] = 'create';
			}
		}
		unset( $r );

		$import_items = array();
		$row_meta     = array();
		foreach ( $validated['rows'] as $i => $r ) {
			if ( $r['status'] === 'invalid' || empty( $r['normalized'] ) ) {
				continue;
			}
			// Attach quiz_title from original row.
			$raw = $parsed['rows'][ $i ] ?? array();
			// Match by line number more reliably.
			$raw_by_line = null;
			foreach ( $parsed['rows'] as $pr ) {
				if ( (int) ( $pr['_line'] ?? 0 ) === (int) $r['line'] ) {
					$raw_by_line = $pr;
					break;
				}
			}
			$raw = $raw_by_line ?? $raw;
			if ( ! is_array( $raw ) ) {
				$raw = array();
			}
			$row_section_name = trim( (string) ( $raw['section_name'] ?? '' ) );
			if ( $row_section_name === '' ) {
				$row_section_name = $fallback_section_name;
			}
			$r['normalized']['quiz_title']   = trim( (string) ( $raw['quiz_title'] ?? $r['normalized']['quiz_title'] ?? '' ) );
			$r['normalized']['section_name'] = $row_section_name;
			$import_items[] = array(
				'status'     => $r['status'],
				'action'     => 'create',
				'normalized' => $r['normalized'],
			);
			$row_meta[] = array(
				'section_name' => $row_section_name,
				'title'        => trim( (string) ( $raw['quiz_title'] ?? '' ) ),
				'content'      => (string) ( $raw['quiz_content'] ?? '' ),
				'status'       => (string) ( $raw['quiz_status'] ?? 'publish' ),
			);
		}

		$groups = QuizMultiImporter::group_by_quiz( $import_items, $row_meta, $fallback_section_name );
		if ( empty( $groups ) ) {
			wp_send_json_error( array( 'message' => __( 'No valid questions with quiz_title found. Multi-quiz import requires quiz_title on each row (or JSON quizzes[] structure).', 'learnpress-import-export' ) ) );
		}

		QuizCsvDebug::log(
			'multi_quiz_validate_done',
			array(
				'course_id'             => $course_id,
				'file_name'             => $parsed['file_name'] ?? '',
				'format'                => $parsed['format'] ?? '',
				'fallback_section_name' => $fallback_section_name,
				'counts'                => $validated['counts'],
				'quiz_groups'           => count( $groups ),
				'sections'              => array_values(
					array_unique(
						array_map(
							static function ( $group ) {
								return (string) ( $group['section_name'] ?? '' );
							},
							array_values( $groups )
						)
					)
				),
			)
		);

		$error_lines = array();
		foreach ( $validated['rows'] as $r ) {
			if ( ( $r['status'] ?? '' ) === 'invalid' ) {
				$error_lines[] = array(
					'line'     => $r['line'],
					'messages' => $r['messages'],
				);
			}
		}

		$preview = array();
		foreach ( array_slice( $validated['rows'], 0, 20 ) as $i => $r ) {
			$raw = null;
			foreach ( $parsed['rows'] as $pr ) {
				if ( (int) ( $pr['_line'] ?? 0 ) === (int) $r['line'] ) {
					$raw = $pr;
					break;
				}
			}
			$row_section_name = trim( (string) ( $raw['section_name'] ?? '' ) );
			if ( $row_section_name === '' ) {
				$row_section_name = $fallback_section_name;
			}
			$preview[] = array(
				'line'     => $r['line'],
				'section'  => $row_section_name,
				'quiz'     => (string) ( $raw['quiz_title'] ?? '' ),
				'title'    => $r['title'],
				'type'     => $r['type'],
				'status'   => $r['status'],
				'messages' => $r['messages'],
			);
		}
		$section_names = array_values(
			array_unique(
				array_map(
					static function ( $group ) {
						return (string) ( $group['section_name'] ?? '' );
					},
					array_values( $groups )
				)
			)
		);
		$section_preview = array_map(
			static function ( $name ) use ( $course_id ) {
				$exists = QuizCourseService::find_section_id_by_name( $course_id, $name ) > 0;
				return sprintf(
					'%s (%s)',
					$name,
					$exists ? __( 'will use existing', 'learnpress-import-export' ) : __( 'will create', 'learnpress-import-export' )
				);
			},
			$section_names
		);

		$job_id = QuizCsvJobStore::create(
			array(
				'mode'                  => 'multi_quiz',
				'course_id'             => $course_id,
				'course_title'          => get_the_title( $course_id ),
				'fallback_section_name' => $fallback_section_name,
				'section_names'         => $section_names,
				'groups'                => array_values( $groups ),
				'counts'                => $validated['counts'],
				'quiz_count'            => count( $groups ),
				'error_lines'           => $error_lines,
				'preview_rows'          => $preview,
				'file_name'             => $parsed['file_name'] ?? '',
				'cursor'                => 0,
				'quizzes_ok'            => 0,
				'questions_ok'          => 0,
				'failed_n'              => 0,
			)
		);

		QuizCsvDebug::log(
			'multi_quiz_job_created',
			array(
				'job_id'     => $job_id,
				'course_id'  => $course_id,
				'quiz_count' => count( $groups ),
				'counts'     => $validated['counts'],
			)
		);

		wp_send_json_success(
			array(
				'job_id'    => $job_id,
				'mode'      => 'multi_quiz',
				'course'    => array(
					'id'    => $course_id,
					'title' => get_the_title( $course_id ),
				),
				'quiz_count' => count( $groups ),
				'sections'   => $section_preview,
				'counts'     => $validated['counts'],
				'preview'    => $preview,
			)
		);
	}

	public function start_import_quizzes(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$job_id = sanitize_text_field( wp_unslash( $_POST['job_id'] ?? '' ) );
		$job    = QuizCsvJobStore::get( $job_id );
		if ( ! $job || (int) $job['user_id'] !== get_current_user_id() || ( $job['mode'] ?? '' ) !== 'multi_quiz' ) {
			wp_send_json_error( array( 'message' => __( 'Import job not found or expired.', 'learnpress-import-export' ) ) );
		}
		$course_id = (int) $job['course_id'];
		if ( ! QuizCourseService::can_edit_course( $course_id ) ) {
			wp_send_json_error( array( 'message' => __( 'You cannot edit this course.', 'learnpress-import-export' ) ), 403 );
		}
		$job['status']     = 'running';
		$job['cursor']     = 0;
		QuizCsvJobStore::update( $job_id, $job );
		QuizCsvDebug::log(
			'multi_quiz_job_started',
			array(
				'job_id'    => $job_id,
				'course_id' => $course_id,
				'total'     => count( $job['groups'] ?? array() ),
			)
		);
		wp_send_json_success(
			array(
				'job_id' => $job_id,
				'total'  => count( $job['groups'] ?? array() ),
			)
		);
	}

	public function process_quiz_batch(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$job_id = sanitize_text_field( wp_unslash( $_POST['job_id'] ?? '' ) );
		try {
			$result = $this->run_quiz_group_batch( $job_id );
		} catch ( \Throwable $e ) {
			QuizCsvDebug::log(
				'multi_quiz_process_throwable',
				array(
					'job_id' => $job_id,
					'error'  => $e->getMessage(),
					'file'   => $e->getFile(),
					'line'   => $e->getLine(),
				)
			);
			wp_send_json_error(
				array(
					'error'   => true,
					'message' => $e->getMessage(),
				)
			);
		}
		if ( ! empty( $result['error'] ) ) {
			wp_send_json_error( $result );
		}
		wp_send_json_success( $result );
	}

	/**
	 * Process one quiz group per request (batch = 1 quiz).
	 *
	 * @return array
	 */
	private function run_quiz_group_batch( string $job_id ): array {
		$job = QuizCsvJobStore::get( $job_id );
		if ( ! $job || (int) $job['user_id'] !== get_current_user_id() || ( $job['mode'] ?? '' ) !== 'multi_quiz' ) {
			return array( 'error' => true, 'message' => __( 'Import job not found or expired.', 'learnpress-import-export' ) );
		}
		$course_id  = (int) $job['course_id'];
		if ( ! QuizCourseService::can_edit_course( $course_id ) ) {
			return array( 'error' => true, 'message' => __( 'Invalid course for import.', 'learnpress-import-export' ) );
		}
		$groups = $job['groups'] ?? array();
		$total  = count( $groups );
		$cursor = (int) $job['cursor'];
		if ( $cursor >= $total ) {
			return array(
				'done'         => true,
				'processed'    => $cursor,
				'total'        => $total,
				'created'      => (int) $job['quizzes_ok'],
				'updated'      => (int) $job['questions_ok'],
				'failed'       => (int) $job['failed_n'],
				'skipped'      => (int) ( $job['counts']['invalid'] ?? 0 ),
				'course_id'    => $course_id,
			);
		}
		$group  = $groups[ $cursor ];
		QuizCsvDebug::log(
			'multi_quiz_batch_start',
			array(
				'job_id'       => $job_id,
				'course_id'    => $course_id,
				'cursor'       => $cursor,
				'total'        => $total,
				'section_name' => $group['section_name'] ?? '',
				'quiz_title'   => $group['title'] ?? '',
			)
		);
		$result = QuizMultiImporter::import_quiz_group( $course_id, $group );
		$job['cursor']       = $cursor + 1;
		$job['quizzes_ok']   = (int) $job['quizzes_ok'] + ( $result['quiz_id'] > 0 ? 1 : 0 );
		$job['questions_ok'] = (int) $job['questions_ok'] + (int) $result['created'];
		$job['failed_n']     = (int) $job['failed_n'] + (int) $result['failed'];
		$done                = $job['cursor'] >= $total;
		$job['status']       = $done ? 'done' : 'running';
		QuizCsvJobStore::update( $job_id, $job );

		QuizCsvDebug::log(
			'multi_quiz_batch_done',
			array(
				'job_id'     => $job_id,
				'course_id'  => $course_id,
				'cursor'     => $job['cursor'],
				'total'      => $total,
				'done'       => $done,
				'batch'      => $result,
				'job_counts' => array(
					'quizzes_ok'   => (int) $job['quizzes_ok'],
					'questions_ok' => (int) $job['questions_ok'],
					'failed_n'     => (int) $job['failed_n'],
				),
			)
		);

		return array(
			'done'         => $done,
			'processed'    => (int) $job['cursor'],
			'total'        => $total,
			'created'      => (int) $job['quizzes_ok'],
			'updated'      => (int) $job['questions_ok'],
			'failed'       => (int) $job['failed_n'],
			'skipped'      => (int) ( $job['counts']['invalid'] ?? 0 ),
			'course_id'    => $course_id,
			'last_quiz'    => $result['title'] ?? '',
			'last_section' => $result['section'] ?? '',
			'errors'       => $result['errors'],
		);
	}

	/**
	 * Shared upload parse for questions + quizzes screens.
	 *
	 * @return array|WP_Error
	 */
	private function parse_uploaded_file() {
		$settings = QuizCsvSettings::get();
		$file     = null;
		if ( ! empty( $_FILES['import_file'] ) && isset( $_FILES['import_file']['tmp_name'] ) ) {
			$file = $_FILES['import_file'];
		} elseif ( ! empty( $_FILES['csv_file'] ) && isset( $_FILES['csv_file']['tmp_name'] ) ) {
			$file = $_FILES['csv_file'];
		}
		if ( ! $file ) {
			return new \WP_Error( 'no_file', __( 'No file uploaded. Choose a .csv or .json file.', 'learnpress-import-export' ) );
		}
		$name   = sanitize_file_name( (string) ( $file['name'] ?? '' ) );
		$format = QuizCsvParser::detect_format_from_name( $name );
		if ( ! preg_match( '/\.(csv|json)$/i', $name ) ) {
			return new \WP_Error( 'bad_ext', __( 'Only .csv or .json files are allowed.', 'learnpress-import-export' ) );
		}
		$max_bytes = (int) $settings['max_file_mb'] * MB_IN_BYTES;
		if ( ! empty( $file['size'] ) && (int) $file['size'] > $max_bytes ) {
			return new \WP_Error(
				'oversize',
				sprintf( __( 'File exceeds the maximum size of %d MB.', 'learnpress-import-export' ), (int) $settings['max_file_mb'] )
			);
		}
		$tmp  = (string) $file['tmp_name'];
		$dest = wp_tempnam( 'lp-ie-quiz-import-' );
		if ( ! $dest || ! @move_uploaded_file( $tmp, $dest ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
			if ( is_uploaded_file( $tmp ) ) {
				@move_uploaded_file( $tmp, $dest ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
			} elseif ( is_readable( $tmp ) ) {
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_copy
				copy( $tmp, $dest );
			} else {
				return new \WP_Error( 'temp', __( 'Failed to store temporary upload.', 'learnpress-import-export' ) );
			}
		}
		$parsed = QuizCsvParser::parse_file_by_format( $dest, $format );
		@unlink( $dest ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		if ( is_wp_error( $parsed ) ) {
			return $parsed;
		}
		$parsed['file_name'] = $name;
		$parsed['format']    = $format;
		return $parsed;
	}

	public function upload_validate(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );

		// Import Questions screen only: existing quiz | content bank.
		$destination = sanitize_key( wp_unslash( $_POST['destination'] ?? '' ) );
		if ( ! in_array( $destination, array( 'existing', 'bank' ), true ) ) {
			$destination = absint( $_POST['quiz_id'] ?? 0 ) > 0 ? 'existing' : 'bank';
		}

		$quiz_id = absint( $_POST['quiz_id'] ?? 0 );
		if ( $destination === 'existing' ) {
			if ( $quiz_id <= 0 || ! QuizCsvPermissions::can_edit_quiz( $quiz_id ) ) {
				wp_send_json_error( array( 'message' => __( 'Select a quiz you can edit.', 'learnpress-import-export' ) ), 403 );
			}
		} else {
			$quiz_id = 0;
		}

		$parsed = $this->parse_uploaded_file();
		if ( is_wp_error( $parsed ) ) {
			wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
		}
		$format = $parsed['format'] ?? 'csv';
		$name   = $parsed['file_name'] ?? '';

		$validated = QuizCsvValidator::validate_all( $parsed['rows'] );
		$validated = QuizCsvValidator::apply_override_actions( $validated, $quiz_id );

		$insert_position = sanitize_key( wp_unslash( $_POST['insert_position'] ?? 'end' ) );
		if ( ! in_array( $insert_position, array( 'end', 'start', 'after' ), true ) ) {
			$insert_position = 'end';
		}
		$after_n = max( 1, absint( $_POST['after_n'] ?? 1 ) );

		// Keep only importable normalized rows for job.
		$import_items = array();
		foreach ( $validated['rows'] as $r ) {
			if ( $r['status'] === 'invalid' || empty( $r['normalized'] ) ) {
				continue;
			}
			$import_items[] = array(
				'status'     => $r['status'],
				'action'     => $r['action'],
				'normalized' => $r['normalized'],
			);
		}

		$error_lines = array();
		foreach ( $validated['rows'] as $r ) {
			if ( ( $r['status'] ?? '' ) === 'invalid' ) {
				$error_lines[] = array(
					'line'     => $r['line'],
					'messages' => $r['messages'],
				);
			}
		}

		if ( $destination === 'existing' ) {
			$quiz_title = get_the_title( $quiz_id );
			$current_q  = QuizCsvImporter::count_quiz_questions( $quiz_id );
			$dest_label = $quiz_title;
		} else {
			$quiz_title = __( 'Content bank', 'learnpress-import-export' );
			$current_q  = 0;
			$dest_label = $quiz_title;
		}

		$job_id = QuizCsvJobStore::create(
			array(
				'mode'            => 'questions',
				'quiz_id'         => $quiz_id,
				'quiz_title'      => $quiz_title,
				'destination'     => $destination,
				'format'          => $format,
				'insert_position' => ( $destination === 'bank' ) ? 'end' : $insert_position,
				'after_n'         => $after_n,
				'items'           => $import_items,
				'preview_rows'    => array_slice( $validated['rows'], 0, 20 ),
				'error_lines'     => $error_lines,
				'counts'          => $validated['counts'],
				'current_q'       => $current_q,
				'file_name'       => $name,
			)
		);

		QuizCsvDebug::log(
			'questions_job_created',
			array(
				'job_id'      => $job_id,
				'quiz_id'     => $quiz_id,
				'destination' => $destination,
				'file_name'   => $name,
				'format'      => $format,
				'counts'      => $validated['counts'],
				'items'       => count( $import_items ),
			)
		);

		$preview = array_map(
			static function ( $r ) {
				return array(
					'line'     => $r['line'],
					'title'    => $r['title'],
					'type'     => $r['type'],
					'status'   => $r['status'],
					'action'   => $r['action'],
					'messages' => $r['messages'],
				);
			},
			array_slice( $validated['rows'], 0, 20 )
		);

		wp_send_json_success(
			array(
				'job_id'      => $job_id,
				'format'      => $format,
				'destination' => $destination,
				'quiz'        => array(
					'id'        => $quiz_id,
					'title'     => $dest_label,
					'questions' => $current_q,
				),
				'counts'      => $validated['counts'],
				'preview'     => $preview,
				'file'        => $name,
				'position'    => ( $destination === 'bank' ) ? 'end' : $insert_position,
			)
		);
	}

	public function start_import(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );

		$job_id = sanitize_text_field( wp_unslash( $_POST['job_id'] ?? '' ) );
		$job    = QuizCsvJobStore::get( $job_id );
		if ( ! $job || (int) $job['user_id'] !== get_current_user_id() ) {
			wp_send_json_error( array( 'message' => __( 'Import job not found or expired.', 'learnpress-import-export' ) ) );
		}
		if ( empty( $job['items'] ) ) {
			wp_send_json_error( array( 'message' => __( 'No valid questions to import.', 'learnpress-import-export' ) ) );
		}
		$destination = (string) ( $job['destination'] ?? 'bank' );
		$job_quiz_id = (int) ( $job['quiz_id'] ?? 0 );

		if ( $destination === 'existing' && ( $job_quiz_id <= 0 || ! QuizCsvPermissions::can_edit_quiz( $job_quiz_id ) ) ) {
			wp_send_json_error( array( 'message' => __( 'You cannot import into this quiz.', 'learnpress-import-export' ) ), 403 );
		}

		$lock_key_id = $job_quiz_id > 0 ? $job_quiz_id : 0;
		if ( ! QuizCsvJobStore::acquire_lock( get_current_user_id(), $lock_key_id, $job_id ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'An import is already running for this destination.', 'learnpress-import-export' ),
				)
			);
		}

		$job['status'] = 'running';
		$job['next_order'] = $job_quiz_id > 0
			? QuizCsvImporter::resolve_start_order(
				$job_quiz_id,
				array(
					'insert_position' => $job['insert_position'] ?? 'end',
					'after_n'         => $job['after_n'] ?? 1,
				)
			)
			: 0;
		QuizCsvJobStore::update( $job_id, $job );

		QuizCsvDebug::log(
			'questions_job_started',
			array(
				'job_id'          => $job_id,
				'quiz_id'         => $job_quiz_id,
				'destination'     => $destination,
				'total'           => count( $job['items'] ),
				'next_order'      => $job['next_order'],
				'insert_position' => $job['insert_position'] ?? 'end',
			)
		);

		wp_send_json_success(
			array(
				'job_id'      => $job_id,
				'total'       => count( $job['items'] ),
				'quiz_id'     => $job_quiz_id,
				'destination' => $destination,
			)
		);
	}

	public function process_batch(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$job_id = sanitize_text_field( wp_unslash( $_POST['job_id'] ?? '' ) );
		$result = $this->run_batch( $job_id );
		if ( ! empty( $result['error'] ) ) {
			wp_send_json_error( $result );
		}
		wp_send_json_success( $result );
	}

	/**
	 * @return array
	 */
	private function run_batch( string $job_id ): array {
		$job = QuizCsvJobStore::get( $job_id );
		if ( ! $job || (int) $job['user_id'] !== get_current_user_id() ) {
			return array( 'error' => true, 'message' => __( 'Import job not found or expired.', 'learnpress-import-export' ) );
		}
		$job_quiz_id = (int) ( $job['quiz_id'] ?? 0 );
		if ( $job_quiz_id > 0 && ! QuizCsvPermissions::can_edit_quiz( $job_quiz_id ) ) {
			return array( 'error' => true, 'message' => __( 'You cannot import into this quiz.', 'learnpress-import-export' ) );
		}

		$settings   = QuizCsvSettings::get();
		$batch_size = (int) $settings['batch_size'];
		$items      = $job['items'];
		$total      = count( $items );
		$cursor     = (int) $job['cursor'];
		$slice      = array_slice( $items, $cursor, $batch_size );

		$batch = QuizCsvImporter::import_batch(
			$job_quiz_id,
			$slice,
			array(
				'next_order'      => (int) $job['next_order'],
				'insert_position' => $job['insert_position'] ?? 'end',
				'after_n'         => $job['after_n'] ?? 1,
			)
		);

		QuizCsvDebug::log(
			'questions_batch_done',
			array(
				'job_id'     => $job_id,
				'quiz_id'    => $job_quiz_id,
				'cursor'     => $cursor,
				'batch_size' => count( $slice ),
				'batch'      => $batch,
			)
		);

		$job['cursor']     = $cursor + count( $slice );
		$job['created_n']  = (int) $job['created_n'] + (int) $batch['created'];
		$job['updated_n']  = (int) $job['updated_n'] + (int) $batch['updated'];
		$job['failed_n']   = (int) $job['failed_n'] + (int) $batch['failed'];
		$job['next_order'] = (int) $batch['next_order'];
		$done              = $job['cursor'] >= $total;
		$job['status']     = $done ? 'done' : 'running';

		if ( $done ) {
			QuizCsvJobStore::release_lock( (int) $job['user_id'], (int) $job['quiz_id'] );
		}
		QuizCsvJobStore::update( $job_id, $job );

		return array(
			'job_id'    => $job_id,
			'done'      => $done,
			'processed' => (int) $job['cursor'],
			'total'     => $total,
			'created'   => (int) $job['created_n'],
			'updated'   => (int) $job['updated_n'],
			'failed'    => (int) $job['failed_n'],
			'skipped'   => max( 0, (int) ( $job['counts']['invalid'] ?? 0 ) ),
			'quiz_id'   => (int) $job['quiz_id'],
			'errors'    => $batch['errors'],
		);
	}

	public function error_log(): void {
		$this->guard();
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$job_id = sanitize_text_field( wp_unslash( $_GET['job_id'] ?? $_POST['job_id'] ?? '' ) );
		$job    = QuizCsvJobStore::get( $job_id );
		if ( ! $job || (int) $job['user_id'] !== get_current_user_id() ) {
			wp_die( esc_html__( 'Job not found.', 'learnpress-import-export' ) );
		}
		$lines = array( 'LearnPress Import Quiz Questions — error log' );
		foreach ( $job['error_lines'] ?? array() as $r ) {
			$msg     = implode( '; ', $r['messages'] ?? array() );
			$lines[] = 'Row ' . (int) $r['line'] . ': ' . $msg;
		}
		if ( count( $lines ) === 1 ) {
			$lines[] = 'No invalid rows.';
		}
		nocache_headers();
		header( 'Content-Type: text/plain; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=import-errors.txt' );
		echo implode( "\n", $lines ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		exit;
	}

	public function save_settings(): void {
		if ( ! QuizCsvPermissions::can_manage_settings() ) {
			wp_send_json_error( array( 'message' => __( 'Permission denied.', 'learnpress-import-export' ) ), 403 );
		}
		check_ajax_referer( 'lp_ie_quiz_csv', 'nonce' );
		$saved = QuizCsvSettings::save( wp_unslash( $_POST ) );
		wp_send_json_success( array( 'settings' => $saved ) );
	}

	private function guard(): void {
		if ( ! QuizCsvPermissions::can_use_tool() ) {
			wp_send_json_error( array( 'message' => __( 'You cannot import quiz questions.', 'learnpress-import-export' ) ), 403 );
		}
	}
}
