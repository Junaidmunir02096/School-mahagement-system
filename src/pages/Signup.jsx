
import AuthLayout from "../component/Auth/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../component/Auth/firebase";
import { useState } from "react";
const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      // alert("Passwords do not match!");
      setError("Passwords do not match!");
      return;
    }

    try{
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User registered:", user);
      console.log('user register successfully');
    }catch(error){
      console.error("Error registering user:", error);
    }
  }

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start managing your school efficiently"
    >
      <form className="space-y-4" onSubmit={handleRegister}>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4D44B5] outline-none"
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
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4D44B5] outline-none"
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
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4D44B5] outline-none"
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
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4D44B5] outline-none"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-[#4D44B5] text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Create Account
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
          className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition"
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