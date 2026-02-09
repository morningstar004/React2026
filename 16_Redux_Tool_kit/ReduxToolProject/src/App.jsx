import "./App.css";
import AddTodo from "./components/Addtodos";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./App/store";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-800 min-h-screen text-center  mx-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl font-bold p-4">
            Learn about redux toolkit
          </h1>
          <AddTodo />
          <Todos />
        </div>
      </div>
    </Provider>
  );
}

export default App;
