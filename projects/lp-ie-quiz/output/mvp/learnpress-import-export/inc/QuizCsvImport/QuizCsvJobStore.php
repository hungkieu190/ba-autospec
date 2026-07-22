<?php
/**
 * Transient job store for batched quiz CSV import.
 *
 * @package learnpress-import-export
 */

namespace LPImportExport\QuizCsvImport;

defined( 'ABSPATH' ) || exit;

class QuizCsvJobStore {

	const TTL = HOUR_IN_SECONDS;

	public static function key( string $job_id ): string {
		return 'lp_ie_quiz_csv_job_' . $job_id;
	}

	public static function create( array $payload ): string {
		$job_id = wp_generate_password( 20, false, false );
		$payload['job_id']    = $job_id;
		$payload['user_id']   = get_current_user_id();
		$payload['created']   = time();
		$payload['status']    = 'ready';
		$payload['cursor']    = 0;
		$payload['created_n'] = 0;
		$payload['updated_n'] = 0;
		$payload['failed_n']  = 0;
		$payload['next_order'] = 0;
		set_transient( self::key( $job_id ), $payload, self::TTL );

		return $job_id;
	}

	/**
	 * @return array|null
	 */
	public static function get( string $job_id ) {
		$data = get_transient( self::key( $job_id ) );
		return is_array( $data ) ? $data : null;
	}

	public static function update( string $job_id, array $payload ): void {
		set_transient( self::key( $job_id ), $payload, self::TTL );
	}

	public static function delete( string $job_id ): void {
		delete_transient( self::key( $job_id ) );
	}

	/**
	 * Active import lock per user+quiz.
	 */
	public static function lock_key( int $user_id, int $quiz_id ): string {
		return 'lp_ie_quiz_csv_lock_' . $user_id . '_' . $quiz_id;
	}

	public static function acquire_lock( int $user_id, int $quiz_id, string $job_id ): bool {
		$key = self::lock_key( $user_id, $quiz_id );
		$existing = get_transient( $key );
		if ( $existing && $existing !== $job_id ) {
			return false;
		}
		set_transient( $key, $job_id, 30 * MINUTE_IN_SECONDS );
		return true;
	}

	public static function release_lock( int $user_id, int $quiz_id ): void {
		delete_transient( self::lock_key( $user_id, $quiz_id ) );
	}
}
