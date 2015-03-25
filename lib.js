// Generated by CoffeeScript 1.7.1
(function() {
  var Effect;

  Effect = (function() {
    function Effect(elem, init_src, cb) {
      this.parent = elem;
      this.parent.style.position = 'relative';
      this.parent.style.overflow = 'hidden';
      this._insertImg(init_src, {
        position: 'absolute',
        left: '0%',
        top: '0%'
      }, (function(_this) {
        return function(img) {
          _this.current = img;
          if (typeof cb === 'function') {
            return cb();
          }
        };
      })(this));
    }

    Effect.prototype._insertImg = function(src, style, cb) {
      var img, k;
      img = document.createElement('img');
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'absolute';
      img.style.opacity = '1';
      img.src = src;
      for (k in style) {
        img.style[k] = style[k];
      }
      return img.onload = (function(_this) {
        return function() {
          _this.parent.appendChild(img);
          return cb(img);
        };
      })(this);
    };

    Effect.prototype._finish = function() {
      this.parent.removeChild(this.current);
      this.current = this.animate;
      return this.animating = false;
    };

    Effect.prototype._percentAdd = function(per, delta) {
      var p;
      p = parseFloat(per.substring(0, per.length - 1));
      return (p + delta) + '%';
    };

    Effect.prototype._hasFinishAnimate = function() {
      return this.animate.style.top === '0%' && this.animate.style.left === '0%' && this.animate.style.opacity === '1';
    };

    Effect.prototype._moveCurrentImg = function(name, delta) {
      return this.current.style[name] = this._percentAdd(this.current.style[name], delta);
    };

    Effect.prototype._moveAnimateImg = function(name, delta) {
      return this.animate.style[name] = this._percentAdd(this.animate.style[name], delta);
    };

    Effect.prototype._changeStyle = function(elem, name, delta) {
      return elem.style[name] = this._percentAdd(elem.style[name], delta);
    };

    Effect.prototype._animate = function(src, style, func, onAnimateFinished) {
      if (!this.animating) {
        this.animating = true;
        return this._insertImg(src, style, (function(_this) {
          return function(img) {
            var lo;
            _this.animate = img;
            lo = function() {
              if (_this._hasFinishAnimate()) {
                _this._finish();
                if (typeof onAnimateFinished === 'function') {
                  onAnimateFinished();
                }
                return;
              }
              func();
              return requestAnimationFrame(lo);
            };
            return requestAnimationFrame(lo);
          };
        })(this));
      }
    };

    Effect.prototype.pushLeft = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        left: '100%',
        top: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          _this._moveCurrentImg('left', -delta);
          return _this._moveAnimateImg('left', -delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.pushRight = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        left: '-100%',
        top: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          _this._moveCurrentImg('left', delta);
          return _this._moveAnimateImg('left', delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.pushDown = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '-100%',
        left: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          _this._moveCurrentImg('top', delta);
          return _this._moveAnimateImg('top', delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.pushUp = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '100%',
        left: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          _this._moveCurrentImg('top', -delta);
          return _this._moveAnimateImg('top', -delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.slideUp = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '100%',
        left: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          return _this._moveAnimateImg('top', -delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.slideDown = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '-100%',
        left: '0%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          return _this._moveAnimateImg('top', delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.slideLeft = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '0%',
        left: '100%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          return _this._moveAnimateImg('left', -delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.slideRight = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '0%',
        left: '-100%'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          return _this._moveAnimateImg('left', delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.expand = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '50%',
        left: '50%',
        width: '0',
        height: '0'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 1;
          _this._changeStyle(_this.animate, 'width', delta * 2);
          _this._changeStyle(_this.animate, 'height', delta * 2);
          _this._changeStyle(_this.animate, 'top', -delta);
          return _this._changeStyle(_this.animate, 'left', -delta);
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.fadeIn = function(imgURL, onAnimateFinished) {
      return this._animate(imgURL, {
        top: '0%',
        left: '0%',
        opacity: '0'
      }, (function(_this) {
        return function() {
          var delta;
          delta = 0.05;
          return _this.animate.style.opacity = parseFloat(_this.animate.style.opacity) + delta;
        };
      })(this), onAnimateFinished);
    };

    Effect.prototype.direct = function(imgURL, onFinished) {
      this.current.src = imgURL;
      if (typeof onFinished === 'function') {
        return onFinished();
      }
    };

    return Effect;

  })();

  window.Effect = Effect;

}).call(this);

//# sourceMappingURL=lib.map
