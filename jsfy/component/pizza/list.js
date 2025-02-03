"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _item = _interopRequireDefault(require("./item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PIZZA_LIST = [{
  name: "cheese",
  ingredients: ["cheese", "tomato sauce"],
  price: 12000,
  size: "medium",
  isVegetarian: true
}, {
  name: "bulgogi",
  ingredients: ["bulgogi", "cheese", "onion"],
  price: 15000,
  size: "large"
}, {
  name: "pepperoni",
  ingredients: ["pepperoni", "cheese", "tomato sauce"],
  price: 14000,
  size: "large"
}, {
  name: "veggie",
  ingredients: ["mushroom", "olive", "onion", "bell pepper"],
  price: 13000,
  size: "medium",
  isVegetarian: true
}];
var List = function List() {
  return <>
      {PIZZA_LIST.map(function (pizzaItemProps) {
      return <_item.default {...pizzaItemProps} />;
    })}
    </>;
};
var _default = exports["default"] = List;