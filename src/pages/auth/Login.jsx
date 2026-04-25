import AuthLayout from "../../component/Auth/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle, clearError } from "../../store/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const loading   = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      localStorage.setItem("routeAccessMode", "full");
      navigate("/dashboard");
    }
  };

  const handleGoogle = async () => {
    const result = await dispatch(loginWithGoogle());
    if (loginWithGoogle.fulfilled.match(result)) {
      localStorage.setItem("routeAccessMode", "full");
      navigate("/dashboard");
    }
  };
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to manage your school dashboard"
    >
      <form className="space-y-4" onSubmit={handleLogin}>

        {/* Error message */}
        {authError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-2 rounded-lg">
            {authError}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }}
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
            value={password}
            onChange={(e) => { setPassword(e.target.value); dispatch(clearError()); }}
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
          disabled={loading}
          className="w-full cursor-pointer bg-[#4D44B5] text-white py-2 rounded-[5rem] transition duration-300 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full cursor-pointer flex items-center justify-center gap-3 border-none py-2 rounded-[5rem] bg-[#99ccff] transition disabled:opacity-60"
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