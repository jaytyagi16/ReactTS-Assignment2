import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginForm, signupFormInputs } from "../types/Forms";

const schemaValidation = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Not in email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,15}$/,
      "Password must be 9-15 characters, include uppercase, lowercase, number and special character"
    )
    .required("Password is required"),
});

export interface UserStore {
  user: loginForm[];
}

interface SignupFormProps {
  setLogin: (val: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { setLogin } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormInputs>({
    resolver: yupResolver(schemaValidation),
  });

  const onSubmit = (data: signupFormInputs) => {
    let users: UserStore = { user: [] };
    const storedUsers = localStorage.getItem("allUsers");

    if (storedUsers) {
      users = JSON.parse(storedUsers) as UserStore;
    }

    const credentials: loginForm = {
      email: data.email,
      password: data.password,
    };

    users.user.push(credentials);
    console.log("Users: ", users);

    localStorage.setItem("allUsers", JSON.stringify(users));
    alert("User created successfully");
    setLogin(true);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Sign up to Dribble</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-8 lg:w-[446px]"
      >
        {/* first name and last name */}
        <div className="flex items-center gap-10">
          {/* first name */}
          <div className="flex flex-col gap-1">
            <label className="font-bold">First Name</label>
            <input
              {...register("firstName")}
              className="border-2 border-gray-300 rounded px-2 h-9"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          {/* last name */}
          <div className="flex flex-col gap-1">
            <label className="font-bold">Last Name</label>
            <input
              {...register("lastName")}
              className="border-2 border-gray-300 rounded px-2 h-9"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
