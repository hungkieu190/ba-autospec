<?php
/**
 * Screen 1: Import Quizzes (multi-quiz file -> course).
 *
 * @var array $settings
 * @package learnpress-import-export
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="lp-ie-quiz-csv wrap" id="lp-ie-import-quizzes-app" data-mode="quizzes">
	<div class="lp-ie-page-header">
		<div>
			<span class="lp-ie-page-kicker"><?php esc_html_e( 'CSV / JSON Import', 'learnpress-import-export' ); ?></span>
			<h1><?php esc_html_e( 'Import Quizzes', 'learnpress-import-export' ); ?></h1>
			<p><?php esc_html_e( 'Create multiple quizzes from one file, place them into course sections, and validate every question before anything is written.', 'learnpress-import-export' ); ?></p>
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
		<?php esc_html_e( 'Import one or more quizzes (each with its questions) from a CSV or JSON file into a LearnPress course. Rows with the same section_name and quiz_title become one quiz group.', 'learnpress-import-export' ); ?>
	</p>

	<div id="lp-ie-notice" class="notice" style="display:none;"><p></p></div>

	<div class="lp-ie-step" data-step="configure">
		<div class="lp-ie-card">
			<h2><?php esc_html_e( '1. Sample templates', 'learnpress-import-export' ); ?></h2>
			<p>
				<button type="button" class="button lp-ie-dl-tpl" data-format="csv" data-kind="quizzes"><?php esc_html_e( 'Download CSV', 'learnpress-import-export' ); ?></button>
				<button type="button" class="button lp-ie-dl-tpl" data-format="json" data-kind="quizzes"><?php esc_html_e( 'Download JSON', 'learnpress-import-export' ); ?></button>
			</p>
			<p class="description">
				<?php esc_html_e( 'Required: quiz_title + question fields. Supported types: single_choice, multi_choice, true_or_false, fill_in_blanks. JSON quizzes may include section_name.', 'learnpress-import-export' ); ?>
			</p>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '2. Target course', 'learnpress-import-export' ); ?></h2>
			<p class="description">
				<?php esc_html_e( 'Select a course to import quizzes into. Customize the default section name fallback below.', 'learnpress-import-export' ); ?>
			</p>
			<div style="position:relative;">
				<input type="search" id="lp-ie-course-search" placeholder="<?php esc_attr_e( 'Type to search courses...', 'learnpress-import-export' ); ?>" autocomplete="off" />
				<ul id="lp-ie-course-list" class="lp-ie-quiz-list" role="listbox" aria-hidden="true"></ul>
			</div>
			<p style="margin: 4px 0 10px 0;">
				<span class="description"><?php esc_html_e( 'Selected course:', 'learnpress-import-export' ); ?></span><br>
				<span class="lp-ie-selected-token" id="lp-ie-selected-course">-</span>
				<input type="hidden" id="lp-ie-course-id" value="" />
			</p>
			<div>
				<label for="lp-ie-section-name" style="margin-bottom: 6px;"><?php esc_html_e( 'Default section name', 'learnpress-import-export' ); ?></label>
				<input type="text" id="lp-ie-section-name" value="<?php esc_attr_e( 'Imported quizzes', 'learnpress-import-export' ); ?>" />
			</div>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '3. Upload multi-quiz file', 'learnpress-import-export' ); ?></h2>
			<p class="description">
				<?php esc_html_e( 'Select a CSV or JSON file containing your quizzes data.', 'learnpress-import-export' ); ?>
			</p>
			<input type="file" id="lp-ie-import-file" accept=".csv,.json,text/csv,application/json" />
			<p class="description">
				<?php
				printf(
					esc_html__( 'Max size: %1$d MB - Max questions: %2$d - .csv or .json', 'learnpress-import-export' ),
					(int) $settings['max_file_mb'],
					(int) $settings['max_rows']
				);
				?>
			</p>
		</div>

		<div class="lp-ie-actions-bar">
			<button type="button" class="button button-primary" id="lp-ie-validate"><?php esc_html_e( 'Upload & Validate', 'learnpress-import-export' ); ?></button>
		</div>
	</div>

	<div class="lp-ie-step" data-step="preview" style="display:none;">
		<div class="lp-ie-meta-grid">
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Course', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-course"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Sections', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-sections"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Quizzes to create', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-quizzes">0</strong></div>
			<div class="lp-ie-card is-valid"><span class="label"><?php esc_html_e( 'Valid questions', 'learnpress-import-export' ); ?></span><strong id="lp-ie-c-valid">0</strong></div>
			<div class="lp-ie-card is-invalid"><span class="label"><?php esc_html_e( 'Invalid', 'learnpress-import-export' ); ?></span><strong id="lp-ie-c-invalid">0</strong></div>
		</div>
		<p style="margin-bottom: 16px;">
			<button type="button" class="button" id="lp-ie-error-log"><?php esc_html_e( 'Download error log (.txt)', 'learnpress-import-export' ); ?></button>
		</p>
		<table class="widefat striped" id="lp-ie-preview-table">
			<thead>
				<tr>
					<th><?php esc_html_e( 'Row', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Section', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Quiz', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Status', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Question', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Type', 'learnpress-import-export' ); ?></th>
					<th><?php esc_html_e( 'Message', 'learnpress-import-export' ); ?></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<p style="margin-top: 20px;">
			<button type="button" class="button" id="lp-ie-back-configure"><?php esc_html_e( 'Back', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-primary" id="lp-ie-start-import" disabled><?php esc_html_e( 'Import quizzes', 'learnpress-import-export' ); ?></button>
		</p>
	</div>

	<div class="lp-ie-step" data-step="progress" style="display:none;">
		<div class="lp-ie-card" style="max-width: 620px;">
			<h2><?php esc_html_e( 'Importing Quizzes...', 'learnpress-import-export' ); ?></h2>
			<p id="lp-ie-progress-quiz" style="font-weight: 600;"></p>
			<div class="lp-ie-progress-bar"><div id="lp-ie-progress-fill"></div></div>
			<p><?php esc_html_e( 'Processed quizzes', 'learnpress-import-export' ); ?>: <strong id="lp-ie-progress-text">0 / 0</strong></p>
			<ul style="margin: 10px 0 0; padding-left: 20px; list-style: disc;">
				<li><?php esc_html_e( 'Quizzes created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-created">0</strong></li>
				<li><?php esc_html_e( 'Questions created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-updated">0</strong></li>
				<li><span style="color: var(--lp-ie-danger);"><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-failed">0</strong></span></li>
			</ul>
		</div>
	</div>

	<div class="lp-ie-step" data-step="summary" style="display:none;">
		<div class="notice notice-success" style="margin-left: 0; margin-right: 0; margin-bottom: 20px;"><p><?php esc_html_e( 'Quiz import finished. Published quizzes should now appear in the course curriculum. Draft rows remain hidden until published.', 'learnpress-import-export' ); ?></p></div>
		<div class="lp-ie-card" style="max-width: 500px;">
			<h2><?php esc_html_e( 'Import Receipt Summary', 'learnpress-import-export' ); ?></h2>
			<ul style="margin: 0; padding-left: 20px; list-style: disc;">
				<li><?php esc_html_e( 'Quizzes created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-created">0</strong></li>
				<li><?php esc_html_e( 'Questions created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-updated">0</strong></li>
				<li><?php esc_html_e( 'Skipped (invalid)', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-skipped">0</strong></li>
				<li><span style="color: var(--lp-ie-danger);"><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-failed">0</strong></span></li>
			</ul>
		</div>
		<p style="margin-top: 20px;">
			<a class="button button-primary" id="lp-ie-edit-course" href="#"><?php esc_html_e( 'Edit course', 'learnpress-import-export' ); ?></a>
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
