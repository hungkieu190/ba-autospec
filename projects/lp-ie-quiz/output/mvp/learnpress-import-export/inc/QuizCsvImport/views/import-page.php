<?php
/**
 * Legacy Import/Export tab: Import Quiz Questions UI.
 *
 * @var array $settings
 * @package learnpress-import-export
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="lp-ie-quiz-csv wrap" id="lp-ie-quiz-csv-app">
	<p class="description">
		<?php esc_html_e( 'Import a full quiz (create quiz + questions) or only questions (into an existing quiz or the content bank). CSV or JSON. Validate before any data is written. New questions default to publish so they appear in LearnPress immediately.', 'learnpress-import-export' ); ?>
	</p>

	<div id="lp-ie-notice" class="notice" style="display:none;"><p></p></div>

	<!-- Step: Configure -->
	<div class="lp-ie-step" data-step="configure">
		<div class="lp-ie-card">
			<h2><?php esc_html_e( '1. Sample templates', 'learnpress-import-export' ); ?></h2>
			<p>
				<button type="button" class="button" id="lp-ie-download-template" data-format="csv">
					<?php esc_html_e( 'Download CSV sample', 'learnpress-import-export' ); ?>
				</button>
				<button type="button" class="button" id="lp-ie-download-template-json" data-format="json">
					<?php esc_html_e( 'Download JSON sample', 'learnpress-import-export' ); ?>
				</button>
			</p>
			<p class="description">
				<?php esc_html_e( 'Question fields: question_title, question_content, question_type, answers, correct_answer, explanation, hint, mark, status. Optional quiz fields for “Create new quiz”: quiz_title, quiz_content, quiz_status (CSV first row or JSON quiz object). Core types: single_choice, multi_choice, true_or_false, fill_in_blanks.', 'learnpress-import-export' ); ?>
			</p>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '2. Import destination', 'learnpress-import-export' ); ?></h2>
			<p class="description" style="margin-top:0;">
				<?php esc_html_e( 'Choose whether to create a full new quiz, add questions to an existing quiz, or only create questions in the content bank.', 'learnpress-import-export' ); ?>
			</p>
			<div class="lp-ie-dest-modes" style="margin-bottom:12px;">
				<label style="display:block;margin-bottom:6px;">
					<input type="radio" name="lp_ie_destination" value="new_quiz" checked />
					<strong><?php esc_html_e( 'Create new quiz', 'learnpress-import-export' ); ?></strong>
					<span class="description"> — <?php esc_html_e( 'Import a full quiz: create the quiz, then attach all valid questions.', 'learnpress-import-export' ); ?></span>
				</label>
				<label style="display:block;margin-bottom:6px;">
					<input type="radio" name="lp_ie_destination" value="existing" />
					<strong><?php esc_html_e( 'Existing quiz', 'learnpress-import-export' ); ?></strong>
					<span class="description"> — <?php esc_html_e( 'Only import questions into a quiz you select.', 'learnpress-import-export' ); ?></span>
				</label>
				<label style="display:block;margin-bottom:6px;">
					<input type="radio" name="lp_ie_destination" value="bank" />
					<strong><?php esc_html_e( 'Content bank only', 'learnpress-import-export' ); ?></strong>
					<span class="description"> — <?php esc_html_e( 'Create questions only (LearnPress → Questions), not assigned to any quiz.', 'learnpress-import-export' ); ?></span>
				</label>
			</div>

			<div id="lp-ie-panel-new-quiz">
				<label for="lp-ie-new-quiz-title"><strong><?php esc_html_e( 'New quiz title', 'learnpress-import-export' ); ?></strong></label><br />
				<input type="text" id="lp-ie-new-quiz-title" class="regular-text" placeholder="<?php esc_attr_e( 'e.g. Midterm Biology 2026', 'learnpress-import-export' ); ?>" />
				<p class="description"><?php esc_html_e( 'Required unless the file already contains quiz_title (CSV) or quiz.title (JSON).', 'learnpress-import-export' ); ?></p>
				<label for="lp-ie-new-quiz-status"><?php esc_html_e( 'Quiz status', 'learnpress-import-export' ); ?></label>
				<select id="lp-ie-new-quiz-status">
					<option value="publish"><?php esc_html_e( 'Publish', 'learnpress-import-export' ); ?></option>
					<option value="draft"><?php esc_html_e( 'Draft', 'learnpress-import-export' ); ?></option>
				</select>
			</div>

			<div id="lp-ie-panel-existing" style="display:none;">
				<label for="lp-ie-quiz-search" class="screen-reader-text"><?php esc_html_e( 'Search quizzes', 'learnpress-import-export' ); ?></label>
				<input type="search" id="lp-ie-quiz-search" class="regular-text" placeholder="<?php esc_attr_e( 'Type to search quizzes…', 'learnpress-import-export' ); ?>" autocomplete="off" />
				<ul id="lp-ie-quiz-list" class="lp-ie-quiz-list" role="listbox" aria-hidden="true"></ul>
				<p>
					<?php esc_html_e( 'Selected:', 'learnpress-import-export' ); ?>
					<strong id="lp-ie-selected-quiz">—</strong>
					<input type="hidden" id="lp-ie-quiz-id" value="" />
				</p>
			</div>
		</div>

		<div class="lp-ie-card" id="lp-ie-insert-position-card">
			<h2><?php esc_html_e( '3. Insert position', 'learnpress-import-export' ); ?></h2>
			<p class="description" id="lp-ie-pos-bank-hint">
				<?php esc_html_e( 'Where to place new questions inside the quiz. Not used for content bank only.', 'learnpress-import-export' ); ?>
			</p>
			<label><input type="radio" name="lp_ie_pos" value="start" /> <?php esc_html_e( 'Start of quiz', 'learnpress-import-export' ); ?></label><br />
			<label>
				<input type="radio" name="lp_ie_pos" value="after" /> <?php esc_html_e( 'After question #', 'learnpress-import-export' ); ?>
				<input type="number" id="lp-ie-after-n" min="1" value="1" disabled class="small-text" />
			</label><br />
			<label><input type="radio" name="lp_ie_pos" value="end" checked /> <?php esc_html_e( 'End of quiz (default)', 'learnpress-import-export' ); ?></label>
		</div>

		<div class="lp-ie-card">
			<h2><?php esc_html_e( '4. Upload file (CSV or JSON)', 'learnpress-import-export' ); ?></h2>
			<input type="file" id="lp-ie-import-file" accept=".csv,.json,text/csv,application/json" />
			<p class="description">
				<?php
				printf(
					/* translators: 1: max MB, 2: max rows */
					esc_html__( 'Max size: %1$d MB · Max questions: %2$d · .csv or .json', 'learnpress-import-export' ),
					(int) $settings['max_file_mb'],
					(int) $settings['max_rows']
				);
				?>
			</p>
		</div>

		<p>
			<button type="button" class="button button-primary" id="lp-ie-validate">
				<?php esc_html_e( 'Upload & Validate', 'learnpress-import-export' ); ?>
			</button>
		</p>
	</div>

	<!-- Step: Preview -->
	<div class="lp-ie-step" data-step="preview" style="display:none;">
		<div class="lp-ie-meta-grid">
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Destination', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-quiz"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Current questions in quiz', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-current"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'Create / Update', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-cu"></strong></div>
			<div class="lp-ie-card"><span class="label"><?php esc_html_e( 'After import (est.)', 'learnpress-import-export' ); ?></span><strong id="lp-ie-meta-after"></strong></div>
		</div>
		<p>
			<span class="lp-ie-badge valid"><?php esc_html_e( 'Valid', 'learnpress-import-export' ); ?>: <span id="lp-ie-c-valid">0</span></span>
			<span class="lp-ie-badge warning"><?php esc_html_e( 'Warning', 'learnpress-import-export' ); ?>: <span id="lp-ie-c-warning">0</span></span>
			<span class="lp-ie-badge invalid"><?php esc_html_e( 'Invalid', 'learnpress-import-export' ); ?>: <span id="lp-ie-c-invalid">0</span></span>
			<button type="button" class="button" id="lp-ie-error-log"><?php esc_html_e( 'Download error log (.txt)', 'learnpress-import-export' ); ?></button>
		</p>
		<p class="lp-ie-filters">
			<button type="button" class="button button-small is-active" data-filter="all"><?php esc_html_e( 'All', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-small" data-filter="valid"><?php esc_html_e( 'Valid', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-small" data-filter="warning"><?php esc_html_e( 'Warning', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-small" data-filter="invalid"><?php esc_html_e( 'Error', 'learnpress-import-export' ); ?></button>
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
		<p>
			<button type="button" class="button" id="lp-ie-back-configure"><?php esc_html_e( 'Back', 'learnpress-import-export' ); ?></button>
			<button type="button" class="button button-primary" id="lp-ie-start-import" disabled>
				<?php esc_html_e( 'Import valid questions', 'learnpress-import-export' ); ?>
			</button>
		</p>
	</div>

	<!-- Step: Progress -->
	<div class="lp-ie-step" data-step="progress" style="display:none;">
		<div class="lp-ie-card">
			<p id="lp-ie-progress-quiz"></p>
			<div class="lp-ie-progress-bar"><div id="lp-ie-progress-fill"></div></div>
			<p><?php esc_html_e( 'Processed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-progress-text">0 / 0</strong></p>
			<ul>
				<li><?php esc_html_e( 'Created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-created">0</strong></li>
				<li><?php esc_html_e( 'Updated', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-updated">0</strong></li>
				<li><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-p-failed">0</strong></li>
			</ul>
		</div>
	</div>

	<!-- Step: Summary -->
	<div class="lp-ie-step" data-step="summary" style="display:none;">
		<div class="notice notice-success"><p id="lp-ie-summary-msg"><?php esc_html_e( 'Import finished. Published items should now appear in LearnPress. Draft rows remain hidden until published.', 'learnpress-import-export' ); ?></p></div>
		<div class="lp-ie-card">
			<ul>
				<li><?php esc_html_e( 'Created', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-created">0</strong></li>
				<li><?php esc_html_e( 'Updated', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-updated">0</strong></li>
				<li><?php esc_html_e( 'Skipped (invalid)', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-skipped">0</strong></li>
				<li><?php esc_html_e( 'Failed', 'learnpress-import-export' ); ?>: <strong id="lp-ie-s-failed">0</strong></li>
			</ul>
		</div>
		<p>
			<a class="button button-primary" id="lp-ie-edit-quiz" href="#"><?php esc_html_e( 'Edit quiz', 'learnpress-import-export' ); ?></a>
			<button type="button" class="button" id="lp-ie-import-another"><?php esc_html_e( 'Import another file', 'learnpress-import-export' ); ?></button>
		</p>
	</div>
</div>
