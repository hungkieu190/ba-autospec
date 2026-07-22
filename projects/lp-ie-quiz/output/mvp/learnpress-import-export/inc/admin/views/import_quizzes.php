<?php
defined( 'ABSPATH' ) || exit;
if ( class_exists( '\LPImportExport\QuizCsvImport\QuizCsvAdmin' ) ) {
	\LPImportExport\QuizCsvImport\QuizCsvAdmin::render_import_quizzes_page();
}
