import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServise from "./appWrite/auth";
import { useEffect } from "react";

function App() {
  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => { }, [ ])
  
  
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-blue-500">
        Hello world! guys
      </h1>
    </>
  );
}

export default App;
