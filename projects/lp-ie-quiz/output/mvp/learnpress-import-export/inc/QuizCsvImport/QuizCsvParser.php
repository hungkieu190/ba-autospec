<?php
/**
 * Parse CSV quiz question files (delimiter detect, BOM strip).
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvParser {

	/** @var string[] */
	public const REQUIRED_HEADERS = array( 'question_title', 'question_type', 'correct_answer' );

	/** @var string[] */
	public const OPTIONAL_HEADERS = array(
		'question_content',
		'answers',
		'explanation',
		'hint',
		'mark',
		'status',
		'quiz_title',
		'quiz_content',
		'quiz_status',
		'section_name',
	);

	/**
	 * Detect delimiter from first non-empty line.
	 */
	public static function detect_delimiter( string $sample ): string {
		$line = strtok( $sample, "\r\n" );
		if ( $line === false || $line === '' ) {
			return ',';
		}

		$candidates = array( ',' => 0, ';' => 0, "\t" => 0 );
		foreach ( array_keys( $candidates ) as $d ) {
			$candidates[ $d ] = substr_count( $line, $d );
		}
		arsort( $candidates );
		$best = key( $candidates );

		return $best && $candidates[ $best ] > 0 ? $best : ',';
	}

	/**
	 * Detect format from filename: csv | json.
	 */
	public static function detect_format_from_name( string $filename ): string {
		if ( preg_match( '/\.json$/i', $filename ) ) {
			return 'json';
		}
		return 'csv';
	}

	/**
	 * Parse uploaded file by format (csv or json).
	 *
	 * @param string $path Absolute path.
	 * @param string $format csv|json
	 * @return array{headers:string[],rows:array<int,array<string,string>>,delimiter?:string,format:string}|WP_Error
	 */
	public static function parse_file_by_format( string $path, string $format ) {
		if ( $format === 'json' ) {
			return self::parse_json_file( $path );
		}
		return self::parse_file( $path );
	}

	/**
	 * @param string $path Absolute path to JSON.
	 * @return array{headers:string[],rows:array<int,array<string,string>>,format:string}|WP_Error
	 */
	public static function parse_json_file( string $path ) {
		if ( ! is_readable( $path ) ) {
			return new \WP_Error( 'lp_ie_json_unreadable', __( 'JSON file is not readable.', 'learnpress-import-export' ) );
		}

		$raw = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		if ( $raw === false || $raw === '' ) {
			return new \WP_Error( 'lp_ie_json_empty', __( 'JSON file is empty.', 'learnpress-import-export' ) );
		}

		if ( substr( $raw, 0, 3 ) === "\xEF\xBB\xBF" ) {
			$raw = substr( $raw, 3 );
		}

		$data = json_decode( $raw, true );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new \WP_Error(
				'lp_ie_json_invalid',
				sprintf(
					/* translators: %s: json error */
					__( 'Invalid JSON: %s', 'learnpress-import-export' ),
					json_last_error_msg()
				)
			);
		}

		/**
		 * Supported shapes:
		 * - { "quizzes": [ { "title", "content", "status", "questions": [ ... ] } ] }  ← multi-quiz
		 * - { "quiz": {...}, "questions": [ ... ] }
		 * - { "questions": [ ... ] } or top-level question array
		 */
		$rows      = array();
		$quiz_meta = array(
			'title'        => '',
			'content'      => '',
			'status'       => 'publish',
			'section_name' => '',
		);
		$max       = QuizCsvSettings::get()['max_rows'];
		$line      = 0;

		$flatten_question = static function ( array $item, int $line_no, array $qmeta = array() ): array {
			$answers = $item['answers'] ?? '';
			if ( is_array( $answers ) ) {
				$answers = implode( '|', array_map( 'strval', $answers ) );
			}
			$correct = $item['correct_answer'] ?? '';
			if ( is_array( $correct ) ) {
				$correct = implode( ',', array_map( 'strval', $correct ) );
			}
			return array(
				'quiz_title'       => (string) ( $qmeta['title'] ?? $item['quiz_title'] ?? '' ),
				'quiz_content'     => (string) ( $qmeta['content'] ?? $item['quiz_content'] ?? '' ),
				'quiz_status'      => (string) ( $qmeta['status'] ?? $item['quiz_status'] ?? 'publish' ),
				'section_name'     => (string) ( $qmeta['section_name'] ?? $item['section_name'] ?? '' ),
				'question_title'   => (string) ( $item['question_title'] ?? $item['title'] ?? '' ),
				'question_content' => (string) ( $item['question_content'] ?? $item['content'] ?? '' ),
				'question_type'    => (string) ( $item['question_type'] ?? $item['type'] ?? '' ),
				'answers'          => (string) $answers,
				'correct_answer'   => (string) $correct,
				'explanation'      => (string) ( $item['explanation'] ?? '' ),
				'hint'             => (string) ( $item['hint'] ?? '' ),
				'mark'             => isset( $item['mark'] ) ? (string) $item['mark'] : '',
				'status'           => (string) ( $item['status'] ?? '' ),
				'_line'            => $line_no,
			);
		};

		// Multi-quiz structure.
		if ( is_array( $data ) && isset( $data['quizzes'] ) && is_array( $data['quizzes'] ) ) {
			foreach ( $data['quizzes'] as $quiz_block ) {
				if ( ! is_array( $quiz_block ) ) {
					continue;
				}
				$qmeta = array(
					'title'        => (string) ( $quiz_block['title'] ?? $quiz_block['quiz_title'] ?? '' ),
					'content'      => (string) ( $quiz_block['content'] ?? $quiz_block['quiz_content'] ?? '' ),
					'status'       => (string) ( $quiz_block['status'] ?? $quiz_block['quiz_status'] ?? 'publish' ),
					'section_name' => (string) ( $quiz_block['section_name'] ?? '' ),
				);
				$qs = $quiz_block['questions'] ?? array();
				if ( ! is_array( $qs ) ) {
					continue;
				}
				foreach ( $qs as $item ) {
					++$line;
					if ( ! is_array( $item ) ) {
						continue;
					}
					if ( count( $rows ) >= $max ) {
						return new \WP_Error(
							'lp_ie_json_max_rows',
							sprintf( __( 'File exceeds maximum of %d questions.', 'learnpress-import-export' ), $max )
						);
					}
					$rows[] = $flatten_question( $item, $line, $qmeta );
				}
			}
		} else {
			$list = null;
			if ( is_array( $data ) && isset( $data['quiz'] ) && is_array( $data['quiz'] ) ) {
				$quiz_meta['title']        = (string) ( $data['quiz']['title'] ?? $data['quiz']['quiz_title'] ?? '' );
				$quiz_meta['content']      = (string) ( $data['quiz']['content'] ?? $data['quiz']['quiz_content'] ?? '' );
				$quiz_meta['status']       = (string) ( $data['quiz']['status'] ?? $data['quiz']['quiz_status'] ?? 'publish' );
				$quiz_meta['section_name'] = (string) ( $data['quiz']['section_name'] ?? '' );
			}
			if ( $quiz_meta['title'] === '' && is_array( $data ) ) {
				$quiz_meta['title']        = (string) ( $data['quiz_title'] ?? '' );
				$quiz_meta['content']      = (string) ( $data['quiz_content'] ?? $quiz_meta['content'] );
				$quiz_meta['status']       = (string) ( $data['quiz_status'] ?? $quiz_meta['status'] );
				$quiz_meta['section_name'] = (string) ( $data['section_name'] ?? $quiz_meta['section_name'] ?? '' );
			}
			if ( isset( $data['questions'] ) && is_array( $data['questions'] ) ) {
				$list = $data['questions'];
			} elseif ( is_array( $data ) ) {
				$is_list = array_keys( $data ) === range( 0, count( $data ) - 1 );
				if ( $is_list ) {
					$list = $data;
				}
			}
			if ( ! is_array( $list ) || empty( $list ) ) {
				return new \WP_Error(
					'lp_ie_json_shape',
					__( 'JSON must be { "quizzes": [ … ] }, { "questions": [ … ] }, or a top-level question array.', 'learnpress-import-export' )
				);
			}
			foreach ( $list as $item ) {
				++$line;
				if ( ! is_array( $item ) ) {
					continue;
				}
				if ( count( $rows ) >= $max ) {
					return new \WP_Error(
						'lp_ie_json_max_rows',
						sprintf( __( 'File exceeds maximum of %d questions.', 'learnpress-import-export' ), $max )
					);
				}
				$qmeta = $quiz_meta;
				if ( ! empty( $item['quiz_title'] ) ) {
					$qmeta['title'] = (string) $item['quiz_title'];
				}
				if ( ! empty( $item['section_name'] ) ) {
					$qmeta['section_name'] = (string) $item['section_name'];
				}
				$rows[] = $flatten_question( $item, $line, $qmeta );
			}
		}

		if ( empty( $rows ) ) {
			return new \WP_Error( 'lp_ie_json_no_rows', __( 'JSON has no question objects.', 'learnpress-import-export' ) );
		}

		if ( $quiz_meta['title'] === '' && ! empty( $rows[0]['quiz_title'] ) ) {
			$quiz_meta['title']        = $rows[0]['quiz_title'];
			$quiz_meta['content']      = $rows[0]['quiz_content'] ?? '';
			$quiz_meta['status']       = $rows[0]['quiz_status'] ?? 'publish';
			$quiz_meta['section_name'] = $rows[0]['section_name'] ?? '';
		}

		return array(
			'headers'   => array_merge( self::REQUIRED_HEADERS, self::OPTIONAL_HEADERS ),
			'rows'      => $rows,
			'format'    => 'json',
			'quiz_meta' => $quiz_meta,
		);
	}

	/**
	 * @param string $path Absolute path to CSV.
	 * @return array{headers:string[],rows:array<int,array<string,string>>,delimiter:string,format:string}|WP_Error
	 */
	public static function parse_file( string $path ) {
		if ( ! is_readable( $path ) ) {
			return new \WP_Error( 'lp_ie_csv_unreadable', __( 'CSV file is not readable.', 'learnpress-import-export' ) );
		}

		$raw = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		if ( $raw === false || $raw === '' ) {
			return new \WP_Error( 'lp_ie_csv_empty', __( 'CSV file is empty.', 'learnpress-import-export' ) );
		}

		// Strip UTF-8 BOM.
		if ( substr( $raw, 0, 3 ) === "\xEF\xBB\xBF" ) {
			$raw = substr( $raw, 3 );
		}

		$delimiter = self::detect_delimiter( $raw );
		$stream    = fopen( 'php://temp', 'r+' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen
		if ( ! $stream ) {
			return new \WP_Error( 'lp_ie_csv_stream', __( 'Unable to open temporary stream for CSV.', 'learnpress-import-export' ) );
		}
		fwrite( $stream, $raw ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fwrite
		rewind( $stream );

		$header_row = fgetcsv( $stream, 0, $delimiter );
		if ( ! is_array( $header_row ) || empty( $header_row ) ) {
			fclose( $stream ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
			return new \WP_Error( 'lp_ie_csv_header', __( 'Missing CSV header row.', 'learnpress-import-export' ) );
		}

		$headers = array_map(
			static function ( $h ) {
				return strtolower( trim( (string) $h ) );
			},
			$header_row
		);

		foreach ( self::REQUIRED_HEADERS as $req ) {
			if ( ! in_array( $req, $headers, true ) ) {
				fclose( $stream ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
				return new \WP_Error(
					'lp_ie_csv_missing_header',
					sprintf(
						/* translators: %s: column name */
						__( 'Missing required CSV column: %s', 'learnpress-import-export' ),
						$req
					)
				);
			}
		}

		$rows   = array();
		$line   = 1; // header
		$max    = QuizCsvSettings::get()['max_rows'];
		while ( ( $data = fgetcsv( $stream, 0, $delimiter ) ) !== false ) {
			++$line;
			if ( self::is_empty_row( $data ) ) {
				continue;
			}
			if ( count( $rows ) >= $max ) {
				fclose( $stream ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
				return new \WP_Error(
					'lp_ie_csv_max_rows',
					sprintf(
						/* translators: %d: max rows */
						__( 'CSV exceeds maximum of %d data rows.', 'learnpress-import-export' ),
						$max
					)
				);
			}
			$row = array();
			foreach ( $headers as $i => $key ) {
				$row[ $key ] = isset( $data[ $i ] ) ? (string) $data[ $i ] : '';
			}
			$row['_line'] = $line;
			$rows[]       = $row;
		}
		fclose( $stream ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose

		if ( empty( $rows ) ) {
			return new \WP_Error( 'lp_ie_csv_no_rows', __( 'CSV has no data rows.', 'learnpress-import-export' ) );
		}

		// Optional quiz meta from first data row (for "create new quiz" import).
		$quiz_meta = array(
			'title'        => '',
			'content'      => '',
			'status'       => 'publish',
			'section_name' => '',
		);
		if ( ! empty( $rows[0] ) ) {
			$quiz_meta['title']        = trim( (string) ( $rows[0]['quiz_title'] ?? '' ) );
			$quiz_meta['content']      = (string) ( $rows[0]['quiz_content'] ?? '' );
			$quiz_meta['status']       = (string) ( $rows[0]['quiz_status'] ?? 'publish' );
			$quiz_meta['section_name'] = trim( (string) ( $rows[0]['section_name'] ?? '' ) );
		}

		return array(
			'headers'   => $headers,
			'rows'      => $rows,
			'delimiter' => $delimiter,
			'format'    => 'csv',
			'quiz_meta' => $quiz_meta,
		);
	}

	/**
	 * @param array|false $data
	 */
	private static function is_empty_row( $data ): bool {
		if ( ! is_array( $data ) ) {
			return true;
		}
		foreach ( $data as $cell ) {
			if ( trim( (string) $cell ) !== '' ) {
				return false;
			}
		}

		return true;
	}
}
