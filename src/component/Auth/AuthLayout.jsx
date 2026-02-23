import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* Left Branding Section */}
      <div className="hidden lg:flex w-1/2 bg-[#4D44B5] text-white flex-col justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">School Management System</h1>
          <p className="text-lg text-indigo-100">
            Smart. Secure. Scalable.
          </p>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-gray-500 mb-6">{subtitle}</p>

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;