import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { useEffect } from "react";
import { Login, Logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login(userData));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !Loading ? (
    <div className="app-shell min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto w-full flex-1">
          <Outlet />
        </main>
        <Footer />
    </div>
  ) : (
    <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500" role="status">
      Loading Blogspace…
    </div>
  );
}

export default App;
