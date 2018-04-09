/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tree = __webpack_require__(2);

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _tree2.default();
app.run();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
;(function (w) {
	w.Tree = function () {
		this.panelElements = {
			node: 'Node element'
		};
		this.appWrapper = document.querySelector('#app');
		this.dragBool = false;
		this.draggableElem = null;
		this.data = {};
		this.createElem = function (tag, props, html, children) {
			var element = document.createElement(tag);
			for (var prop in props) {
				element.setAttribute(prop, props[prop]);
			}
			if (html) element.innerHTML = html;
			if (children) {
				if (children instanceof Element) {
					element.appendChild(children);
				}
				if (children instanceof Array) {
					children.forEach(function (elem, index) {
						elem instanceof Element ? element.appendChild(elem) : console.log(elem + ': Не является DOM элементом');
					});
				}
			}
			return element;
		};
		this.build = function () {
			this.buildArea();
			this.buildPanel();
		};
		this.buildArea = function () {
			this.area = this.createElem('div', {
				class: 'app-area'
			});
			this.appWrapper.appendChild(this.area);
		};
		this.buildPanel = function () {
			var title = this.createElem('h1', {}, 'Tree app'),
			    childs = [title];

			for (var elem in this.panelElements) {
				var panelElem = this.createElem('div', {
					class: 'app-panel-elem app-panel-elem__' + elem
				}, this.panelElements[elem]);
				panelElem.dataset.type = elem;
				childs.push(panelElem);
				this.panelElemListeners(panelElem, elem);
			}

			this.panel = this.createElem('div', {
				class: 'app-panel'
			}, '', childs);

			this.appWrapper.appendChild(this.panel);
		};
		this.panelElemListeners = function (elem, type) {
			var self = this;
			elem.addEventListener('mousedown', function (e) {
				self.draggableElem = self.createElem('div', {
					class: 'app-panel-elem app-panel-elem__draggable app-panel-elem__' + type
				});
				self.moveTo(self.draggableElem, e.pageX, e.pageY);
				self.appWrapper.appendChild(self.draggableElem);
				self.dragBool = true;
			});
		};
		this.runWrapperListeners = function () {
			var self = this;
			this.appWrapper.addEventListener('mousemove', function (e) {
				if (self.dragBool && self.draggableElem) self.moveTo(self.draggableElem, e.pageX, e.pageY);
			});
			this.appWrapper.addEventListener('mouseup', function (e) {
				self.dragBool = false;
				if (!e.target.classList.contains('app-node')) {
					self.draggableElem.classList.add('remove');
					setTimeout(function () {
						self.draggableElem.remove();
						self.draggableElem = null;
					}, 500);
				}
			});
		};
		this.moveTo = function (target, x, y) {
			target.style.left = x + 'px';
			target.style.top = y + 'px';
		};
		this.run = function () {
			this.build();
			this.runWrapperListeners();
		};
	};
})(window);
exports.default = Tree;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map