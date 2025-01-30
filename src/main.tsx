// style
import "./style.css";

// img
import typescriptLogo from "/images/typescript.svg";
import viteLogo from "/images/vite.svg";
import babelLogo from "/images/babel.svg";

// componnt
import App from "./App";
import React from "./react";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <a href="https://vite.dev/" target="_blank">
      <img src="${viteLogo}" class="logo vanilla" alt="Vite logo" />
    </a>
    <a href="https://babeljs.io/" target="_blank">
      <img src="${babelLogo}" class="logo vanilla" alt="babel logo" />
    </a>
    <h1>TS + vite + Babel</h1>
  </div>
`;

console.log(<App />);
