import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png"

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <img src={logo} alt="DevNotex Logo" className="mx-auto w-16 h-16 rounded-md" />
          <h1 className="text-3xl font-semibold tracking-tight text-black mt-2 rounded-md">
            DevNotex
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create an account to start writing & learning
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider 
                             text-gray-500 mb-1">
              Username
            </label>
            <input
              name="username"
              placeholder="Enter Your Name"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 
                         rounded-md text-sm focus:outline-none 
                         focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider 
                             text-gray-500 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 
                         rounded-md text-sm focus:outline-none 
                         focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider 
                             text-gray-500 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 
                         rounded-md text-sm focus:outline-none 
                         focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 
                       rounded-md text-sm font-medium 
                       hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/"
            className="text-black font-medium hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
