# 📦 Redux Toolkit (RTK) – Proper Notes with Example

## 1️⃣ Create Store – Single Source of Truth

### 🔹 Definition

In Redux, the store is a centralized container that holds the entire state of the application.
Redux follows the principle of **Single Source of Truth**, meaning all application state lives in one store.

Redux Toolkit provides `configureStore()` which:

- Simplifies store creation
- Automatically sets up Redux DevTools
- Adds useful middleware like redux-thunk
- Prevents common Redux mistakes

### 🔹 Syntax

```javascript
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})
```

### 🔹 Key Points

- `configureStore()` replaces `createStore()`
- `reducer` is an object, not a single function
- Each key becomes a state slice
- `todos` will be accessible as `state.todos`

> 📌 **Interview Line:** The Redux store is a single JavaScript object that holds the entire application state and is created using `configureStore` in Redux Toolkit.

---

## 2️⃣ Create Slice – Logic + State Together

### 🔹 Definition

A slice represents a feature of the application.
It contains:

- Initial state
- Reducer logic
- Auto-generated action creators

Redux Toolkit uses `createSlice()` to eliminate boilerplate code.

### 🔹 Syntax

```javascript
import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        removeTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        }
    }
})
```

### 🔹 Important Concepts

- `state` → current state of this slice
- `action.payload` → data sent while dispatching action
- **Direct mutation is allowed** ❗ (handled by Immer internally)

### 🔹 Exports

```javascript
export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer
```

> 📌 **Interview Line:** `createSlice` combines reducers and action creators into a single unit, making Redux logic more readable and maintainable.

---

## 3️⃣ Add Todo – Dispatching Action

### 🔹 Definition

To change the state, Redux uses `dispatch`.
Dispatch sends an action object to the reducer via the store.

In React, we use `useDispatch()` hook.

### 🔹 Syntax

```javascript
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'

const dispatch = useDispatch()

dispatch(addTodo({
    id: Date.now(),
    text: "Learn Redux Toolkit"
}))
```

### 🔹 What Happens Internally?

1. `dispatch()` sends action
2. Reducer receives `(state, action)`
3. Reducer updates the state
4. UI re-renders automatically

> 📌 **Interview Line:** Dispatch is the only way to trigger a state change in Redux by sending actions to reducers.

---

## 4️⃣ Take Values – Reading State using useSelector

### 🔹 Definition

`useSelector()` allows React components to read data from the Redux store.

### 🔹 Syntax

```javascript
import { useSelector } from 'react-redux'

const todos = useSelector((state) => state.todos)
```

### 🔹 Explanation

- `state` → entire Redux store
- `state.todos` → slice name used in store
- After fetching data, everything is pure JavaScript

```javascript
todos.map(todo => (
    <li key={todo.id}>{todo.text}</li>
))
```

> 📌 **Interview Line:** `useSelector` subscribes the component to Redux store updates and re-renders it when the selected state changes.

---

## 🔁 Redux Data Flow (VERY IMPORTANT)

```
UI → dispatch(action)
         ↓
    reducer
         ↓
     store
         ↓
useSelector → UI update
```

> 📌 Redux flow is **unidirectional**, not two-way binding.

---

## 🧠 One-Line Memory Hooks (For Exams)

| Term | Definition |
|------|-----------|
| **Store** | Holds entire app state |
| **Slice** | Feature-specific logic + state |
| **Reducer** | Updates state |
| **Action** | Tells what happened |
| **Dispatch** | Sends action |
| **Selector** | Reads state |
