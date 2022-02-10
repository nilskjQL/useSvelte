import "./App.css";

import SvelteCounterComponent from "./SvelteComponent/SvelteCounterComponent";
import { useState } from "react";

function App() {
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(20);
  return (
    <div className="App">
      <header className="App-header">
        {!hidden && (
          <SvelteCounterComponent count={count} onChangeCount={setCount} />
        )}

        <button onClick={() => setHidden(!hidden)}>
          {hidden ? "show" : "hide"}
        </button>
        <button onClick={() => setCount(count - 1)}>set count</button>
        <p>Count in React: {count}</p>
      </header>
    </div>
  );
}

export default App;
