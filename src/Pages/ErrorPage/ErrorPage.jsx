import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ErrorPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>
          Error || MedCamp
        </title>
      </Helmet>
      <FaExclamationTriangle className="text-yellow-500 text-7xl mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary rounded-full"
      >
       <MdOutlineKeyboardBackspace /> Back to Home
      </Link>
    </motion.div>
  );
};

export default ErrorPage;
