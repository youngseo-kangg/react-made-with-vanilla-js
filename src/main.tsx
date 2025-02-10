// style
import "./style.css";

import { render } from "@react/render";

// componnt
import App from "./App";
import Intro from "./component/intro";

const root: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#app");
if (root) render(Intro, root);

// console.log("this is the <App /> ----> ", JSON.stringify(<App />, null, 2));
