import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServise from "./appWrite/auth";
import { useEffect } from "react";
import { Login, Logout } from "./store/authSlice";
import { Header, Footer, Container, Logo, LogoutBtn } from "./components/index";
import { Outlet } from "react-router-dom";
import PostCard from "./components/PostCard";
import Select from "./components/Select";
import SimpleBtn from "./components/SimpleBtn";

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authServise
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login({ userData }));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !Loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <SimpleBtn />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
