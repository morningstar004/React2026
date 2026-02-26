import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "../components/index";
import { Login as authSignUp } from "../store/authSlice";
import authServise, { AuthServise } from "../appWrite/auth";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);   

    const signUp = async (data) => {
        setError(null);
        try {
            const user = await authServise.createAccount(data);
            if (user) {
                const userData = await authServise.getCurrentUser();
                if (userData) {
                    dispatch(authSignUp(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-grey-100 rounded-xl p-10 border border-black/20`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create New Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account ?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline "
          >
            Login
          </Link>
        </p>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit(signUp)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              {...register("name", {
                required: true,
                validate: (value) =>
                  value.length >= 3 || "Name must be at least 3 characters",
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email address",
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
              })}
            />
            <Button type="submit" variant="primary" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
