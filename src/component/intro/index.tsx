// img
import typescriptLogo from "/images/typescript.svg";
import viteLogo from "/images/vite.svg";
import babelLogo from "/images/babel.svg";

// hook
import { useEffect, useState } from "@react/render";

// component
import Todo from "./todo";

const Intro = () => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    console.log(`clickCount has been updated to ${clickCount}`);
  }, [clickCount]);

  return (
    <div>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
      </a>
      <a href="https://vite.dev/" target="_blank">
        <img src={viteLogo} class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://babeljs.io/" target="_blank">
        <img src={babelLogo} class="logo vanilla" alt="babel logo" />
      </a>
      <h1>TS + vite + Babel</h1>
      <button onClick={() => setClickCount((prev) => prev + 1)}>try clicking this!</button>
      <div>current clickCount is {clickCount}</div>

      <Todo />
    </div>
  );
};

export default Intro;
