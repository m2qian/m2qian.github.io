"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);

    if (Util.instance) return Util.instance;
    return this.getInstance.apply(this, arguments);
  }

  _createClass(Util, [{
    key: "getInstance",
    value: function getInstance() {
      var instance = {
        /*
         *   formatTime 格式化时间（s）为 hour:minutes:seconds
         *   @params  time  required number (s)
         *   
         *   return hour:minutes:seconds string
         */
        formatTime: function formatTime(time) {
          //没有传time的时候
          if (time === undefined) {
            this.handlerError(123, {
              method: 'formate',
              param: 'time'
            });
            return false;
          }

          var _time = Math.floor(time);

          var _minutes = Math.floor(_time / 60);

          var _hours = Math.floor(_minutes / 60);

          var _seconds = _time - _minutes * 60;

          return (_hours ? this.fillZero(_hours) + ':' : '') + this.fillZero(_minutes - _hours * 60) + ':' + this.fillZero(_seconds);
        },

        /*
         *   fillZero 为小于10的数字补0
         *   @params  num  required number
         *   return '01'.. string
         */
        fillZero: function fillZero(num) {
          //当没有传time的时候
          if (num === undefined) {
            this.handlerError(123, {
              method: 'fillZero',
              param: 'num'
            });
            return false;
          } //这个函数只是让我们在渲染/显示的时候有一个不同的效果，不要操作原数据


          return num > 9 ? num : '0' + num;
        },
        errors: {
          123: function _(_ref) {
            var method = _ref.method,
                param = _ref.param;
            return method + 'function need a param ' + param;
          }
        },
        handlerError: function handlerError(code, options) {
          //处理报错
          console.error('[until error] message' + this.errors[code](options));
        }
      };
      Util.instance = instance;
      return instance;
    }
  }]);

  return Util;
}(); //为了这个工具以后在模块化环境中依然可以使用，需要判断一下，如果是在模块化环境，就将其暴露出去
//commonJs


if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
  module.exports = Util;
} //AMD


if (typeof define === 'function' && define.amd) {
  define('util', [], function () {
    return Util;
  });
}