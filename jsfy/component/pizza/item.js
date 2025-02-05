"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Item = function Item(_ref) {
  var name = _ref.name,
    price = _ref.price,
    size = _ref.size,
    _ref$isVegetarian = _ref.isVegetarian,
    isVegetarian = _ref$isVegetarian === void 0 ? false : _ref$isVegetarian;
  return <li data-size={size} class={"".concat(name, "_pizza")}>
      {name}
      {isVegetarian && " (vegan)"}
      {" ".concat(price, "\uC6D0")}
    </li>;
};
var _default = exports["default"] = Item;