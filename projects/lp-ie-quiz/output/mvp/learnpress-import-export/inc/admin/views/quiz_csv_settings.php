<?php
/**
 * Tab: Quiz CSV Settings (page=learnpress-import-export).
 *
 * @package learnpress-import-export
 */

defined( 'ABSPATH' ) || exit;

if ( class_exists( '\LPImportExport\QuizCsvImport\QuizCsvAdmin' ) ) {
	\LPImportExport\QuizCsvImport\QuizCsvAdmin::render_settings_page();
}
