<?php
/**
 * Import Quizzes / Import Questions settings (limits).
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvSettings {

	const OPTION_KEY = 'lp_ie_quiz_csv_import_settings';

	/**
	 * @return array{max_file_mb:int,max_rows:int,max_answers:int,batch_size:int}
	 */
	public static function get(): array {
		$defaults = array(
			'max_file_mb'  => 10,
			'max_rows'     => 5000,
			'max_answers'  => 10,
			'batch_size'   => 50,
		);
		$stored = get_option( self::OPTION_KEY, array() );
		if ( ! is_array( $stored ) ) {
			$stored = array();
		}

		return wp_parse_args( $stored, $defaults );
	}

	/**
	 * @param array $input Raw POST values.
	 * @return array Saved settings.
	 */
	public static function save( array $input ): array {
		$settings = array(
			'max_file_mb' => max( 1, absint( $input['max_file_mb'] ?? 10 ) ),
			'max_rows'    => max( 1, absint( $input['max_rows'] ?? 5000 ) ),
			'max_answers' => max( 2, absint( $input['max_answers'] ?? 10 ) ),
			'batch_size'  => min( 100, max( 10, absint( $input['batch_size'] ?? 50 ) ) ),
		);
		update_option( self::OPTION_KEY, $settings, false );

		return $settings;
	}
}
