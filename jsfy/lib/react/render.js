"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;
var _react = require("src/const/react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _render = exports.render = function render(node, container) {
  if (typeof node === "string") {
    container.appendChild(document.createTextNode(node));
    return;
  }
  var name = node.name,
    props = node.props,
    children = node.children;
  if (typeof name === "function") {
    var componentNode = name(props || {});
    _render(componentNode, container);
    return;
  }
  if (name === _react.React.Fragment) {
    if (children) {
      children.forEach(function (child) {
        return _render(child, container);
      });
    }
    return;
  }
  var element = document.createElement(name);
  if (props) {
    Object.entries(props).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (key.startsWith("on") && typeof value === "function") {
        var modifiedEventName = key.slice(2).toLowerCase();
        element.addEventListener(modifiedEventName, value);
      } else {
        element.setAttribute(key, String(value));
      }
    });
  }
  if (children) {
    (Array.isArray(children) ? children : [children]).forEach(function (child) {
      return _render(child, element);
    });
  }
  container.appendChild(element);
};