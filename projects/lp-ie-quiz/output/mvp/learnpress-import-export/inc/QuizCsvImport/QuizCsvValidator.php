<?php
/**
 * Row-level validation for quiz CSV import.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvValidator {

	/**
	 * Normalize type aliases to LP internal slugs.
	 */
	public static function normalize_type( string $raw ): string {
		$key = strtolower( trim( str_replace( array( ' ', '-' ), '_', $raw ) ) );
		$map = array(
			'single_choice'   => 'single_choice',
			'single'          => 'single_choice',
			'singlechoice'    => 'single_choice',
			'multi_choice'    => 'multi_choice',
			'multiple_choice' => 'multi_choice',
			'multi'           => 'multi_choice',
			'true_or_false'   => 'true_or_false',
			'true_false'      => 'true_or_false',
			'tf'              => 'true_or_false',
			'fill_in_blanks'  => 'fill_in_blanks',
			'fill_blank'      => 'fill_in_blanks',
			'fill_blanks'     => 'fill_in_blanks',
			'fib'             => 'fill_in_blanks',
			'sorting_choice'  => 'sorting_choice',
			'sorting'         => 'sorting_choice',
		);
		$type = $map[ $key ] ?? '';
		if ( $type === '' ) {
			return '';
		}

		return self::is_supported_type( $type ) ? $type : '';
	}

	public static function is_supported_type( string $type ): bool {
		$core_types = array( 'single_choice', 'multi_choice', 'true_or_false', 'fill_in_blanks' );
		if ( in_array( $type, $core_types, true ) ) {
			return true;
		}
		if ( class_exists( '\LearnPress\Models\Question\QuestionPostModel' ) ) {
			return \LearnPress\Models\Question\QuestionPostModel::check_type_valid( $type );
		}
		return false;
	}

	/**
	 * @param array<string,string> $row
	 * @param array                $settings
	 * @return array{status:string,messages:string[],normalized:array}
	 */
	public static function validate_row( array $row, array $settings ): array {
		$messages = array();
		$status   = 'valid';
		$line     = (int) ( $row['_line'] ?? 0 );

		$title = trim( $row['question_title'] ?? '' );
		if ( $title === '' ) {
			return self::invalid( $line, array( __( 'Missing question_title', 'learnpress-import-export' ) ) );
		}

		$type = self::normalize_type( (string) ( $row['question_type'] ?? '' ) );
		if ( $type === '' ) {
			return self::invalid(
				$line,
				array(
					sprintf(
						/* translators: %s: type value */
						__( 'Unsupported question_type: %s', 'learnpress-import-export' ),
						(string) ( $row['question_type'] ?? '' )
					),
				)
			);
		}

		$answers_raw = trim( (string) ( $row['answers'] ?? '' ) );
		$answers     = array();
		if ( $answers_raw !== '' ) {
			$answers = array_map( 'trim', explode( '|', $answers_raw ) );
			$answers = array_values( array_filter( $answers, static fn( $a ) => $a !== '' ) );
		}

		$max_answers = (int) $settings['max_answers'];
		if ( count( $answers ) > $max_answers ) {
			return self::invalid(
				$line,
				array(
					sprintf(
						/* translators: %d: max answers */
						__( 'Exceeds max answers per question (%d)', 'learnpress-import-export' ),
						$max_answers
					),
				)
			);
		}

		$correct_flags = array();

		if ( $type === 'fill_in_blanks' ) {
			$fib_content = trim( (string) ( $row['answers'] ?? '' ) );
			if ( $fib_content === '' ) {
				$fib_content = trim( (string) ( $row['question_content'] ?? '' ) );
			}
			$blanks = self::parse_fib_blanks( $fib_content );
			if ( is_wp_error( $blanks ) ) {
				return self::invalid( $line, array( $blanks->get_error_message() ) );
			}
			$answers       = array( $fib_content );
			$correct_flags = array( true );
		} else {
			$correct_raw = trim( (string) ( $row['correct_answer'] ?? '' ) );
			if ( $correct_raw === '' && $type !== 'sorting_choice' ) {
				return self::invalid( $line, array( __( 'Missing correct_answer', 'learnpress-import-export' ) ) );
			}
		}

		if ( $type === 'true_or_false' ) {
			if ( empty( $answers ) ) {
				$answers = array( 'True', 'False' );
			}
			if ( count( $answers ) !== 2 ) {
				return self::invalid( $line, array( __( 'true_or_false requires 0 or 2 answers', 'learnpress-import-export' ) ) );
			}
			$tf = self::parse_true_false_correct( $correct_raw, $answers );
			if ( is_wp_error( $tf ) ) {
				return self::invalid( $line, array( $tf->get_error_message() ) );
			}
			$correct_flags = $tf;
		} elseif ( $type === 'single_choice' || $type === 'multi_choice' || $type === 'sorting_choice' ) {
			if ( count( $answers ) < 2 ) {
				return self::invalid( $line, array( __( 'Choice questions require at least 2 answers (pipe-delimited)', 'learnpress-import-export' ) ) );
			}
			$indices = ( $type === 'sorting_choice' ) ? range( 1, count( $answers ) ) : self::parse_correct_indices( $correct_raw, count( $answers ) );
			if ( is_wp_error( $indices ) ) {
				return self::invalid( $line, array( $indices->get_error_message() ) );
			}
			if ( $type === 'single_choice' && count( $indices ) !== 1 ) {
				return self::invalid( $line, array( __( 'single_choice requires exactly one correct_answer index', 'learnpress-import-export' ) ) );
			}
			if ( $type === 'multi_choice' && count( $indices ) < 1 ) {
				return self::invalid( $line, array( __( 'multi_choice requires at least one correct_answer index', 'learnpress-import-export' ) ) );
			}
			$correct_flags = array_fill( 0, count( $answers ), false );
			foreach ( $indices as $idx ) {
				$correct_flags[ $idx - 1 ] = true;
			}
		} elseif ( $type !== 'fill_in_blanks' ) {
			return self::invalid( $line, array( __( 'Unsupported question_type on this site', 'learnpress-import-export' ) ) );
		}

		$mark_raw = trim( (string) ( $row['mark'] ?? '' ) );
		if ( $mark_raw === '' ) {
			$mark     = 1.0;
			$messages[] = __( 'mark empty — default 1', 'learnpress-import-export' );
			$status     = 'warning';
		} else {
			if ( ! is_numeric( $mark_raw ) || (float) $mark_raw < 0 ) {
				return self::invalid( $line, array( __( 'mark must be a number ≥ 0', 'learnpress-import-export' ) ) );
			}
			$mark = (float) $mark_raw;
		}

		$status_post = strtolower( trim( (string) ( $row['status'] ?? 'publish' ) ) );
		if ( $status_post === '' ) {
			$status_post = 'publish';
		}
		$allowed_status = array( 'draft', 'publish', 'pending', 'private' );
		if ( ! in_array( $status_post, $allowed_status, true ) ) {
			return self::invalid( $line, array( __( 'Invalid status value', 'learnpress-import-export' ) ) );
		}

		$content = (string) ( $row['question_content'] ?? '' );
		if ( $type === 'fill_in_blanks' && trim( $content ) === '' && ! empty( $answers[0] ) ) {
			$content = (string) $answers[0];
		}

		return array(
			'status'     => $status,
			'messages'   => $messages,
			'normalized' => array(
				'line'             => $line,
				'title'            => $title,
				'content'          => $content,
				'type'             => $type,
				'answers'          => $answers,
				'correct_flags'    => $correct_flags,
				'fib_blanks'       => $type === 'fill_in_blanks' ? $blanks : array(),
				'explanation'      => (string) ( $row['explanation'] ?? '' ),
				'hint'             => (string) ( $row['hint'] ?? '' ),
				'mark'             => $mark,
				'status'           => $status_post,
			),
		);
	}

	/**
	 * @param array<int,array<string,string>> $rows
	 * @return array{rows:array,counts:array}
	 */
	public static function validate_all( array $rows ): array {
		$settings = QuizCsvSettings::get();
		$out      = array();
		$counts   = array(
			'valid'   => 0,
			'warning' => 0,
			'invalid' => 0,
			'create'  => 0,
			'update'  => 0,
		);

		foreach ( $rows as $row ) {
			$result = self::validate_row( $row, $settings );
			$item   = array(
				'line'       => (int) ( $row['_line'] ?? 0 ),
				'title'      => trim( (string) ( $row['question_title'] ?? '' ) ),
				'type'       => (string) ( $row['question_type'] ?? '' ),
				'status'     => $result['status'],
				'messages'   => $result['messages'],
				'normalized' => $result['normalized'] ?? null,
				'action'     => 'skip',
			);

			if ( $result['status'] === 'invalid' ) {
				++$counts['invalid'];
			} elseif ( $result['status'] === 'warning' ) {
				++$counts['warning'];
				++$counts['valid'];
				$item['action'] = 'create';
			} else {
				++$counts['valid'];
				$item['action'] = 'create';
			}

			$out[] = $item;
		}

		return array(
			'rows'   => $out,
			'counts' => $counts,
		);
	}

	/**
	 * Mark create vs update against existing quiz questions (by title, case-insensitive trim).
	 *
	 * @param array $validated Output of validate_all.
	 * @param int   $quiz_id
	 */
	public static function apply_override_actions( array $validated, int $quiz_id ): array {
		$title_map = self::quiz_question_title_map( $quiz_id );
		$counts    = $validated['counts'];
		$counts['create'] = 0;
		$counts['update'] = 0;

		foreach ( $validated['rows'] as &$item ) {
			if ( $item['status'] === 'invalid' || empty( $item['normalized'] ) ) {
				continue;
			}
			$key = self::normalize_title_key( $item['normalized']['title'] );
			if ( isset( $title_map[ $key ] ) ) {
				$item['action']                 = 'update';
				$item['normalized']['existing_id'] = $title_map[ $key ];
				if ( $item['status'] === 'valid' ) {
					$item['status']     = 'warning';
					$item['messages'][] = __( 'Title exists in quiz — will override', 'learnpress-import-export' );
					++$counts['warning'];
					// valid already counted; keep valid count as importable
				}
				++$counts['update'];
			} else {
				$item['action'] = 'create';
				++$counts['create'];
			}
		}
		unset( $item );

		$validated['counts'] = $counts;

		return $validated;
	}

	/**
	 * @return array<string,int> title_key => question_id
	 */
	public static function quiz_question_title_map( int $quiz_id ): array {
		global $wpdb;
		$map = array();
		if ( $quiz_id <= 0 ) {
			return $map;
		}

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT question_id FROM {$wpdb->prefix}learnpress_quiz_questions WHERE quiz_id = %d ORDER BY question_order ASC",
				$quiz_id
			)
		);

		if ( empty( $ids ) ) {
			return $map;
		}

		foreach ( $ids as $qid ) {
			$t = get_the_title( (int) $qid );
			if ( $t === '' ) {
				continue;
			}
			$map[ self::normalize_title_key( $t ) ] = (int) $qid;
		}

		return $map;
	}

	public static function normalize_title_key( string $title ): string {
		return mb_strtolower( trim( $title ), 'UTF-8' );
	}

	/**
	 * @return array<int,bool>|WP_Error
	 */
	private static function parse_true_false_correct( string $raw, array $answers ) {
		$v = strtolower( trim( $raw ) );
		if ( in_array( $v, array( 'true', 'yes', '1' ), true ) ) {
			return array( true, false );
		}
		if ( in_array( $v, array( 'false', 'no', '0' ), true ) ) {
			return array( false, true );
		}
		if ( $v === '1' || $v === '2' ) {
			$i = (int) $v;
			return array( $i === 1, $i === 2 );
		}
		// Match by answer text.
		foreach ( $answers as $i => $label ) {
			if ( strtolower( $label ) === $v ) {
				$flags    = array( false, false );
				$flags[ $i ] = true;
				return $flags;
			}
		}

		return new \WP_Error( 'tf_correct', __( 'Invalid correct_answer for true_or_false', 'learnpress-import-export' ) );
	}

	/**
	 * @return int[]|WP_Error 1-based indices
	 */
	private static function parse_correct_indices( string $raw, int $answer_count ) {
		$parts = preg_split( '/\s*,\s*/', $raw );
		$out   = array();
		foreach ( $parts as $p ) {
			if ( $p === '' || ! ctype_digit( (string) $p ) ) {
				return new \WP_Error( 'correct_idx', __( 'correct_answer must be 1-based indices (e.g. 1 or 1,3)', 'learnpress-import-export' ) );
			}
			$i = (int) $p;
			if ( $i < 1 || $i > $answer_count ) {
				return new \WP_Error( 'correct_range', __( 'correct_answer out of range', 'learnpress-import-export' ) );
			}
			$out[] = $i;
		}

		return array_values( array_unique( $out ) );
	}

	/**
	 * Parse LearnPress fill-in-blanks shortcodes from content.
	 *
	 * Expected content example:
	 * Paris is the capital of [fib fill="France" id="blank_1" comparison="equal" match_case="0" ].
	 *
	 * @return array<string,array>|WP_Error
	 */
	private static function parse_fib_blanks( string $content ) {
		if ( $content === '' ) {
			return new \WP_Error( 'fib_content', __( 'fill_in_blanks requires question_content or answers with [fib] shortcodes.', 'learnpress-import-export' ) );
		}

		preg_match_all( '/\[fib\s+([^\]]*)\]/i', $content, $matches, PREG_SET_ORDER );
		if ( empty( $matches ) ) {
			return new \WP_Error( 'fib_shortcode', __( 'fill_in_blanks requires at least one [fib fill="..." id="..."] shortcode.', 'learnpress-import-export' ) );
		}

		$blanks = array();
		$index  = 1;
		foreach ( $matches as $match ) {
			$attrs = self::parse_shortcode_attrs( $match[1] ?? '' );
			$id    = trim( (string) ( $attrs['id'] ?? '' ) );
			if ( $id === '' ) {
				$id = 'blank_' . $index;
			}
			$fill = trim( (string) ( $attrs['fill'] ?? '' ) );
			if ( $fill === '' ) {
				return new \WP_Error( 'fib_fill', __( 'Each [fib] shortcode requires a fill value.', 'learnpress-import-export' ) );
			}
			$comparison = strtolower( trim( (string) ( $attrs['comparison'] ?? 'equal' ) ) );
			if ( ! in_array( $comparison, array( 'equal', 'any', 'range' ), true ) ) {
				return new \WP_Error( 'fib_comparison', __( 'fill_in_blanks comparison must be equal, any, or range.', 'learnpress-import-export' ) );
			}
			$match_case = ! empty( $attrs['match_case'] ) && ! in_array( strtolower( (string) $attrs['match_case'] ), array( '0', 'false', 'no' ), true ) ? 1 : 0;
			$blanks[ $id ] = array(
				'id'         => $id,
				'fill'       => $fill,
				'match_case' => $match_case,
				'comparison' => $comparison,
			);
			++$index;
		}

		return $blanks;
	}

	/**
	 * Small shortcode attribute parser for environments where shortcode_parse_atts is unavailable.
	 */
	private static function parse_shortcode_attrs( string $text ): array {
		if ( function_exists( 'shortcode_parse_atts' ) ) {
			$attrs = shortcode_parse_atts( $text );
			return is_array( $attrs ) ? $attrs : array();
		}

		$attrs = array();
		preg_match_all( '/([\w-]+)\s*=\s*"([^"]*)"/', $text, $matches, PREG_SET_ORDER );
		foreach ( $matches as $match ) {
			$attrs[ $match[1] ] = $match[2];
		}
		return $attrs;
	}

	/**
	 * @param string[] $messages
	 */
	private static function invalid( int $line, array $messages ): array {
		return array(
			'status'     => 'invalid',
			'messages'   => $messages,
			'normalized' => null,
		);
	}
}
