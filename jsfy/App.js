"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _list = _interopRequireDefault(require("./component/pizza/list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  return <div>
      <header>
        <h2>current pizza list</h2>
        <div>
          what about <p>this</p>?
        </div>
      </header>
      <main>
        <ul>
          <_list.default />
        </ul>
      </main>
      <footer>
        <a target="_blank" href="https://github.com/youngseo-kangg/react-made-with-vanilla-js">
          youngseo kangg's github
        </a>
      </footer>
    </div>;
};
var _default = exports["default"] = App;