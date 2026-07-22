<?php
/**
 * Screen 2: Import Questions only (existing quiz or content bank).
 *
 * @var array $settings
 * @package learnpress-import-export
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="lp-ie-quiz-csv wrap" id="lp-ie-import-questions-app" data-mode="questions">
	<div class="lp-ie-page-header">
		<div>
			<span class="lp-ie-page-kicker"><?php esc_html_e( 'CSV / JSON Import', 'learnpress-import-export' ); ?></span>
			<h1><?php esc_html_e( 'Import Questions', 'learnpress-import-export' ); ?></h1>
			<p><?php esc_html_e( 'Bulk-create or update LearnPress questions, attach them to a quiz when needed, and keep invalid rows out of the database.', 'learnpress-import-export' ); ?></p>
		</div>
	</div>

	<!-- Visual Progress Stepper -->
	<div class="lp-ie-stepper">
		<div class="lp-ie-stepper-step is-active" data-step-indicator="configure">
			<span class="lp-ie-stepper-num">1</span>
			<span><?php esc_html_e( 'Configure', 'learnpress-import-export' ); ?></span>
		</div>
		<div class="lp-ie-stepper-step" data-step-indicator="preview">
			<span class="lp-ie-stepper-num">2</span>
			<span><?php esc_html_e( 'Preview & Validate', 'learnpress-import-export' ); ?></span>
		</div>
		<div class="lp-ie-stepper-step" data-step-indicator="progress">
			<span class="lp-ie-stepper-num">3</span>
			<span><?php esc_html_e( 'Importing', 'learnpress-import-export' ); ?></span>
		</div>
		<div class="lp-ie-stepper-step" data-step-indicator="summary">
			<span class="lp-ie-stepper-num">4</span>
			<span><?php esc_html_e( 'Completed', 'learnpress-import-export' ); ?></span>
		</div>
	</div>

	<p class="description">
		<?php esc_html_e( 'Import questions only from CSV or JSON into an existing quiz, or into the content bank (not assigned to any quiz). For importing full quizzes into a course, use the “Import Quizzes” tab.', 'learnpress-import-export' ); ?>
	</p>

	<div id="lp-ie-notice" class="notice" style="display:none;"><p></p></div>

	<div class="lp-ie-step" data-step="configure">
		<div class="lp-ie-card">
			<h2><?php esc_html_e( '1. Sample templates', 'learnpress-import-export' ); ?></h2>
			<p>
				<button type="button" class="button lp-ie-dl-tpl" data-format="csv" data-kind="questions"><?php esc_html_e( 'Download CSV', 'learnpress-import-export' ); ?></button>
				<button type="button" class="button lp-ie-dl-tpl" data-format="json" data-kind="questions"><?php esc_html_e( 'Download JSON', 'learnpress-import-export' ); ?></button>
			</p>
			<p class="description">
				<?php esc_html_e( 'Required: question_title, question_type. Supported types: single_choice, multi_choice, true_or_false, fill_in_blanks. For fill_in_blanks, put [fib fill="..." id="..." ] shortcode in content.', 'learnpress-import-export' ); ?>
			</p>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '2. Destination', 'learnpress-import-export' ); ?></h2>
			<p class="description">
				<?php esc_html_e( 'Choose where to place the imported questions.', 'learnpress-import-export' ); ?>
			</p>
			<div class="lp-ie-radio-card-group">
				<label class="lp-ie-radio-card">
					<input type="radio" name="lp_ie_q_dest" value="existing" checked />
					<strong><?php esc_html_e( 'Existing quiz', 'learnpress-import-export' ); ?></strong>
				</label>
				<label class="lp-ie-radio-card">
					<input type="radio" name="lp_ie_q_dest" value="bank" />
					<strong><?php esc_html_e( 'Content bank only', 'learnpress-import-export' ); ?></strong>
					<span class="description"> — <?php esc_html_e( 'Questions only, not assigned to a quiz.', 'learnpress-import-export' ); ?></span>
				</label>
			</div>

			<div id="lp-ie-panel-existing" style="margin-top: 10px;">
				<div style="position:relative;">
					<input type="search" id="lp-ie-quiz-search" placeholder="<?php esc_attr_e( 'Type to search quizzes…', 'learnpress-import-export' ); ?>" autocomplete="off" />
					<ul id="lp-ie-quiz-list" class="lp-ie-quiz-list" role="listbox" aria-hidden="true"></ul>
				</div>
				<p style="margin: 8px 0 0 0;">
					<span class="description"><?php esc_html_e( 'Selected quiz:', 'learnpress-import-export' ); ?></span><br>
					<span class="lp-ie-selected-token" id="lp-ie-selected-quiz">—</span>
					<input type="hidden" id="lp-ie-quiz-id" value="" />
				</p>
			</div>
		</div>

		<div class="lp-ie-card" id="lp-ie-insert-position-card">
			<h2><?php esc_html_e( '3. Insert position', 'learnpress-import-export' ); ?></h2>
			<p class="description">
				<?php esc_html_e( 'Determine the position of new questions within the quiz.', 'learnpress-import-export' ); ?>
			</p>
			<div class="lp-ie-radio-card-group">
				<label class="lp-ie-radio-card">
					<input type="radio" name="lp_ie_pos" value="start" />
					<strong><?php esc_html_e( 'Start of quiz', 'learnpress-import-export' ); ?></strong>
				</label>
				<label class="lp-ie-radio-card">
					<input type="radio" name="lp_ie_pos" value="after" />
					<strong><?php esc_html_e( 'After question #', 'learnpress-import-export' ); ?></strong>
					<input type="number" id="lp-ie-after-n" min="1" value="1" disabled style="width: 70px; display: inline-block; margin-left: 8px; min-height: 28px; padding: 2px 6px;" />
				</label>
				<label class="lp-ie-radio-card">
					<input type="radio" name="lp_ie_pos" value="end" checked />
					<strong><?php esc_html_e( 'End of quiz (default)', 'learnpress-import-export' ); ?></strong>
				</label>
			</div>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '4. Upload file', 'learnpress-import-export' ); ?></h2>
			<p class="description">
				<?php esc_html_e( 'Select a CSV or JSON file containing your questions data.', 'learnpress-import-export' ); ?>
			</p>
			<input type="file" id="lp-ie-import-file" accept=".csv,.json,text/csv,application/json" />
		</div>

		<div class="lp-ie-actions-bar">
			<button type="button" class="button button-primary" id="lp-ie-validate"><?php esc_html_e( 'Upload & Validate', 'learnpress-import-export' ); ?></button>
		</div>
	</div>

	<div class="lp-ie-step" data-step="preview" style="display:none;">
		<div class="lp-ie-meta-grid">
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Destination', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-quiz"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Current in quiz', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-current"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Create / Update', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-cu"></strong></div>
			<div class="lp-ie-card is-valid"><span class="label"><?php esc_html_e( 'Valid', 'learnpress-import-export' ); ?></span><strong id="lp-ie-c-valid">0</strong></div>
		</div>
		<p style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
			<span class="lp-ie-badge warning"><?php esc_html_e( 'Warning', 'learnpress-import-export' ); ?>: <span id="lp-ie-c-warning">0</span></span>
			<span class="lp-ie-badge invalid"><?php esc_html_e( 'Invalid', 'learnpress-import-export' ); ?>: <span id="lp-ie-c-invalid">0</span></span>
			<button type="button" class="button" id="lp-ie-error-log" style="margin-left: auto;"><?php esc_html_e( 'Download error log', 'learnpress-import-export' ); ?></button>
		</p>
		<table class="widefat striped" id="lp-ie-preview-table">
			<thead>
				<tr>
					<th><?php esc_html_e( 'Row', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Status', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Title', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Type', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Action', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Message', 'learnpress-import-export' ); ?></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<p style="margin-top: 20px;">
			<button type="button" class="button" id="lp-ie-back-configure"><?php esc_html_e( 'Back', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-primary" id="lp-ie-start-import" disabled><?php esc_html_e( 'Import questions', 'learnpress-import-export' ); ?></button>
		</p>
	</div>

	<div class="lp-ie-step" data-step="progress" style="display:none;">
		<div class="lp-ie-card" style="max-width: 620px;">
			<h2><?php esc_html_e( 'Importing Questions...', 'learnpress-import-export' ); ?></h2>
			<p id="lp-ie-progress-quiz" style="font-weight: 600;"></p>
			<div class="lp-ie-progress-bar"><div id="lp-ie-progress-fill"></div></div>
			<p><?php esc_html_e( 'Processed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-progress-text">0 / 0</strong></p>
			<ul style="margin: 10px 0 0; padding-left: 20px; list-style: disc;">
				<li><?php esc_html_e( 'Created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-created">0</strong></li>
				<li><?php esc_html_e( 'Updated', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-updated">0</strong></li>
				<li><span style="color: var(--lp-ie-danger);"><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-failed">0</strong></span></li>
			</ul>
		</div>
	</div>

	<div class="lp-ie-step" data-step="summary" style="display:none;">
		<div class="notice notice-success" style="margin-left: 0; margin-right: 0; margin-bottom: 20px;"><p><?php esc_html_e( 'Import finished.', 'learnpress-import-export' ); ?></p></div>
		<div class="lp-ie-card" style="max-width: 500px;">
			<h2><?php esc_html_e( 'Import Receipt Summary', 'learnpress-import-export' ); ?></h2>
			<ul style="margin: 0; padding-left: 20px; list-style: disc;">
				<li><?php esc_html_e( 'Created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-created">0</strong></li>
				<li><?php esc_html_e( 'Updated', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-updated">0</strong></li>
				<li><?php esc_html_e( 'Skipped', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-skipped">0</strong></li>
				<li><span style="color: var(--lp-ie-danger);"><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-failed">0</strong></span></li>
			</ul>
		</div>
		<p style="margin-top: 20px;">
			<a class="button button-primary" id="lp-ie-edit-quiz" href="#"><?php esc_html_e( 'Open destination', 'learnpress-import-export' ); ?></a>
			<button type="button" class="button" id="lp-ie-import-another"><?php esc_html_e( 'Import another file', 'learnpress-import-export' ); ?></button>
		</p>
	</div>
</div>

<script>
jQuery(function($) {
	// Sync stepper step classes dynamically when steps hide/show
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.attributeName === 'style') {
				var $el = $(mutation.target);
				if ($el.is(':visible')) {
					var stepName = $el.data('step');
					var $stepper = $('.lp-ie-stepper');
					$stepper.find('.lp-ie-stepper-step').removeClass('is-active is-done');
					
					var steps = ['configure', 'preview', 'progress', 'summary'];
					var idx = steps.indexOf(stepName);
					steps.forEach(function(s, i) {
						var $stepIndicator = $('[data-step-indicator="' + s + '"]');
						if (i < idx) {
							$stepIndicator.addClass('is-done');
						} else if (i === idx) {
							$stepIndicator.addClass('is-active');
						}
					});
				}
			}
		});
	});
	$('.lp-ie-step').each(function() {
		observer.observe(this, { attributes: true, attributeFilter: ['style'] });
	});
});
</script>
