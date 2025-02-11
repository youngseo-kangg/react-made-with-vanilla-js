"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typescript = _interopRequireDefault(require("/images/typescript.svg"));
var _vite = _interopRequireDefault(require("/images/vite.svg"));
var _babel = _interopRequireDefault(require("/images/babel.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Intro = function Intro() {
  return <div>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={_typescript["default"]} class="logo vanilla" alt="TypeScript logo" />
      </a>
      <a href="https://vite.dev/" target="_blank">
        <img src={_vite["default"]} class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://babeljs.io/" target="_blank">
        <img src={_babel["default"]} class="logo vanilla" alt="babel logo" />
      </a>
      <h1>TS + vite + Babel</h1>
      <button onClick={function () {
      return alert("you clicked a button!");
    }}>try clicking this!</button>
    </div>;
};
var _default = exports["default"] = Intro;