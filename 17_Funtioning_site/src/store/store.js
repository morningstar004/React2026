import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;

//React Router DOM is a library for handling navigation in React applications, not a data storage solution itself. Data that you might be tempted to store in React state often has a more natural home in dedicated state management solutions like Redux, the Context API, or even the URL search parameters. 