import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndBlogs = async () => {
      try {
        const userResponse = await axios.get("/api/me", {
          withCredentials: true,
        });

        const currentUser = userResponse.data;
        setUser(currentUser);

        const blogsResponse = await axios.get("/api/blogs");
        const myBlogs = blogsResponse.data.filter(
          (blog) => blog.author?.toLowerCase() === currentUser.username.toLowerCase()
        );

        setBlogCount(myBlogs.length);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent">
        <Header />
        <div className="flex min-h-screen items-center justify-center px-4">
          <p className="text-sm tracking-[0.2em] text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-transparent">
        <Header />
        <div className="flex min-h-screen items-center justify-center px-4 pt-24">
          <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Please login to view your profile
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              You need to be authenticated before accessing your account details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">Profile</p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-3xl font-semibold text-slate-900">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{user.username}</h1>
                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">Writer account</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">Account overview</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Username</p>
                <p className="mt-3 text-base font-medium text-slate-900">{user.username}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                <p className="mt-3 text-base font-medium text-slate-900 break-all">{user.email}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stories published</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{blogCount}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace note</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Your profile keeps a quick snapshot of your publishing activity while the rest of the interface stays focused on reading and writing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
