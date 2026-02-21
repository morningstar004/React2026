import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.js";
import "./index.css";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createBrowserRouter,
  RouteProvider,
} from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: " /",
        element: <Home />,
      },
      {
        path: " /",
        element: <Home />,
      },
      {
        path: "/ ",
        element: <Home />,
      },
      {
        path: "/ ",
        element: <Home />,
      },
      {
        path: " /",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouteProvider router={router} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
