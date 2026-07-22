<?php
/**
 * Lightweight debug logger for quiz/question imports.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvDebug {

	private const PREFIX = '[LP_IE_QUIZ_CSV] ';

	/**
	 * Write a structured line to WordPress debug.log/server error log.
	 */
	public static function log( string $event, array $context = array() ): void {
		$payload = array(
			'event' => $event,
			'time'  => function_exists( 'current_time' ) ? current_time( 'mysql' ) : gmdate( 'Y-m-d H:i:s' ),
			'user'  => function_exists( 'get_current_user_id' ) ? get_current_user_id() : 0,
		);

		if ( $context ) {
			$payload['context'] = self::sanitize_context( $context );
		}

		$json = function_exists( 'wp_json_encode' )
			? wp_json_encode( $payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
			: json_encode( $payload );

		error_log( self::PREFIX . $json );
	}

	private static function sanitize_context( array $context ): array {
		$out = array();
		foreach ( $context as $key => $value ) {
			if ( is_scalar( $value ) || null === $value ) {
				$out[ $key ] = $value;
				continue;
			}

			if ( is_wp_error( $value ) ) {
				$out[ $key ] = array(
					'code'    => $value->get_error_code(),
					'message' => $value->get_error_message(),
				);
				continue;
			}

			if ( is_object( $value ) ) {
				$value = get_object_vars( $value );
			}

			if ( is_array( $value ) ) {
				$out[ $key ] = self::limit_depth( $value, 0 );
			}
		}

		return $out;
	}

	private static function limit_depth( array $value, int $depth ) {
		if ( $depth >= 3 ) {
			return '[max-depth]';
		}

		$out = array();
		foreach ( $value as $key => $item ) {
			if ( is_scalar( $item ) || null === $item ) {
				$out[ $key ] = $item;
			} elseif ( is_array( $item ) ) {
				$out[ $key ] = self::limit_depth( $item, $depth + 1 );
			} elseif ( is_object( $item ) ) {
				$out[ $key ] = self::limit_depth( get_object_vars( $item ), $depth + 1 );
			} else {
				$out[ $key ] = '[' . gettype( $item ) . ']';
			}
		}

		return $out;
	}
}
