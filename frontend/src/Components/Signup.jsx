import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/signup", form);
      window.alert("Signup successful");
      navigate("/");
    } catch (error) {
      window.alert(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="mx-auto w-full max-w-md rounded-[2.2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:order-2">
          <div className="mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-sm font-semibold tracking-[0.22em] text-amber-900">
              DN
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Create your account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Start publishing in a cleaner, more professional writing environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
              <input
                name="username"
                placeholder="Your display name"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
              />
            </label>

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
                placeholder="Create a secure password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-slate-900 underline decoration-amber-400 underline-offset-4">
              Login
            </Link>
          </p>
        </section>

        <section className="hidden rounded-[2.5rem] border border-slate-200 bg-white/70 p-10 shadow-[0_30px_100px_rgba(15,23,42,0.08)] lg:block lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Publishing platform</p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.04] tracking-tight text-slate-950">
            Clean tools for writers who want their ideas to stand out.
          </h1>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Structured editor</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Write with headings, lists, quotes, links, images, and code without leaving the flow.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Live preview</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">See exactly how your story reads while you draft and revise it.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Elegant reading</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">A minimal interface that keeps focus on content, not decoration.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
