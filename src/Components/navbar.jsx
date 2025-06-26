import React, { useContext, useState } from "react";
import { BASE_API } from "../service/baseservice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole } = useContext(UserContext);

  const navigate = useNavigate();

  const handlLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_API.LOGOUT_USER}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
      }

    } catch (err) {
      throw new Error("Error in logout: " + err.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">BlogApp</div>

        <div className="hidden md:flex space-x-6 items-center">
          <a href="/dashboard" className="hover:text-gray-300">
            Home
          </a>
          <a href="/passwordreset" className="hover:text-gray-300">
             Password Reset
          </a>

          <a
            href={userRole === "reader" ? undefined : "/createpost"}
            onClick={
              userRole === "reader" ? (e) => e.preventDefault() : undefined
            }
            className={`${
              userRole === "reader" ? "text-gray-300" : "hover:text-gray-300"
            }`}
            disabled>
            Add Blog
          </a>
          <a
            href={userRole === "reader" ? undefined : "/manageuser"}
            onClick={
              userRole === "reader" ? (e) => e.preventDefault() : undefined
            }
            className={`${
              userRole === "reader" ? "text-gray-300" : "hover:text-gray-300"
            }`}
            disabled>
            Manage User
          </a>
          <button
            onClick={handlLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md">
            Logout
          </button>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="relative">
        {" "}
        {isOpen && (
          <div className="absolute top-full left-0 md:hidden bg-gray-800 px-4 pb-3 space-y-2  shadow w-full">
            <a href="/dashboard" className="block hover:text-gray-300">
              Home
            </a>
            <a href="/passwordreset" className="block hover:text-gray-300">
              Password Reset
            </a>
            <a
              href={userRole === "reader" ? undefined : "/createpost"}
              onClick={
                userRole === "reader" ? (e) => e.preventDefault() : undefined
              }
              className={`${
                userRole === "reader"
                  ? "block text-gray-300 cursor-not-allowed"
                  : "block hover:text-gray-300"
              }`}>
              Add Blog
            </a>
            <a
              href={userRole === "reader" ? undefined : "/manageuser"}
              onClick={
                userRole === "reader" ? (e) => e.preventDefault() : undefined
              }
              className={`${
                userRole === "reader"
                  ? "block text-gray-300 cursor-not-allowed"
                  : "block hover:text-gray-300"
              }`}>
              Manage User
            </a>
            <button
              onClick={handlLogout}
              className="bg-red-600 hover:bg-red-700  text-left px-3 py-1 rounded-md">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
