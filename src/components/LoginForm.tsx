import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { loginForm } from "../types/Forms";
import { UserStore } from "./SignupForm";

const schemaValidation = Yup.object({
  email: Yup.string()
    .email("Not in email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    resolver: yupResolver(schemaValidation),
  });

  const navigate = useNavigate();

  const onSubmit = (data: loginForm) => {
    const userEmail = data.email;
    const userPassword = data.password;

    const storedUsers = localStorage.getItem("allUsers");
    if (!storedUsers) {
      alert("No users found. Please sign up first.");
      return;
    }

    const users: UserStore = JSON.parse(storedUsers);

    const foundUser = users.user.find(
      (user) => user.email === userEmail && user.password === userPassword
    );

    if (foundUser) {
      alert("Login successful");
      navigate("/home");
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Sign in to Dribble</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-8 lg:w-[446px]"
      >
        {/* email */}
        <div className="flex flex-col gap-1">
          <label className="font-bold">Email</label>
          <input
            {...register("email")}
            className="border-2 border-gray-300 rounded px-2 h-9"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        {/* password */}
        <div className="flex flex-col gap-1">
          <label className="font-bold">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border-2 border-gray-300 rounded px-2 h-9"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white py-4 px-4 hover:bg-slate-700 font-bold rounded-full cursor-pointer"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
