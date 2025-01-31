"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("../react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Item = function Item(_ref) {
  var name = _ref.name,
    price = _ref.price,
    size = _ref.size,
    _ref$isVegetarian = _ref.isVegetarian,
    isVegetarian = _ref$isVegetarian === void 0 ? false : _ref$isVegetarian;
  return _react["default"].createElement("li", {
    "data-size": size,
    "class": "".concat(name, "_pizza")
  }, name, isVegetarian && " (vegan)", " ".concat(price, "\uC6D0"));
};
var _default = exports["default"] = Item;