import "./App.css";
import { useState } from "react";

function App() {

  let [count, setCount] = useState(7)

  const addValue = function(){
    setCount(count + 1);
  }

  const removeValue = function(){
    setCount(count - 1);
  }

  return (
    <>
      <h1>Code With Pranjal</h1>
      <h2>Counter: {count}</h2>
      <button onClick={addValue}>increase count</button>
      <button onClick={removeValue}>decrease count</button>
    </>
  );
}
export default App;
