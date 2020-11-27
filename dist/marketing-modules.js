/*!
 * marketing-modules.js v1.0.0
 * https://github.com/thiszhong/marketing-modules
 * Licensed MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarketingModulesJS"] = factory();
	else
		root["MarketingModulesJS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/rotate-plate.js
const DEFAULT_COUNT = 8;

class RotatePlate {
  constructor(target, options = {}) {
    const {
      count,
      renderItem,
      angle,
      itemInitAngle,
      endCallback,
      resetAfterEnd = false
    } = options;
    this.count = typeof count === 'number' ? count : DEFAULT_COUNT;
    this.initAngle = angle || 0;
    this.endCallback = endCallback;
    this.resetAfterEnd = resetAfterEnd;
    this.resolveTarget(target);
    this.itemInitAngle = itemInitAngle || 0;

    if (typeof renderItem === 'function') {
      this.renderItems(renderItem);
    }
  }
  /**
   * Do rotate
   * @param {Number} index aim index
   */


  rotate(index) {
    if (typeof index !== 'number') {
      index = parseInt(Math.random() * this.count);
    }

    this.aimIndex = index;
    const minDeg = this.itemDeg * index - index / 2 + this.itemInitAngle + 3; // 避免压线

    const maxDeg = this.itemDeg * index + index / 2 + this.itemInitAngle - 3;
    let deg = (maxDeg - minDeg) * Math.random() + minDeg;
    deg = 360 * 12 - deg; // 圈数

    this.rotatePlateEl.style.transition = 'all 5s';
    this.rotatePlateEl.style.webkitTransition = 'all 5s';
    this.rotatePlateEl.style.webkitTransform = 'rotateZ(' + deg + 'deg)';
    this.rotatePlateEl.style.transform = 'rotateZ(' + deg + 'deg)';
  }
  /**
   * 重置
   * @param {Number} angle Option, 重置角度
   */


  reset(angle) {
    this.rotatePlateEl.style.transition = 'none';
    this.rotatePlateEl.style.webkitTransition = 'none';
    const deg = typeof angle === 'number' ? angle : this.initAngle;
    this.rotatePlateEl.style.webkitTransform = 'rotateZ(' + deg + 'deg)';
    this.rotatePlateEl.style.transform = 'rotateZ(' + deg + 'deg)';
  }
  /**
   * Get the rotate-plate-element
   * @param {String|HTMLElement} target
   */


  resolveTarget(target) {
    if (typeof target === 'string' && /(\#|\.)/.test(target[0])) {
      const val = target.substring(1);
      this.rotatePlateEl = target.startsWith('#') ? document.getElementById(val) : document.getElementsByClassName(val)[0];
    }

    if (!this.rotatePlateEl) {
      throw new TypeError('First argument must be a String(id|class), or HTMLElement');
    }

    if (this.initAngle) this.reset(); // 监听转盘动画transition结束

    const _this = this;

    this.prefixedEvent(this.rotatePlateEl, "TransitionEnd", function () {
      _this.transitionListener.apply(_this);
    });
  }

  transitionListener() {
    this.endCallback && this.endCallback(this.aimIndex);
    if (this.resetAfterEnd) this.reset();
  }
  /**
   * Render the items of rotate-plate
   * @param {Function} func rotate-plate-item-render, will get two params: Function(index, itemWidth), and must return a html string for item
   */


  renderItems(func) {
    if (typeof func !== 'function') {
      throw new TypeError('The "renderItem" must be a Function');
    }

    var rect = this.rotatePlateEl.getBoundingClientRect();
    var r = Math.min(rect.width, rect.height) / 2;
    this.itemDeg = 360 / this.count;
    var chordLength = this.itemDeg / 180 * Math.PI * r; // 根据圆心角和半径求弦长

    var w = parseInt(chordLength);
    var html = '';
    var containerPosition = window.getComputedStyle(this.rotatePlateEl).getPropertyValue('position');
    var itemsWrapper = this.rotatePlateEl.getElementsByClassName('rp-items-wrapper')[0];
    if (containerPosition === 'static') this.rotatePlateEl.style.position = 'relative';

    for (var i = 0; i < this.count; i++) {
      var theRotate = this.itemDeg * i + this.itemInitAngle;
      var str = func(i, w);

      if (typeof str !== 'string') {
        throw new TypeError('The "renderItem" function must return a string of html');
      }

      html += '<div style="' + 'overflow:hidden;position:absolute;left:50%;top:0;margin-left:-' + w / 2 + 'px;text-align:center;height:100%;width:' + w + 'px;transform:rotateZ(' + theRotate + 'deg);-webkit-transform:rotateZ(' + theRotate + 'deg);">' + str + '</div>';
    }

    if (!itemsWrapper) {
      itemsWrapper = document.createElement('div');
      itemsWrapper.setAttribute('class', 'rp-items-wrapper');
      this.rotatePlateEl.append(itemsWrapper);
    }

    console.log(itemsWrapper);
    itemsWrapper.innerHTML = html;
  } // 事件浏览器前缀


  prefixedEvent(element, type, callback) {
    var pfx = ['webkit', ''];

    for (var p = 0; p < pfx.length; p++) {
      if (!pfx[p]) type = type.toLowerCase();
      element.addEventListener(pfx[p] + type, callback, false);
    }
  }

}

/* harmony default export */ var rotate_plate = (RotatePlate);
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = ({
  RotatePlate: rotate_plate
});

/***/ })
/******/ ])["default"];
});