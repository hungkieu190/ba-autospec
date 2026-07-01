/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../learnpress-addons/4.x.x/learnpress-gradebook/assets/src/js/utils.js":
/*!***************************************************************************************!*\
  !*** ../../../../learnpress-addons/4.x.x/learnpress-gradebook/assets/src/js/utils.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDataOfForm: () => (/* binding */ getDataOfForm),
/* harmony export */   getFieldKeysOfForm: () => (/* binding */ getFieldKeysOfForm),
/* harmony export */   listenElementCreated: () => (/* binding */ listenElementCreated),
/* harmony export */   listenElementViewed: () => (/* binding */ listenElementViewed),
/* harmony export */   lpAddQueryArgs: () => (/* binding */ lpAddQueryArgs),
/* harmony export */   lpAjaxParseJsonOld: () => (/* binding */ lpAjaxParseJsonOld),
/* harmony export */   lpClassName: () => (/* binding */ lpClassName),
/* harmony export */   lpFetchAPI: () => (/* binding */ lpFetchAPI),
/* harmony export */   lpGetCurrentURLNoParam: () => (/* binding */ lpGetCurrentURLNoParam),
/* harmony export */   lpOnElementReady: () => (/* binding */ lpOnElementReady),
/* harmony export */   lpSetLoadingEl: () => (/* binding */ lpSetLoadingEl),
/* harmony export */   lpShowHideEl: () => (/* binding */ lpShowHideEl),
/* harmony export */   mergeDataWithDatForm: () => (/* binding */ mergeDataWithDatForm),
/* harmony export */   toggleCollapse: () => (/* binding */ toggleCollapse)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Utils functions
 *
 * @param url
 * @param data
 * @param functions
 * @since 4.2.5.1
 * @version 1.0.4
 */
var lpClassName = {
  hidden: 'lp-hidden',
  loading: 'loading',
  elCollapse: 'lp-collapse',
  elSectionToggle: '.lp-section-toggle',
  elTriggerToggle: '.lp-trigger-toggle'
};
var lpFetchAPI = function lpFetchAPI(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var functions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if ('function' === typeof functions.before) {
    functions.before();
  }
  fetch(url, _objectSpread({
    method: 'GET'
  }, data)).then(function (response) {
    return response.json();
  }).then(function (response) {
    if ('function' === typeof functions.success) {
      functions.success(response);
    }
  })["catch"](function (err) {
    if ('function' === typeof functions.error) {
      functions.error(err);
    }
  })["finally"](function () {
    if ('function' === typeof functions.completed) {
      functions.completed();
    }
  });
};

/**
 * Get current URL without params.
 *
 * @since 4.2.5.1
 */
var lpGetCurrentURLNoParam = function lpGetCurrentURLNoParam() {
  var currentUrl = window.location.href;
  var hasParams = currentUrl.includes('?');
  if (hasParams) {
    currentUrl = currentUrl.split('?')[0];
  }
  return currentUrl;
};
var lpAddQueryArgs = function lpAddQueryArgs(endpoint, args) {
  var url = new URL(endpoint);
  Object.keys(args).forEach(function (arg) {
    url.searchParams.set(arg, args[arg]);
  });
  return url;
};

/**
 * Listen element viewed.
 *
 * @param el
 * @param callback
 * @since 4.2.5.8
 */
var listenElementViewed = function listenElementViewed(el, callback) {
  var observerSeeItem = new IntersectionObserver(function (entries) {
    var _iterator = _createForOfIteratorHelper(entries),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (entry.isIntersecting) {
          callback(entry);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  observerSeeItem.observe(el);
};

/**
 * Listen element created.
 *
 * @param callback
 * @since 4.2.5.8
 */
var listenElementCreated = function listenElementCreated(callback) {
  var observerCreateItem = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            callback(node);
          }
        });
      }
    });
  });
  observerCreateItem.observe(document, {
    childList: true,
    subtree: true
  });
  // End.
};

/**
 * Listen element created.
 *
 * @param selector
 * @param callback
 * @since 4.2.7.1
 */
var lpOnElementReady = function lpOnElementReady(selector, callback) {
  var element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }
  var observer = new MutationObserver(function (mutations, obs) {
    var element = document.querySelector(selector);
    if (element) {
      obs.disconnect();
      callback(element);
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};

// Parse JSON from string with content include LP_AJAX_START.
var lpAjaxParseJsonOld = function lpAjaxParseJsonOld(data) {
  if (typeof data !== 'string') {
    return data;
  }
  var m = String.raw({
    raw: data
  }).match(/<-- LP_AJAX_START -->([^]*)<-- LP_AJAX_END -->/);
  try {
    if (m) {
      data = JSON.parse(m[1].replace(/(?:\r\n|\r|\n)/g, ''));
    } else {
      data = JSON.parse(data);
    }
  } catch (e) {
    data = {};
  }
  return data;
};

// status 0: hide, 1: show
var lpShowHideEl = function lpShowHideEl(el) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!el) {
    return;
  }
  if (!status) {
    el.classList.add(lpClassName.hidden);
  } else {
    el.classList.remove(lpClassName.hidden);
  }
};

// status 0: hide, 1: show
var lpSetLoadingEl = function lpSetLoadingEl(el, status) {
  if (!el) {
    return;
  }
  if (!status) {
    el.classList.remove(lpClassName.loading);
  } else {
    el.classList.add(lpClassName.loading);
  }
};

// Toggle collapse section
var toggleCollapse = function toggleCollapse(e, target) {
  var elTriggerClassName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var elsExclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var callback = arguments.length > 4 ? arguments[4] : undefined;
  if (!elTriggerClassName) {
    elTriggerClassName = lpClassName.elTriggerToggle;
  }

  // Exclude elements, which should not trigger the collapse toggle
  if (elsExclude && elsExclude.length > 0) {
    var _iterator2 = _createForOfIteratorHelper(elsExclude),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var elExclude = _step2.value;
        if (target.closest(elExclude)) {
          return;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  var elTrigger = target.closest(elTriggerClassName);
  if (!elTrigger) {
    return;
  }

  //console.log( 'elTrigger', elTrigger );

  var elSectionToggle = elTrigger.closest("".concat(lpClassName.elSectionToggle));
  if (!elSectionToggle) {
    return;
  }
  elSectionToggle.classList.toggle("".concat(lpClassName.elCollapse));
  if ('function' === typeof callback) {
    callback(elSectionToggle);
  }
};

// Get data of form
var getDataOfForm = function getDataOfForm(form) {
  var dataSend = {};
  var formData = new FormData(form);
  var _iterator3 = _createForOfIteratorHelper(formData.entries()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var pair = _step3.value;
      var key = pair[0];
      var value = formData.getAll(key);
      if (!dataSend.hasOwnProperty(key)) {
        var value_convert = value;
        if ('object' === _typeof(value)) {
          value_convert = value.join(',');
        }
        dataSend[key] = value_convert;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return dataSend;
};

// Get field keys of form
var getFieldKeysOfForm = function getFieldKeysOfForm(form) {
  var keys = [];
  var elements = form.elements;
  for (var i = 0; i < elements.length; i++) {
    var name = elements[i].name;
    if (name && !keys.includes(name)) {
      keys.push(name);
    }
  }
  return keys;
};

// Merge data handle with data form.
var mergeDataWithDatForm = function mergeDataWithDatForm(elForm, dataHandle) {
  var dataForm = getDataOfForm(elForm);
  var keys = getFieldKeysOfForm(elForm);
  keys.forEach(function (key) {
    if (!dataForm.hasOwnProperty(key)) {
      delete dataHandle[key];
    } else if (dataForm[key][0] === '') {
      delete dataForm[key];
      delete dataHandle[key];
    }
  });
  dataHandle = _objectSpread(_objectSpread({}, dataHandle), dataForm);
  return dataHandle;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************************************************************************************!*\
  !*** ../../../../learnpress-addons/4.x.x/learnpress-gradebook/assets/src/js/recent-activity.js ***!
  \*************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "../../../../learnpress-addons/4.x.x/learnpress-gradebook/assets/src/js/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/**
 * Filter students
 */
var filter = function filter(e, target) {
  _utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl(target, 1);
  var gradebookSearchForm = target.closest('.lp-gradebook-filter');
  if (!gradebookSearchForm) {
    return;
  }
  var lpTarget = document.querySelector('.lp-target');
  var dataSend = window.lpAJAXG.getDataSetCurrent(lpTarget);
  dataSend.args.paged = 1;
  var dataForm = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getDataOfForm(gradebookSearchForm);
  var keys = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getFieldKeysOfForm(gradebookSearchForm);
  keys.forEach(function (key) {
    if (!dataForm.hasOwnProperty(key)) {
      delete dataSend.args[key];
    } else if (dataForm[key][0] === '') {
      delete dataForm[key];
      delete dataSend.args[key];
    }
  });
  dataSend.args = _objectSpread(_objectSpread({}, dataSend.args), dataForm);
  window.lpAJAXG.setDataSetCurrent(lpTarget, dataSend);
  var lpTargetY = lpTarget.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({
    top: lpTargetY
  });
  window.lpAJAXG.showHideLoading(lpTarget, 1);
  var callBack = {
    success: function success(response) {
      var status = response.status,
        message = response.message,
        data = response.data;
      lpTarget.innerHTML = data.content || '';
    },
    error: function error(_error) {
      console.log(_error);
    },
    completed: function completed() {
      window.lpAJAXG.showHideLoading(lpTarget, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl(target, 0);
    }
  };
  window.lpAJAXG.fetchAJAX(dataSend, callBack);
};
document.addEventListener('click', function (e) {
  var target = e.target;
  if (target.classList.contains('gradebook-filter-btn')) {
    filter(e, target);
  } else if (target.classList.contains('gradebook-reset-btn')) {
    var gradebookSearchForm = target.closest('.lp-gradebook-filter');
    gradebookSearchForm.reset();
    filter(e, target);
  }
});
document.addEventListener('reset', function (e) {
  if (e.target.classList.contains('lp-gradebook-filter')) {
    e.target.querySelectorAll('.tomselected').forEach(function (tomselectedElement) {
      tomselectedElement.tomselect.clear();
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=recent-activity.js.map