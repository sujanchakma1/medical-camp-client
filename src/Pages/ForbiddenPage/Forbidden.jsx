import React from "react";
import { FaBan } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-red-50 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FaBan className="text-red-500 text-7xl mb-4 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
        Access Denied
      </h1>
      <p className="text-gray-700 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Go to Homepage
      </Link>
    </motion.div>
  );
};

export default Forbidden;
