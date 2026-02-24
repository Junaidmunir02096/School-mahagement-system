import React from "react";
import AuthLayout from "../component/Auth/AuthLayout";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to manage your school dashboard"
    >
      <form className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 border-[#b1afc4] border rounded-[5rem] outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 border-[#b1afc4] border rounded-[5rem] outline-none"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <a href="#" className="text-[#4D44B5] hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-[#4D44B5] text-white py-2 rounded-[5rem] transition duration-300"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full cursor-pointer flex items-center justify-center gap-3 border-none py-2 rounded-[5rem] bg-[#99ccff] transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Sign Up Redirect */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#4D44B5] font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;