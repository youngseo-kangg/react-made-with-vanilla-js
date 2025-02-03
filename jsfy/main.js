"use strict";

require("./style.css");
var _typescript = _interopRequireDefault(require("/images/typescript.svg"));
var _vite = _interopRequireDefault(require("/images/vite.svg"));
var _babel = _interopRequireDefault(require("/images/babel.svg"));
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
document.querySelector("#app").innerHTML = "\n  <div>\n    <a href=\"https://www.typescriptlang.org/\" target=\"_blank\">\n      <img src=\"".concat(_typescript["default"], "\" class=\"logo vanilla\" alt=\"TypeScript logo\" />\n    </a>\n    <a href=\"https://vite.dev/\" target=\"_blank\">\n      <img src=\"").concat(_vite["default"], "\" class=\"logo vanilla\" alt=\"Vite logo\" />\n    </a>\n    <a href=\"https://babeljs.io/\" target=\"_blank\">\n      <img src=\"").concat(_babel["default"], "\" class=\"logo vanilla\" alt=\"babel logo\" />\n    </a>\n    <h1>TS + vite + Babel</h1>\n  </div>\n");
console.log("this is the <App /> ----> ", JSON.stringify(<_App.default />, null, 2));