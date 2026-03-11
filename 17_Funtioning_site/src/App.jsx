import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { useEffect } from "react";
import { Login, Logout } from "./store/authSlice";
import { Header, Footer, Button } from "./components/index";
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
    <div className="min-h-screen flex flex-wrap content-between bg-[#BDE0FE]">
      <div className="w-full block">
        <Header />
        <main className="container mx-auto h-full">
          <Outlet />
        </main>
        <Button />         
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
