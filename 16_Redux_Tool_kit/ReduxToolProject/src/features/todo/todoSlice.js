import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [ 
    {
        id: 1,
        title: "Learn Redux Toolkit",
        completed: false,
    }
  ],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addtodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            state.todos.push(todo);
        },
        toggletodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deletetodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    }
})