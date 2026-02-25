
import AuthLayout from "../../component/Auth/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, loginWithGoogle, clearError } from "../../store/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../../store/slices/authSlice";

const Signup = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const loading   = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name,            setName]            = useState("");
  const [localError,      setLocalError]      = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    const result = await dispatch(signupUser({ email, password, name }));
    if (signupUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  const handleGoogle = async () => {
    const result = await dispatch(loginWithGoogle());
    if (loginWithGoogle.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start managing your school efficiently"
    >
      <form className="space-y-4" onSubmit={handleRegister}>

        {/* Error messages */}
        {(localError || authError) && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-2 rounded-lg">
            {localError || authError}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border-[#b1afc4] border rounded-[5rem] outline-none"
          />
        </div>

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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border-[#b1afc4] border rounded-[5rem] outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border-[#b1afc4] border rounded-[5rem] outline-none"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4D44B5] text-white py-2 rounded-[5rem] hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border-none py-2 rounded-[5rem] bg-[#99ccff] transition disabled:opacity-60"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#4D44B5] font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;