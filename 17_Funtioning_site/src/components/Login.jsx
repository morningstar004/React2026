import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "../components/index";
import { Login as authLogin } from "../store/authSlice";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError(" ");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));//not understand this line
        navigate("/");
      }
    } catch (error) {
      setError(
        `authSlice :: Login failed :: ${error.message} :: ${error.code}`,
      );
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full bg-[#A2D2FF] max-w-lg bg-grey-100 rounded-xl p-10 border border-black/20`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          SignIn To Your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have a account ?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-300 hover:underline "
          >
            SignUp
          </Link>
        </p>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
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
            <Button type="submit" variant="primary" className="w-full text-black bg-[#FFAFCC] hover:bg-[#FFC8DD] focus:ring focus:ring-[#00B4D8] duration-300">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
