import List from "./component/pizza/list";

const App = () => {
  return (
    <div>
      <header>
        <h2>current pizza list</h2>
        <div>
          what about <p>this</p>?
        </div>
      </header>
      <main>
        <ul>
          <List />
        </ul>
      </main>
      <footer>
        <a target="_blank" href="https://github.com/youngseo-kangg/react-made-with-vanilla-js">
          youngseo kangg's github
        </a>
      </footer>
    </div>
  );
};

export default App;
