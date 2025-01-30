"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("./react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  return _react["default"].createElement("main", null, "this is the App", _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "list item 1"), _react["default"].createElement("li", null, "list item 2"), _react["default"].createElement("li", null, "list item 3")));
};
var _default = exports["default"] = App;