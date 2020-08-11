const DEFAULT_COUNT = 8;

class RotatePlate {

  constructor(target, options = {}) {
    const { count, renderItem, angle, endCallback, resetAfterEnd = false } = options;
    this.count = typeof count === 'number' ? count : DEFAULT_COUNT;
    this.initAngle = angle || 0;
    this.endCallback = endCallback;
    this.resetAfterEnd = resetAfterEnd;

    this.resolveTarget(target);

    if (typeof renderItem === 'function') {
      this.renderItems(renderItem)
    }
  }

  /**
   * Do rotate
   * @param {Number} index aim index
   */
  rotate(index) {
    if (typeof index !== 'number') {
      index = parseInt(Math.random() * this.count)
    }
    this.aimIndex = index;
    const minDeg = this.itemDeg * index - index / 2 + 3; // 避免压线
    const maxDeg = this.itemDeg * index + index / 2 - 3;
    let deg = (maxDeg - minDeg) * Math.random() + minDeg;
    deg = (360 * 12) - deg; // 圈数

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
      throw new TypeError('First argument must be a String(id|class), or HTMLElement')
    }
    if (this.initAngle) this.reset();
    // 监听转盘动画transition结束
    const _this = this;
    this.prefixedEvent(this.rotatePlateEl, "TransitionEnd", function() {
      _this.transitionListener.apply(_this)
    });
  }

  transitionListener() {
    this.endCallback && this.endCallback(this.aimIndex);
    if (this.resetAfterEnd) this.reset()
  }

  /**
   * Render the items of rotate-plate
   * @param {Function} func rotate-plate-item-render, will get two params: Function(index, itemWidth), and must return a html string for item
   */
  renderItems(func) {
    if (typeof func !== 'function') {
      throw new TypeError('The "renderItem" must be a Function')
    }
    var rect = this.rotatePlateEl.getBoundingClientRect();
    var r = Math.min(rect.width, rect.height) / 2;
    this.itemDeg = 360 / this.count;
    var chordLength = (this.itemDeg / 180) * Math.PI * r; // 根据圆心角和半径求弦长
    var w = parseInt(chordLength);

    var html = '';
    var containerPosition = window.getComputedStyle(this.rotatePlateEl).getPropertyValue('position');
    var itemsWrapper = this.rotatePlateEl.getElementsByClassName('rp-items-wrapper')[0];
    if (containerPosition === 'static') this.rotatePlateEl.style.position = 'relative';

    for (var i = 0; i < this.count; i++) {
      var theRotate = this.itemDeg * i;
      var str = func(i, w);
      if (typeof str !== 'string') {
        throw new TypeError('The "renderItem" function must return a string of html')
      }
      html += '<div style="' +
        'overflow:hidden;position:absolute;left:50%;top:0;margin-left:-' + w/2 +
        'px;text-align:center;height:100%;width:' + w +
        'px;transform:rotateZ(' + theRotate + 'deg);-webkit-transform:rotateZ(' + theRotate + 'deg);">' +
        str + '</div>'
    }
    if (!itemsWrapper) {
      itemsWrapper = document.createElement('div');
      itemsWrapper.setAttribute('class', 'rp-items-wrapper');
      this.rotatePlateEl.append(itemsWrapper);
    }
    console.log(itemsWrapper)
    itemsWrapper.innerHTML = html;
  }

  // 事件浏览器前缀
  prefixedEvent(element, type, callback) {
    var pfx = ['webkit', ''];
    for (var p = 0; p < pfx.length; p++) {
      if (!pfx[p]) type = type.toLowerCase();
      element.addEventListener(pfx[p]+type, callback, false);
    }
  }

}

export default RotatePlate;