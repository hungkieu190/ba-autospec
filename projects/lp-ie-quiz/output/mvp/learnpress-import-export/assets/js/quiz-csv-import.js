/**
 * Import Quizzes (course) + Import Questions screens.
 */
(function ($) {
	'use strict';

	if (typeof lpIeQuizCsv === 'undefined') {
		return;
	}

	var state = {
		jobId: '',
		mode: 'questions',
		courseId: 0,
		courseTitle: '',
		quizId: 0,
		quizTitle: '',
		destination: 'existing',
		counts: null,
	};

	function notice(msg, type) {
		var $n = $('#lp-ie-notice');
		if (!$n.length) return;
		$n.removeClass('notice-error notice-success notice-warning')
			.addClass('notice notice-' + (type || 'error'))
			.show()
			.find('p')
			.text(msg);
	}

	function showStep(name) {
		$('.lp-ie-step').hide();
		$('.lp-ie-step[data-step="' + name + '"]').show();
	}

	function ajax(action, data) {
		data = data || {};
		data.action = action;
		data.nonce = lpIeQuizCsv.nonce;
		return $.ajax({ url: lpIeQuizCsv.ajaxUrl, method: 'POST', data: data });
	}

	function downloadTemplate(format, kind) {
		window.location =
			lpIeQuizCsv.ajaxUrl +
			'?action=lp_ie_quiz_csv_download_template&format=' +
			encodeURIComponent(format || 'csv') +
			'&kind=' +
			encodeURIComponent(kind || 'questions') +
			'&nonce=' +
			encodeURIComponent(lpIeQuizCsv.nonce);
	}

	/* ——— shared dropdown helpers ——— */
	function openList($list) {
		$list.addClass('is-open').attr('aria-hidden', 'false');
	}
	function closeList($list) {
		$list.removeClass('is-open').attr('aria-hidden', 'true');
	}

	function searchCourses(q, openAfter) {
		$.ajax({
			url: lpIeQuizCsv.ajaxUrl,
			method: 'GET',
			data: { action: 'lp_ie_quiz_csv_search_courses', nonce: lpIeQuizCsv.nonce, q: q || '' },
		}).done(function (res) {
			if (!res.success) return;
			var $list = $('#lp-ie-course-list').empty();
			var items = res.data.items || [];
			if (!items.length) {
				$list.append($('<li/>').append($('<span class="meta"/>').text('No courses found.')));
			} else {
				items.forEach(function (item) {
					var $btn = $('<button type="button"/>')
						.toggleClass('is-selected', String(item.id) === String(state.courseId))
						.append(document.createTextNode(item.title))
						.on('click', function (e) {
							e.preventDefault();
							state.courseId = item.id;
							state.courseTitle = item.title;
							$('#lp-ie-course-id').val(item.id);
							$('#lp-ie-selected-course').text(item.title);
							$('#lp-ie-course-search').val(item.title);
							closeList($list);
						});
					$list.append($('<li/>').append($btn));
				});
			}
			if (openAfter) openList($list);
		});
	}

	function searchQuizzes(q, openAfter) {
		$.ajax({
			url: lpIeQuizCsv.ajaxUrl,
			method: 'GET',
			data: { action: 'lp_ie_quiz_csv_search_quizzes', nonce: lpIeQuizCsv.nonce, q: q || '' },
		}).done(function (res) {
			if (!res.success) return;
			var $list = $('#lp-ie-quiz-list').empty();
			var items = res.data.items || [];
			if (!items.length) {
				$list.append($('<li/>').append($('<span class="meta"/>').text('No quizzes found.')));
			} else {
				items.forEach(function (item) {
					var $btn = $('<button type="button"/>')
						.toggleClass('is-selected', String(item.id) === String(state.quizId))
						.append(document.createTextNode(item.title))
						.append($('<span class="meta"/>').text((item.questions || 0) + ' questions'))
						.on('click', function (e) {
							e.preventDefault();
							state.quizId = item.id;
							state.quizTitle = item.title;
							$('#lp-ie-quiz-id').val(item.id);
							$('#lp-ie-selected-quiz').text(item.title);
							$('#lp-ie-quiz-search').val(item.title);
							closeList($list);
						});
					$list.append($('<li/>').append($btn));
				});
			}
			if (openAfter) openList($list);
		});
	}

	function renderPreview(rows, multi) {
		var $tb = $('#lp-ie-preview-table tbody').empty();
		(rows || []).forEach(function (r) {
			var msg = (r.messages || []).join('; ') || '—';
			var $tr = $('<tr/>').attr('data-status', r.status);
			$tr.append($('<td/>').text(r.line));
			if (multi) {
				$tr.append($('<td/>').text(r.section || ''));
				$tr.append($('<td/>').text(r.quiz || ''));
			}
			$tr.append($('<td/>').append(statusBadge(r.status)));
			$tr.append($('<td/>').text(r.title || ''));
			$tr.append($('<td/>').append(typeBadge(r.type || '')));
			if (!multi) {
				$tr.append($('<td/>').text(r.action || ''));
			}
			$tr.append($('<td/>').text(msg));
			$tb.append($tr);
		});
	}

	/* ——— QUIZZES MODE ——— */
	function statusBadge(status) {
		return $('<span/>')
			.addClass('lp-ie-badge')
			.addClass(status || '')
			.text(status || '-');
	}

	function typeBadge(type) {
		return $('<code/>')
			.addClass('lp-ie-type-badge')
			.text(type || '-');
	}

	function initQuizzesApp() {
		state.mode = 'quizzes';
		var searchTimer;
		var $search = $('#lp-ie-course-search');
		var $list = $('#lp-ie-course-list');

		$search.on('focus click', function () {
			searchCourses($search.val() || '', true);
		});
		$search.on('input', function () {
			clearTimeout(searchTimer);
			var q = $(this).val();
			searchTimer = setTimeout(function () {
				searchCourses(q, true);
			}, 250);
		});
		$(document).on('click.lpIeCourse', function (e) {
			if (!$(e.target).closest('#lp-ie-course-search, #lp-ie-course-list').length) {
				closeList($list);
			}
		});

		$('.lp-ie-dl-tpl').on('click', function () {
			downloadTemplate($(this).data('format'), 'quizzes');
		});

		$('#lp-ie-validate').on('click', function () {
			var courseId = $('#lp-ie-course-id').val();
			var fileInput = document.getElementById('lp-ie-import-file');
			if (!courseId) {
				notice(lpIeQuizCsv.i18n.selectCourse);
				return;
			}
			if (!fileInput || !fileInput.files || !fileInput.files[0]) {
				notice(lpIeQuizCsv.i18n.selectFile);
				return;
			}
			var fd = new FormData();
			fd.append('action', 'lp_ie_quiz_csv_upload_validate_quizzes');
			fd.append('nonce', lpIeQuizCsv.nonce);
			fd.append('course_id', courseId);
			fd.append('section_name', $('#lp-ie-section-name').val() || '');
			fd.append('import_file', fileInput.files[0]);
			$('#lp-ie-validate').prop('disabled', true);
			$.ajax({
				url: lpIeQuizCsv.ajaxUrl,
				method: 'POST',
				data: fd,
				processData: false,
				contentType: false,
			})
				.done(function (res) {
					$('#lp-ie-validate').prop('disabled', false);
					if (!res.success) {
						notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
						return;
					}
					var d = res.data;
					state.jobId = d.job_id;
					state.courseId = d.course.id;
					state.courseTitle = d.course.title;
					$('#lp-ie-meta-course').text(d.course.title);
					$('#lp-ie-meta-sections').text((d.sections || []).join(', ') || 'Imported quizzes');
					$('#lp-ie-meta-quizzes').text(d.quiz_count || 0);
					$('#lp-ie-c-valid').text((d.counts && d.counts.valid) || 0);
					$('#lp-ie-c-invalid').text((d.counts && d.counts.invalid) || 0);
					renderPreview(d.preview, true);
					$('#lp-ie-start-import')
						.prop('disabled', !(d.quiz_count > 0 && d.counts && d.counts.valid > 0))
						.text('Import ' + (d.quiz_count || 0) + ' quizzes');
					$('#lp-ie-notice').hide();
					showStep('preview');
				})
				.fail(function () {
					$('#lp-ie-validate').prop('disabled', false);
					notice(lpIeQuizCsv.i18n.error);
				});
		});

		$('#lp-ie-back-configure').on('click', function () {
			showStep('configure');
		});
		$('#lp-ie-error-log').on('click', function () {
			if (!state.jobId) return;
			window.location =
				lpIeQuizCsv.ajaxUrl +
				'?action=lp_ie_quiz_csv_error_log&nonce=' +
				encodeURIComponent(lpIeQuizCsv.nonce) +
				'&job_id=' +
				encodeURIComponent(state.jobId);
		});

		$('#lp-ie-start-import').on('click', function () {
			$('#lp-ie-start-import').prop('disabled', true);
			ajax('lp_ie_quiz_csv_start_import_quizzes', { job_id: state.jobId }).done(function (res) {
				if (!res.success) {
					$('#lp-ie-start-import').prop('disabled', false);
					notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
					return;
				}
				$('#lp-ie-progress-quiz').text(state.courseTitle);
				showStep('progress');
				runQuizBatches();
			});
		});

		function runQuizBatches() {
			function tick() {
				return ajax('lp_ie_quiz_csv_process_quiz_batch', { job_id: state.jobId }).then(function (res) {
					if (!res.success) {
						notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
						return;
					}
					var d = res.data;
					var pct = d.total ? Math.round((d.processed / d.total) * 100) : 0;
					$('#lp-ie-progress-fill').css('width', pct + '%');
					$('#lp-ie-progress-text').text(d.processed + ' / ' + d.total);
					$('#lp-ie-p-created').text(d.created);
					$('#lp-ie-p-updated').text(d.updated);
					$('#lp-ie-p-failed').text(d.failed);
					if (d.last_quiz) {
						$('#lp-ie-progress-quiz').text(
							state.courseTitle +
								(d.last_section ? ' - ' + d.last_section : '') +
								' - ' +
								d.last_quiz
						);
					}
					if (d.done) {
						$('#lp-ie-s-created').text(d.created);
						$('#lp-ie-s-updated').text(d.updated);
						$('#lp-ie-s-skipped').text(d.skipped || 0);
						$('#lp-ie-s-failed').text(d.failed);
						$('#lp-ie-edit-course').attr(
							'href',
							(lpIeQuizCsv.editCourseBase || lpIeQuizCsv.editQuizBase) + d.course_id
						);
						showStep('summary');
						return;
					}
					return tick();
				});
			}
			return tick();
		}

		$('#lp-ie-import-another').on('click', function () {
			state.jobId = '';
			$('#lp-ie-import-file').val('');
			showStep('configure');
		});
	}

	/* ——— QUESTIONS MODE ——— */
	function initQuestionsApp() {
		state.mode = 'questions';
		var searchTimer;
		var $search = $('#lp-ie-quiz-search');
		var $list = $('#lp-ie-quiz-list');

		function syncDest() {
			var d = $('input[name="lp_ie_q_dest"]:checked').val() || 'existing';
			$('#lp-ie-panel-existing').toggle(d === 'existing');
			$('#lp-ie-insert-position-card').toggle(d === 'existing');
		}
		$('input[name="lp_ie_q_dest"]').on('change', syncDest);
		syncDest();

		$search.on('focus click', function () {
			searchQuizzes($search.val() || '', true);
		});
		$search.on('input', function () {
			clearTimeout(searchTimer);
			var q = $(this).val();
			searchTimer = setTimeout(function () {
				searchQuizzes(q, true);
			}, 250);
		});
		$(document).on('click.lpIeQuiz', function (e) {
			if (!$(e.target).closest('#lp-ie-quiz-search, #lp-ie-quiz-list').length) {
				closeList($list);
			}
		});

		$('input[name="lp_ie_pos"]').on('change', function () {
			$('#lp-ie-after-n').prop(
				'disabled',
				$('input[name="lp_ie_pos"]:checked').val() !== 'after'
			);
		});

		$('.lp-ie-dl-tpl').on('click', function () {
			downloadTemplate($(this).data('format'), 'questions');
		});

		$('#lp-ie-validate').on('click', function () {
			var dest = $('input[name="lp_ie_q_dest"]:checked').val() || 'existing';
			var quizId = $('#lp-ie-quiz-id').val() || '0';
			var fileInput = document.getElementById('lp-ie-import-file');
			if (dest === 'existing' && !quizId) {
				notice(lpIeQuizCsv.i18n.selectQuiz);
				return;
			}
			if (!fileInput || !fileInput.files || !fileInput.files[0]) {
				notice(lpIeQuizCsv.i18n.selectFile);
				return;
			}
			var fd = new FormData();
			fd.append('action', 'lp_ie_quiz_csv_upload_validate');
			fd.append('nonce', lpIeQuizCsv.nonce);
			fd.append('destination', dest === 'bank' ? 'bank' : 'existing');
			fd.append('quiz_id', dest === 'existing' ? quizId : '0');
			fd.append('insert_position', $('input[name="lp_ie_pos"]:checked').val() || 'end');
			fd.append('after_n', $('#lp-ie-after-n').val() || 1);
			fd.append('import_file', fileInput.files[0]);
			$('#lp-ie-validate').prop('disabled', true);
			$.ajax({
				url: lpIeQuizCsv.ajaxUrl,
				method: 'POST',
				data: fd,
				processData: false,
				contentType: false,
			})
				.done(function (res) {
					$('#lp-ie-validate').prop('disabled', false);
					if (!res.success) {
						notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
						return;
					}
					var d = res.data;
					state.jobId = d.job_id;
					state.destination = d.destination;
					state.quizId = d.quiz.id || 0;
					state.quizTitle = d.quiz.title;
					$('#lp-ie-meta-quiz').text(d.quiz.title);
					$('#lp-ie-meta-current').text(
						d.destination === 'bank' ? '—' : d.quiz.questions
					);
					$('#lp-ie-meta-cu').text(
						(d.counts.create || 0) + ' create · ' + (d.counts.update || 0) + ' update'
					);
					$('#lp-ie-c-valid').text(d.counts.valid || 0);
					$('#lp-ie-c-warning').text(d.counts.warning || 0);
					$('#lp-ie-c-invalid').text(d.counts.invalid || 0);
					renderPreview(d.preview, false);
					$('#lp-ie-start-import')
						.prop('disabled', !(d.counts.valid > 0))
						.text(
							(lpIeQuizCsv.i18n.importValid || 'Import %d valid questions').replace(
								'%d',
								String(d.counts.valid || 0)
							)
						);
					$('#lp-ie-notice').hide();
					showStep('preview');
				})
				.fail(function () {
					$('#lp-ie-validate').prop('disabled', false);
					notice(lpIeQuizCsv.i18n.error);
				});
		});

		$('#lp-ie-back-configure').on('click', function () {
			showStep('configure');
		});
		$('#lp-ie-error-log').on('click', function () {
			if (!state.jobId) return;
			window.location =
				lpIeQuizCsv.ajaxUrl +
				'?action=lp_ie_quiz_csv_error_log&nonce=' +
				encodeURIComponent(lpIeQuizCsv.nonce) +
				'&job_id=' +
				encodeURIComponent(state.jobId);
		});

		$('#lp-ie-start-import').on('click', function () {
			$('#lp-ie-start-import').prop('disabled', true);
			ajax('lp_ie_quiz_csv_start_import', { job_id: state.jobId }).done(function (res) {
				if (!res.success) {
					$('#lp-ie-start-import').prop('disabled', false);
					notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
					return;
				}
				$('#lp-ie-progress-quiz').text(state.quizTitle);
				showStep('progress');
				runQuestionBatches();
			});
		});

		function runQuestionBatches() {
			function tick() {
				return ajax('lp_ie_quiz_csv_process_batch', { job_id: state.jobId }).then(function (res) {
					if (!res.success) {
						notice((res.data && res.data.message) || lpIeQuizCsv.i18n.error);
						return;
					}
					var d = res.data;
					var pct = d.total ? Math.round((d.processed / d.total) * 100) : 0;
					$('#lp-ie-progress-fill').css('width', pct + '%');
					$('#lp-ie-progress-text').text(d.processed + ' / ' + d.total);
					$('#lp-ie-p-created').text(d.created);
					$('#lp-ie-p-updated').text(d.updated);
					$('#lp-ie-p-failed').text(d.failed);
					if (d.done) {
						$('#lp-ie-s-created').text(d.created);
						$('#lp-ie-s-updated').text(d.updated);
						$('#lp-ie-s-skipped').text(d.skipped || 0);
						$('#lp-ie-s-failed').text(d.failed);
						var $edit = $('#lp-ie-edit-quiz');
						if (d.quiz_id > 0) {
							$edit.attr('href', lpIeQuizCsv.editQuizBase + d.quiz_id).text('Edit quiz');
						} else {
							$edit
								.attr('href', lpIeQuizCsv.questionsListUrl)
								.text('View content bank');
						}
						showStep('summary');
						return;
					}
					return tick();
				});
			}
			return tick();
		}

		$('#lp-ie-import-another').on('click', function () {
			state.jobId = '';
			$('#lp-ie-import-file').val('');
			showStep('configure');
		});
	}

	/* ——— settings ——— */
	function initSettings() {
		$('#lp-ie-save-settings').on('click', function () {
			ajax('lp_ie_quiz_csv_save_settings', {
				max_file_mb: $('#lp-ie-max-file').val(),
				max_rows: $('#lp-ie-max-rows').val(),
				max_answers: $('#lp-ie-max-answers').val(),
				batch_size: $('#lp-ie-batch-size').val(),
			}).done(function (res) {
				if (res.success) {
					$('#lp-ie-settings-notice').show().find('p').text(lpIeQuizCsv.i18n.saved);
				}
			});
		});
	}

	$(function () {
		if ($('#lp-ie-import-quizzes-app').length) {
			initQuizzesApp();
		} else if ($('#lp-ie-import-questions-app').length) {
			initQuestionsApp();
		} else if ($('#lp-ie-quiz-csv-settings').length) {
			initSettings();
		} else if ($('#lp-ie-quiz-csv-app').length) {
			// Legacy single-page fallback → treat as questions.
			initQuestionsApp();
		}
	});
})(jQuery);
