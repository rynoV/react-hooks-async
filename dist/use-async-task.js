"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useAsyncTask = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var idCounter = 0;

var createTask = function createTask(func, notifyUpdate) {
  var taskId = Symbol("async_task_id_".concat(idCounter += 1));
  var abortController = null;
  var task = {
    taskId: taskId,
    started: false,
    pending: true,
    error: null,
    result: null,
    start: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!task.started) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                abortController = new AbortController();
                task = _objectSpread({}, task, {
                  started: true
                });
                notifyUpdate(task);
                _context.prev = 5;
                _context.t0 = _objectSpread;
                _context.t1 = {};
                _context.t2 = task;
                _context.next = 11;
                return func(abortController);

              case 11:
                _context.t3 = _context.sent;
                _context.t4 = {
                  pending: false,
                  result: _context.t3
                };
                task = (0, _context.t0)(_context.t1, _context.t2, _context.t4);
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t5 = _context["catch"](5);
                task = _objectSpread({}, task, {
                  pending: false,
                  error: _context.t5
                });

              case 19:
                notifyUpdate(task);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16]]);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }(),
    abort: function abort() {
      if (abortController) {
        abortController.abort();
      }
    }
  };
  return task;
};

var useAsyncTask = function useAsyncTask(func, inputs) {
  var task = (0, _react.useRef)(null);
  task.current = (0, _react.useMemo)(function () {
    return createTask(func, function (t) {
      if (task.current && task.current.taskId === t.taskId) {
        // eslint-disable-next-line no-use-before-define
        setState(t);
      }
    });
  }, inputs);

  var _useState = (0, _react.useState)(task.current),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  if (state.taskId !== task.current.taskId) {
    setState(task.current);
  }

  (0, _react.useEffect)(function () {
    var cleanup = function cleanup() {
      task.current = null;
    };

    return cleanup;
  }, []);
  return state;
};

exports.useAsyncTask = useAsyncTask;
var _default = useAsyncTask;
exports.default = _default;