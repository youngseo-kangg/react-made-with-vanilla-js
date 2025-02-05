"use strict";

require("./style.css");
var _render = require("@react/render");
var _App = _interopRequireDefault(require("./App"));
var _intro = _interopRequireDefault(require("./component/intro"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var root = document.querySelector("#app");
if (root) (0, _render.render)(<_intro.default />, root);
console.log("this is the <App /> ----> ", JSON.stringify(<_App.default />, null, 2));