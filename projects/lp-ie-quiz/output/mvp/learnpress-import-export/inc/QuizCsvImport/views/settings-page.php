<?php
/**
 * Import/Export tab: Quiz CSV import limits.
 *
 * @var array $settings
 * @package learnpress-import-export
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="lp-ie-quiz-csv wrap" id="lp-ie-quiz-csv-settings">
	<div class="lp-ie-page-header" style="margin-top: 0;">
		<div>
			<span class="lp-ie-page-kicker"><?php esc_html_e( 'System Configuration', 'learnpress-import-export' ); ?></span>
			<h1><?php esc_html_e( 'Quiz Import Settings', 'learnpress-import-export' ); ?></h1>
			<p><?php esc_html_e( 'Administrator only. Configure file constraints, batch execution rates, and question validation parameters.', 'learnpress-import-export' ); ?></p>
		</div>
	</div>

	<div id="lp-ie-settings-notice" class="notice notice-success" style="margin-left: 0; margin-right: 0; margin-bottom: 20px; display:none;"><p></p></div>

	<table class="form-table" role="presentation" style="margin-top: 10px;">
		<tr>
			<th scope="row">
				<label for="lp-ie-max-file"><?php esc_html_e( 'Max file size (MB)', 'learnpress-import-export' ); ?></label>
			</th>
			<td>
				<input name="max_file_mb" type="number" id="lp-ie-max-file" min="1" value="<?php echo esc_attr( (string) $settings['max_file_mb'] ); ?>" style="width: 120px;" />
				<p class="description"><?php esc_html_e( 'Maximum allowed size of uploaded .csv or .json files.', 'learnpress-import-export' ); ?></p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="lp-ie-max-rows"><?php esc_html_e( 'Max rows per file', 'learnpress-import-export' ); ?></label>
			</th>
			<td>
				<input name="max_rows" type="number" id="lp-ie-max-rows" min="1" value="<?php echo esc_attr( (string) $settings['max_rows'] ); ?>" style="width: 120px;" />
				<p class="description"><?php esc_html_e( 'Maximum number of CSV rows or JSON question nodes allowed in a single import operation.', 'learnpress-import-export' ); ?></p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="lp-ie-max-answers"><?php esc_html_e( 'Max answers / question', 'learnpress-import-export' ); ?></label>
			</th>
			<td>
				<input name="max_answers" type="number" id="lp-ie-max-answers" min="2" value="<?php echo esc_attr( (string) $settings['max_answers'] ); ?>" style="width: 120px;" />
				<p class="description"><?php esc_html_e( 'Safety check limits. Prevents formatting errors on question answers data.', 'learnpress-import-export' ); ?></p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="lp-ie-batch-size"><?php esc_html_e( 'Batch size', 'learnpress-import-export' ); ?></label>
			</th>
			<td>
				<input name="batch_size" type="number" id="lp-ie-batch-size" min="10" max="100" value="<?php echo esc_attr( (string) $settings['batch_size'] ); ?>" style="width: 120px;" />
				<p class="description"><?php esc_html_e( 'Rows processed per AJAX/REST request (Recommended: 10–100. Lower value if server memory is constrained).', 'learnpress-import-export' ); ?></p>
			</td>
		</tr>
	</table>

	<p style="margin-top: 24px; border-t: 1px solid #dcdcde; padding-top: 16px;">
		<button type="button" class="button button-primary" id="lp-ie-save-settings"><?php esc_html_e( 'Save Changes', 'learnpress-import-export' ); ?></button>
	</p>
</div>
