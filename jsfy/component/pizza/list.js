"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pizza = _interopRequireDefault(require("src/const/pizza"));
var _item = _interopRequireDefault(require("./item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var List = function List() {
  return <>
      {_pizza["default"].map(function (pizzaItemProps) {
      return <_item.default {...pizzaItemProps} />;
    })}
    </>;
};
var _default = exports["default"] = List;