/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************************************!*\
  !*** ./assets/src/js/admin/lp-migration-learndash.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * LearnDash to LearnPress Migration Handler
 * Class-based implementation for managing the migration process.
 */
class LearnDashMigration {
  constructor() {
    this.wrapper = document.querySelector('.lp-migration-wrapper .content.learndash');
    if (!this.wrapper) return;
    this.restNamespace = LP_ADDON_IMPORT_EXPORT_GLOBAL_OBJECT?.rest_namespace || '';
    this.bodyNode = document.querySelector('body');

    // Step totals from localized script
    this.stepTotals = {
      content: parseInt(LP_ADDON_IMPORT_EXPORT_GLOBAL_OBJECT?.learndash_content_total) || 100,
      student_migrate: parseInt(LP_ADDON_IMPORT_EXPORT_GLOBAL_OBJECT?.learndash_student_migrate_total) || 100
    };

    // SVG Icons
    this.icons = {
      checked: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#34C759"/>
                <path d="M11.0685 5.4759L7.54764 9.62136L5.58892 7.66984C5.37262 7.45166 5.03615 7.4759 4.81985 7.66984C4.60355 7.88802 4.62758 8.22742 4.81985 8.4456L7.01891 10.6153C7.16311 10.7608 7.35538 10.8335 7.54764 10.8335C7.73991 10.8335 7.93218 10.7608 8.07638 10.6153L11.8376 6.2759C12.0539 6.05772 12.0539 5.71833 11.8376 5.50014C11.6213 5.28196 11.2848 5.28196 11.0685 5.4759Z" fill="#34C759"/>
            </svg>`,
      unchecked: `<svg width="16" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.83333C4.3181 1.83333 1.33333 4.8181 1.33333 8.5C1.33333 12.1819 4.3181 15.1667 8 15.1667C11.6819 15.1667 14.6667 12.1819 14.6667 8.5C14.6667 4.8181 11.6819 1.83333 8 1.83333ZM0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5Z" fill="#8A8888"></path>
                <path d="M11.0688 5.9759L7.54789 10.1214L5.58916 8.16984C5.37286 7.95166 5.03639 7.9759 4.82009 8.16984C4.60379 8.38802 4.62783 8.72742 4.82009 8.9456L7.01915 11.1153C7.16335 11.2608 7.35562 11.3335 7.54789 11.3335C7.74016 11.3335 7.93242 11.2608 8.07662 11.1153L11.8379 6.7759C12.0542 6.55772 12.0542 6.21833 11.8379 6.00014C11.6216 5.78196 11.2851 5.78196 11.0688 5.9759Z" fill="#8A8888"></path>
            </svg>`,
      loader: `<div class="loader"></div>`
    };

    // Popups
    this.popups = {
      beforeMigrate: document.querySelector('#lp-before-migrate-popup'),
      clearData: document.querySelector('#lp-clear-migrated-data-popup'),
      success: document.querySelector('#lp-migrate-success-popup')
    };
    this.initElements();
    this.bindEvents();
  }
  initElements() {
    this.statusNode = this.wrapper.querySelector('.status');
    this.autoMigrateBtn = this.wrapper.querySelector('#lp-auto-migrate-btn.learndash');
    this.clearDataBtn = this.wrapper.querySelector('#lp-clear-migrate-btn');

    // Migration steps configuration
    this.steps = {
      content: this.getStepElements('.step-content'),
      student_migrate: this.getStepElements('.step-student-migrate')
    };
    this.migrateItemCheckboxes = this.wrapper.querySelectorAll('.migrate-item .migrate-item-checkbox');
  }
  getStepElements(selector) {
    const node = this.wrapper.querySelector(selector);
    if (!node) return null;
    return {
      node,
      progressBar: node.querySelector('.progress-bar'),
      total: node.querySelector('.migrated-total'),
      icon: node.querySelector('.migrate-item-checkbox')
    };
  }
  bindEvents() {
    this.bindAutoMigration();
    this.bindClearData();
    this.bindSuccessPopup();
  }
  bindAutoMigration() {
    if (!this.autoMigrateBtn || !this.popups.beforeMigrate) return;
    this.autoMigrateBtn.addEventListener('click', () => {
      this.popups.beforeMigrate.classList.add('active');
      this.bodyNode.classList.add('lp-no-scroll');
    });
    const closeBeforeMigratePopup = () => {
      this.popups.beforeMigrate.classList.remove('active');
      this.bodyNode.classList.remove('lp-no-scroll');
    };
    const migrateBtn = this.popups.beforeMigrate.querySelector('button.migrate-now');
    migrateBtn?.addEventListener('click', () => {
      closeBeforeMigratePopup();
      this.autoMigrateBtn.disabled = true;
      this.reset();
      this.removeStatus();
      this.migrate();
    });

    // Close popup on cancel button or close icon click
    this.popups.beforeMigrate.querySelector('button.cancel')?.addEventListener('click', closeBeforeMigratePopup);
    this.popups.beforeMigrate.querySelector('.dashicons-no-alt')?.addEventListener('click', closeBeforeMigratePopup);
  }
  bindClearData() {
    if (!this.clearDataBtn || !this.popups.clearData) return;
    this.clearDataBtn.addEventListener('click', () => {
      this.popups.clearData.classList.add('active');
      this.bodyNode.classList.add('lp-no-scroll');
    });
    const closeClearDataPopup = () => {
      this.popups.clearData.classList.remove('active');
      this.bodyNode.classList.remove('lp-no-scroll');
    };

    // Close popup on cancel button or close icon click
    this.popups.clearData.querySelector('button.cancel')?.addEventListener('click', closeClearDataPopup);
    this.popups.clearData.querySelector('.dashicons-no-alt')?.addEventListener('click', closeClearDataPopup);
    const clearMigratedBtn = this.popups.clearData.querySelector('button.clear-migrated');
    clearMigratedBtn?.addEventListener('click', event => {
      event.preventDefault();
      closeClearDataPopup();
      this.clearDataBtn.disabled = true;
      this.setAllCheckboxes(this.icons.loader);
      wp.apiFetch({
        path: `/${this.restNamespace}/delete-migrated-data/learndash`,
        method: 'DELETE'
      }).then(res => {
        if (res.status === 'success') {
          this.showStatus(res.msg, 'success');
          this.reset();
          this.autoMigrateBtn.disabled = false;
        } else {
          this.showStatus(res.msg, 'error');
        }
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        this.clearDataBtn.disabled = false;
      });
    });
  }
  bindSuccessPopup() {
    if (!this.popups.success) return;
    const closePopup = () => {
      this.popups.success.classList.remove('active');
      this.bodyNode.classList.remove('lp-no-scroll');
    };
    this.popups.success.querySelector('a.remove-popup')?.addEventListener('click', closePopup);
    this.popups.success.querySelector('.bg-overlay')?.addEventListener('click', closePopup);
    this.popups.success.querySelector('.view-report')?.addEventListener('click', event => {
      event.preventDefault();
      closePopup();
      window.location.reload();
    });
  }
  reset() {
    Object.values(this.steps).forEach(step => {
      if (step) {
        step.progressBar.style.width = '0%';
        step.total.innerHTML = '0';
      }
    });
    this.setAllCheckboxes(this.icons.unchecked);
  }
  removeStatus() {
    this.statusNode.innerHTML = '';
    this.statusNode.classList.remove('lp-migration-success', 'lp-migration-error');
  }
  showStatus(msg, type) {
    this.statusNode.innerHTML = msg;
    this.statusNode.classList.remove('lp-migration-success', 'lp-migration-error');
    this.statusNode.classList.add(`lp-migration-${type}`);
  }
  setAllCheckboxes(html) {
    this.migrateItemCheckboxes.forEach(el => {
      el.innerHTML = html;
    });
  }
  setLoading(item) {
    const step = this.steps[item];
    if (step?.icon && !step.icon.querySelector('.loader')) {
      step.icon.innerHTML = this.icons.loader;
    }
  }
  migrate(paged = 1, item = 'content') {
    this.setLoading(item);
    const number = 20;
    wp.apiFetch({
      path: `/${this.restNamespace}/migrate/learndash`,
      method: 'POST',
      data: {
        paged,
        number,
        item
      }
    }).then(res => {
      if (res.status === 'success') {
        this.updateProgress(item, res.data);
        if (res.data?.next_migrate_item) {
          this.migrate(res.data.next_page, res.data.next_migrate_item);
        } else {
          this.onMigrationComplete(item, res);
        }
      } else {
        this.showStatus(res.msg, 'error');
      }
    }).catch(err => {
      console.error(err);
    });
  }
  updateProgress(item, data) {
    const step = this.steps[item];
    if (!step) return;
    const current = data?.migrated_total || 0;
    const stepTotal = this.stepTotals[item] || 100;
    const percentage = Math.min(100, (current / stepTotal * 100).toFixed(0));
    if (step.progressBar) {
      step.progressBar.style.width = `${percentage}%`;
    }
    if (step.total) {
      step.total.innerHTML = current;
    }
    if (data?.next_migrate_item && data.next_migrate_item !== item && step.icon) {
      step.icon.innerHTML = this.icons.checked;
    }
  }
  onMigrationComplete(item, res) {
    this.showStatus(res.msg, 'success');
    this.clearDataBtn.disabled = false;
    if (item === 'student_migrate' && this.steps.student_migrate?.icon) {
      this.steps.student_migrate.icon.innerHTML = this.icons.checked;
    }
    setTimeout(() => {
      this.displaySuccessPopup(res.data);
    }, 1000);
  }
  displaySuccessPopup(data) {
    if (!this.popups.success) return;
    const result = this.popups.success.querySelector('.migrate-result');
    result.innerHTML = data.migrate_success_html;
    this.popups.success.classList.add('active');
    this.bodyNode.classList.add('lp-no-scroll');
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new LearnDashMigration();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LearnDashMigration);
/******/ })()
;
//# sourceMappingURL=lp-migration-learndash.js.map