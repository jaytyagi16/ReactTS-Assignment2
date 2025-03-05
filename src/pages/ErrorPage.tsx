import React from "react";
import { useNavigate } from "react-router";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500 max-w-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 cursor-pointer"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
