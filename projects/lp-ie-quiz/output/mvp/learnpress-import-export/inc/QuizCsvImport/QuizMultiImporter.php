<?php
/**
 * Multi-quiz import: group rows by section_name + quiz_title, then attach each quiz to its section.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizMultiImporter {

	/**
	 * Group validated import items by section name and quiz title.
	 *
	 * Each item must have normalized question payload; quiz title from row or default.
	 *
	 * @param array  $import_items From question validation (with optional quiz_title on normalized/raw)
	 * @param array  $row_quiz_meta Per-row quiz/section metadata.
	 * @param string $fallback_section_name Section from UI when file rows do not define one.
	 * @return array<string,array{section_name:string,title:string,content:string,status:string,items:array}>
	 */
	public static function group_by_quiz( array $import_items, array $row_quiz_meta = array(), string $fallback_section_name = '' ): array {
		if ( trim( $fallback_section_name ) === '' ) {
			$fallback_section_name = __( 'Imported quizzes', 'learnpress-import-export' );
		}

		$groups = array();
		foreach ( $import_items as $idx => $item ) {
			if ( empty( $item['normalized'] ) ) {
				continue;
			}
			$meta         = $row_quiz_meta[ $idx ] ?? array();
			$title        = trim( (string) ( $meta['title'] ?? $item['normalized']['quiz_title'] ?? '' ) );
			$section_name = trim( (string) ( $meta['section_name'] ?? $item['normalized']['section_name'] ?? '' ) );
			if ( $title === '' ) {
				$title = __( 'Imported Quiz', 'learnpress-import-export' );
			}
			if ( $section_name === '' ) {
				$section_name = $fallback_section_name;
			}
			$key = mb_strtolower( $section_name . "\n" . $title, 'UTF-8' );
			if ( ! isset( $groups[ $key ] ) ) {
				$groups[ $key ] = array(
					'section_name' => $section_name,
					'title'        => $title,
					'content'      => (string) ( $meta['content'] ?? '' ),
					'status'       => (string) ( $meta['status'] ?? 'publish' ),
					'items'        => array(),
				);
			}
			// Prefer first non-empty content/status for the quiz group.
			if ( $groups[ $key ]['content'] === '' && ! empty( $meta['content'] ) ) {
				$groups[ $key ]['content'] = (string) $meta['content'];
			}
			if ( ! empty( $meta['status'] ) ) {
				$groups[ $key ]['status'] = (string) $meta['status'];
			}
			$groups[ $key ]['items'][] = $item;
		}
		return $groups;
	}

	/**
	 * Process one quiz group: create/find section, create quiz, import questions, attach to section.
	 *
	 * @return array{quiz_id:int,section_id:int,created:int,updated:int,failed:int,errors:array}
	 */
	public static function import_quiz_group( int $course_id, array $group ): array {
		$out = array(
			'quiz_id'    => 0,
			'section_id' => 0,
			'created'    => 0,
			'updated'    => 0,
			'failed'     => 0,
			'errors'     => array(),
			'title'      => $group['title'] ?? '',
			'section'    => $group['section_name'] ?? '',
		);

		QuizCsvDebug::log(
			'multi_quiz_group_start',
			array(
				'course_id'     => $course_id,
				'section_name'  => $group['section_name'] ?? '',
				'quiz_title'    => $group['title'] ?? '',
				'quiz_status'   => $group['status'] ?? 'publish',
				'question_rows' => count( $group['items'] ?? array() ),
			)
		);

		$section = QuizCourseService::get_or_create_import_section( $course_id, (string) ( $group['section_name'] ?? '' ) );
		if ( is_wp_error( $section ) ) {
			$out['failed']  = count( $group['items'] ?? array() );
			$out['errors'][] = $section->get_error_message();
			return $out;
		}
		$out['section_id'] = (int) $section;

		$quiz_id = QuizCsvImporter::create_quiz(
			array(
				'title'   => $group['title'],
				'content' => $group['content'] ?? '',
				'status'  => $group['status'] ?? 'publish',
			)
		);
		if ( is_wp_error( $quiz_id ) ) {
			$out['failed']  = count( $group['items'] ?? array() );
			$out['errors'][] = $quiz_id->get_error_message();
			QuizCsvDebug::log(
				'multi_quiz_group_quiz_failed',
				array(
					'course_id'    => $course_id,
					'section_id'   => (int) $section,
					'section_name' => $group['section_name'] ?? '',
					'quiz_title'   => $group['title'] ?? '',
					'error'        => $quiz_id,
				)
			);
			return $out;
		}
		$out['quiz_id'] = (int) $quiz_id;

		// Force create (no override across groups for multi-quiz import).
		$items = array();
		foreach ( $group['items'] as $item ) {
			$item['action'] = 'create';
			if ( isset( $item['normalized']['existing_id'] ) ) {
				unset( $item['normalized']['existing_id'] );
			}
			$items[] = $item;
		}

		$batch = QuizCsvImporter::import_batch(
			(int) $quiz_id,
			$items,
			array(
				'insert_position' => 'end',
				'next_order'      => 1,
			)
		);
		$out['created'] = (int) $batch['created'];
		$out['updated'] = (int) $batch['updated'];
		$out['failed']  = (int) $batch['failed'];
		$out['errors']  = $batch['errors'];

		if ( ! QuizCourseService::attach_quiz_to_section( $course_id, (int) $section, (int) $quiz_id ) ) {
			++$out['failed'];
			$out['errors'][] = __( 'Quiz was created but could not be attached to the course section.', 'learnpress-import-export' );
		}

		QuizCsvDebug::log(
			'multi_quiz_group_done',
			array(
				'course_id'    => $course_id,
				'section_id'   => (int) $section,
				'section_name' => $group['section_name'] ?? '',
				'quiz_id'      => (int) $quiz_id,
				'quiz_title'   => $group['title'] ?? '',
				'created'      => $out['created'],
				'updated'      => $out['updated'],
				'failed'       => $out['failed'],
				'errors'       => $out['errors'],
			)
		);

		return $out;
	}
}
