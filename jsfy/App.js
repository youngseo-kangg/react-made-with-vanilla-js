"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("./react"));
var _list = _interopRequireDefault(require("./pizza/list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  return _react["default"].createElement("div", null, _react["default"].createElement("header", null, _react["default"].createElement("h2", null, "current pizza list")), _react["default"].createElement("main", null, _react["default"].createElement("ul", null, _react["default"].createElement(_list["default"], null))), _react["default"].createElement("footer", null, _react["default"].createElement("a", {
    target: "_blank",
    href: "https://github.com/youngseo-kangg/react-made-with-vanilla-js"
  }, "youngseo kangg's github")));
};
var _default = exports["default"] = App;