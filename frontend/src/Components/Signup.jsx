import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://devnotex.onrender.com/api/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg w-96">
        <h2 className="text-2xl mb-4">Signup</h2>

        <input
          name="username"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-600 text-white p-2 w-full">
          Signup
        </button>
        <p className='mt-2'> Already Have Account? <a href="/login" className="text-blue-500">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
