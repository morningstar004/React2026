import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoCard from "./components/TodoCard";
import { TodoProvider } from "./contexts/todoContext.js";
import { useEffect, useState } from "react";

function App() {
  const [Todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos(Todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (title, id) => {
    setTodos(Todos.map((todo) => (todo.id === id ? title : todo)));
  };

  // Todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))

  const toggleTodo = (id) => {
    setTodos(
      Todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // todo.id === id ? { ...todo, completed: !todo.completed } : todo
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('Todos'))

    if (stored && stored.length > 0) {
      setTodos(stored)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  },[Todos])

  return (
    <TodoProvider value={{ addTodo, deleteTodo, editTodo, toggleTodo, Todos }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {Todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoCard todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
