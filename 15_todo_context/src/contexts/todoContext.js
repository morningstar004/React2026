import { useContext, createContext } from "react";

export const TodoContext = createContext({
    Todos: [
        {
            id: 1,
            title: "react learn",
            completed: false,
        }
    ],
    addTodo: (title) => {},
    editTodo: (title,id) => {},
    deleteTodo: (id) => {},
    toggleTodo: (id) => {}
});

export const useTodo = () => {
  return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider