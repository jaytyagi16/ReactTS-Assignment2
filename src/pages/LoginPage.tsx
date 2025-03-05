import React, { useState } from "react";
import loginImage from "../assets/login.jpg";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="max-w-[90%] flex md:flex-row flex-col md:gap-14 mx-auto mb-10">
      <div className="md:w-[40%] h-full">
        <img src={loginImage} alt="Login Image" className="h-[650px]" />
      </div>

      <div className="mt-20">
        {login ? <LoginForm /> : <SignupForm setLogin={setLogin} />}

        <div className="mt-5 text-center text-slate-600">
          {login ? (
            <p>
              Don't have an accout?{" "}
              <span
                className="text-slate-900 underline cursor-pointer"
                onClick={() => setLogin(false)}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-slate-900 underline cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setLogin(true);
                }}
              >
                Log in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
