<?php
/**
 * CSV / JSON sample template generators.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvTemplate {

	/**
	 * Sample questions shared by CSV and JSON templates.
	 *
	 * @return array<int,array<string,mixed>>
	 */
	public static function sample_questions(): array {
		return array(
			array(
				'question_title'   => 'Cell structure basics',
				'question_content' => '',
				'question_type'    => 'single_choice',
				'answers'          => array( 'Nucleus', 'Mitochondria', 'Cell wall', 'Ribosome' ),
				'correct_answer'   => '1',
				'explanation'      => 'Nucleus holds genetic material.',
				'hint'             => '',
				'mark'             => 1,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'Select energy organelles',
				'question_content' => '',
				'question_type'    => 'multi_choice',
				'answers'          => array( 'Chloroplast', 'Mitochondria', 'Golgi', 'Lysosome' ),
				'correct_answer'   => '1,2',
				'explanation'      => '',
				'hint'             => '',
				'mark'             => 1,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'DNA is a double helix',
				'question_content' => '',
				'question_type'    => 'true_or_false',
				'answers'          => array(),
				'correct_answer'   => 'true',
				'explanation'      => '',
				'hint'             => '',
				'mark'             => 1,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'Capital city blank',
				'question_content' => 'Paris is the capital of [fib fill="France" id="blank_country" comparison="equal" match_case="0" ].',
				'question_type'    => 'fill_in_blanks',
				'answers'          => array(),
				'correct_answer'   => '',
				'explanation'      => 'The expected blank is France.',
				'hint'             => 'European country',
				'mark'             => 1,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'Water formula',
				'question_content' => '',
				'question_type'    => 'single_choice',
				'answers'          => array( 'H2O', 'CO2', 'NaCl', 'O2' ),
				'correct_answer'   => '1',
				'explanation'      => '',
				'hint'             => '',
				'mark'             => 1,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'Select prime numbers',
				'question_content' => '',
				'question_type'    => 'multi_choice',
				'answers'          => array( '2', '3', '4', '5' ),
				'correct_answer'   => '1,2,4',
				'explanation'      => '',
				'hint'             => '',
				'mark'             => 2,
				'status'           => 'publish',
			),
			array(
				'question_title'   => 'Sun rises in the west',
				'question_content' => '',
				'question_type'    => 'true_or_false',
				'answers'          => array(),
				'correct_answer'   => 'false',
				'explanation'      => '',
				'hint'             => '',
				'mark'             => 1,
				'status'           => 'publish',
			),
		);
	}

	public static function generate(): string {
		$headers = array(
			'question_title',
			'question_content',
			'question_type',
			'answers',
			'correct_answer',
			'explanation',
			'hint',
			'mark',
			'status',
		);

		$out = self::csv_line( $headers );
		foreach ( self::sample_questions() as $q ) {
			$answers = is_array( $q['answers'] ) ? implode( '|', $q['answers'] ) : (string) $q['answers'];
			$out .= self::csv_line(
				array(
					$q['question_title'],
					$q['question_content'],
					$q['question_type'],
					$answers,
					(string) $q['correct_answer'],
					$q['explanation'],
					$q['hint'],
					(string) $q['mark'],
					$q['status'],
				)
			);
		}

		return $out;
	}

	/**
	 * Question-only sample (Import Questions screen).
	 */
	public static function generate_json(): string {
		$payload = array(
			'version'   => 1,
			'questions' => self::sample_questions(),
		);

		return wp_json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) . "\n";
	}

	/**
	 * Multi-quiz CSV: multiple quiz_title values → multiple quizzes into a course.
	 */
	public static function generate_multi_quiz_csv(): string {
		$headers = array(
			'section_name',
			'quiz_title',
			'quiz_content',
			'quiz_status',
			'question_title',
			'question_content',
			'question_type',
			'answers',
			'correct_answer',
			'explanation',
			'hint',
			'mark',
			'status',
		);
		$out  = self::csv_line( $headers );
		$rows = array(
			array( 'Week 1', 'Biology Midterm', 'Unit 1 quizzes', 'publish', 'Cell structure basics', '', 'single_choice', 'Nucleus|Mitochondria|Cell wall|Ribosome', '1', '', '', '1', 'publish' ),
			array( 'Week 1', 'Biology Midterm', '', '', 'DNA is a double helix', '', 'true_or_false', '', 'true', '', '', '1', 'publish' ),
			array( 'Week 1', 'Biology Midterm', '', '', 'Capital city blank', 'Paris is the capital of [fib fill="France" id="blank_country" comparison="equal" match_case="0" ].', 'fill_in_blanks', '', '', 'The expected blank is France.', 'European country', '1', 'publish' ),
			array( 'Week 2', 'Chemistry Quiz A', 'Standalone chemistry check', 'publish', 'Select energy organelles', '', 'multi_choice', 'Chloroplast|Mitochondria|Golgi|Lysosome', '1,2', '', '', '1', 'publish' ),
			array( 'Week 2', 'Chemistry Quiz A', '', '', 'Water formula', '', 'single_choice', 'H2O|CO2|NaCl|O2', '1', '', '', '1', 'publish' ),
			array( 'Week 2', 'Chemistry Quiz A', '', '', 'Sun rises in the west', '', 'true_or_false', '', 'false', '', '', '1', 'publish' ),
			array( 'Week 3', 'Math Practice', 'Number theory checks', 'publish', 'Select prime numbers', '', 'multi_choice', '2|3|4|5', '1,2,4', '', '', '2', 'publish' ),
		);
		foreach ( $rows as $r ) {
			$out .= self::csv_line( $r );
		}
		return $out;
	}

	/**
	 * Multi-quiz JSON for course import.
	 */
	public static function generate_multi_quiz_json(): string {
		$payload = array(
			'version' => 1,
			'quizzes' => array(
				array(
					'section_name' => 'Week 1',
					'title'        => 'Biology Midterm',
					'content'      => 'Unit 1 quizzes',
					'status'       => 'publish',
					'questions'    => array_slice( self::sample_questions(), 0, 4 ),
				),
				array(
					'section_name' => 'Week 2',
					'title'        => 'Chemistry Quiz A',
					'content'      => 'Standalone chemistry check',
					'status'       => 'publish',
					'questions'    => array_slice( self::sample_questions(), 4, 3 ),
				),
			),
		);
		return wp_json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) . "\n";
	}

	/**
	 * @param string[] $fields
	 */
	private static function csv_line( array $fields ): string {
		$escaped = array();
		foreach ( $fields as $f ) {
			$f = (string) $f;
			if ( strpbrk( $f, ",\"\n\r" ) !== false ) {
				$f = '"' . str_replace( '"', '""', $f ) . '"';
			}
			$escaped[] = $f;
		}

		return implode( ',', $escaped ) . "\n";
	}
}
