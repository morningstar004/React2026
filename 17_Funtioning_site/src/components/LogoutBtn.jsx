import React from "react";
import { useDispatch } from "react-redux";
import authServise from "../appWrite/auth";
import { Logout } from "../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authServise.logout.then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      logout
    </div>
  );
};

export default LogoutBtn;
