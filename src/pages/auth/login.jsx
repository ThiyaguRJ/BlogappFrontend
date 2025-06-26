import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API } from "../../service/baseservice";
import { UserContext } from "../../Components/userContext";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUserRole } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_API.LOGIN_USER}`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUserRole(res.data.user.role);
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userName", res.data.user.username);
        setError("Login Successfull!");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
      throw new Error("Error in login: " + error.message);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Email is required!");
      return;
    } else if (password === "") {
      setError("Password is required!");
      return;
    } else {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please Enter Email"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please Enter Password"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlesubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Login
            </button>

            <Link
              to="/register"
              className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Register
            </Link>
          </div>
          {error && (
            <p
              className={`${
                error === "Login Successfull!"
                  ? "text-green-900"
                  : "text-red-500"
              } text-sm m-1 flex justify-center`}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
