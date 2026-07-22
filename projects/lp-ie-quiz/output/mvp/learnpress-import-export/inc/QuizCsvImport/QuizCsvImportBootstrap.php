<?php
/**
 * Bootstrap Quiz CSV Import module inside Backup & Migration add-on.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvImportBootstrap {

	/** @var self|null */
	private static $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		// Controllers register their own hooks.
		new QuizCsvAdmin();
		new QuizCsvAjaxController();
	}
}
