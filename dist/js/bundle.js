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
		this.fakeBlockHeight = 100;
		this.fakeBlock = false;
		this.fakeIndificator = 'fake';
		this.panelElements = {
			node: 'Node element',
			node2: 'Node element2',
			sooome: 'dsdasdasd'
		};
		this.structure = [];
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
				this.panelElemListeners(panelElem, elem, this.panelElements[elem]);
			}

			this.panel = this.createElem('div', {
				class: 'app-panel'
			}, '', childs);

			this.appWrapper.appendChild(this.panel);
		};
		this.panelElemListeners = function (elem, type, name) {
			var self = this;
			elem.addEventListener('mousedown', function (e) {
				self.draggableElem = self.createElem('div', {
					class: 'app-panel-elem app-panel-elem__draggable app-panel-elem__' + type,
					'data-name': name,
					'data-type': type
				});
				self.moveTo(self.draggableElem, e.pageX, e.pageY);
				self.appWrapper.appendChild(self.draggableElem);
				self.dragBool = true;
			});
		};
		this.appendBlock = function () {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Block';
			var type = arguments[1];
			var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			index = parseInt(index);
			var section = {
				type: type,
				name: name
			},
			    newStructure = [].concat(this.structure);
			for (var i = index; i < this.structure.length; i++) {
				var elem = this.structure[i],
				    nextI = i + 1;
				newStructure[nextI] = elem;
			}
			newStructure[index] = section;
			this.structure = newStructure;
			this.renderArea(this.structure);
		};
		this.removeFakeBlock = function () {
			var self = this;
			this.structure = this.structure.filter(function (e) {
				return e.type != self.fakeIndificator;
			});
			this.fakeBlock = false;
			this.renderArea(this.structure);
		};
		this.runWrapperListeners = function () {
			var self = this;
			this.appWrapper.addEventListener('mousemove', function (e) {
				if (self.dragBool && self.draggableElem) {
					self.moveTo(self.draggableElem, e.pageX, e.pageY);
					var hasClass = e.target.classList;
					if (hasClass.contains('app-area')) {
						!self.fakeBlock && self.appendBlock(self.draggableElem.dataset.name, self.fakeIndificator, self.structure.length);
					} else if (hasClass.contains('app-area-block__fake')) {} else if (hasClass.contains('app-area-section')) {
						if (self.fakeBlock) {
							if (self.fakeIndex != e.target.dataset.index) {
								self.removeFakeBlock();
								self.appendBlock(self.draggableElem.dataset.name, self.fakeIndificator, e.target.dataset.index);
							}
						} else {
							self.appendBlock(self.draggableElem.dataset.name, self.fakeIndificator, e.target.dataset.index);
						}
					} else {
						self.fakeBlock && self.removeFakeBlock();
					}
				}
			});
			this.appWrapper.addEventListener('mouseup', function (e) {
				if (!self.dragBool) return;
				self.dragBool = false;
				self.fakeBlock && self.removeFakeBlock();
				var hasClass = e.target.classList;
				if (hasClass.contains('app-area-section')) {
					self.appendBlock(self.draggableElem.dataset.name, self.draggableElem.dataset.type, e.target.dataset.index);
				} else if (hasClass.contains('app-panel') || hasClass.contains('app-panel-elem')) {} else {
					self.draggableElem && self.appendBlock(self.draggableElem.dataset.name, self.draggableElem.dataset.type, self.structure.length);
				}
				self.draggableElem.classList.add('remove');
				setTimeout(function () {
					self.draggableElem.remove();
					self.draggableElem = null;
				}, 500);
			});
		};
		this.removeSection = function () {};
		this.clearArea = function () {
			this.area.innerHTML = '';
		};
		this.renderArea = function (structure) {
			var self = this;
			this.clearArea();
			this.fakeBlock = false;
			var sections = structure.map(function (elem, index) {
				var section = self.createElem('div', {
					class: 'app-area-section app-area-section__' + elem.type,
					'data-type': elem.type,
					'data-index': index
				}, elem.type);
				if (elem.type === self.fakeIndificator) {
					self.fakeBlock = true;
					self.fakeIndex = index;
				}
				self.area.appendChild(section);
			});
		};
		this.moveTo = function (target, x, y) {
			target.style.left = x + 'px';
			target.style.top = y + 'px';
		};
		this.run = function () {
			this.build();
			this.runWrapperListeners();
			this.renderArea(this.structure);
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