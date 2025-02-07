// style
import "./style.css";

import { createRoot } from "@react/render";

// componnt
import App from "./App";
import Intro from "./component/intro";

const root: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#app");
if (root) createRoot(<Intro />, root);

// console.log("this is the <App /> ----> ", JSON.stringify(<App />, null, 2));
