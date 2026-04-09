import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", form, { withCredentials: true });
      window.alert(response.data.msg);
      navigate("/home");
    } catch (error) {
      window.alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden rounded-[2.5rem] border border-slate-200 bg-white/70 p-10 shadow-[0_30px_100px_rgba(15,23,42,0.08)] lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">DevNotex</p>
          <h1 className="mt-5 max-w-xl text-6xl font-semibold leading-[1.02] tracking-tight text-slate-950">
            Publish with clarity, not clutter.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            A clean workspace for thoughtful articles, polished reading experiences, and modern rich-text editing that stays out of your way.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Minimal by default</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Balanced typography, restrained color, and calm whitespace.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Built for writing</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Headings, lists, links, images, and code blocks in one place.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Professional reading</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Articles render beautifully from preview to publish.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-[2.2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-sm font-semibold tracking-[0.22em] text-amber-900">
              DN
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue writing, editing, and publishing your stories.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            New to DevNotex?{" "}
            <Link to="/signup" className="font-medium text-slate-900 underline decoration-amber-400 underline-offset-4">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
