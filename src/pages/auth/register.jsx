import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API } from "../../service/baseservice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `${BASE_API.REGISTER_USER}`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setError("Registed Successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);

        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
      throw new Error("Error in registration: " + error.message);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setError("Name is required!");
      return;
    } else if (email === "") {
      setError("Email is required!");
      return;
    } else if (password === "") {
      setError("Password is required!");
    } else {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <form>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please Enter Name"
            />
          </div>

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
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md ">
              Register
            </button>

            <Link
              to="/"
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Login
            </Link>
          </div>
          {error && (
            <p
              className={`${
                error === "Registed Successfully!"
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

export default Register;
