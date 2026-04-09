import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BlogContent from "../Components/BlogContent";



// https://devnotex.onrender.com
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ FIX: Hooks must be declared at top level
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [action, setAction] = useState(null); // 'edit' or 'delete'

  const navigate = useNavigate();

  const ADMIN_PASSWORD = "123456"; // Move to env later
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  // To fetch the user details
  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
      setUser(null);
      });
  }, []);

  const verifyAdmin = (blogId, actionType) => {
    setSelectedBlogId(blogId);
    setAction(actionType);
    setShowPasswordDialog(true);
    setAdminPassword("");
  };

  const handleAdminAction = () => {
    if (adminPassword !== ADMIN_PASSWORD) {
      alert("Incorrect password");
      return;
    }

    if (action === "edit") {
      navigate(`/edit/${selectedBlogId}`);
    } else if (action === "delete") {
      handleDelete(selectedBlogId);
    }

    setShowPasswordDialog(false);
  };

  // ✅ Safe loading return AFTER hooks
  if (loading) {
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

  

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-transparent pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-16">

          <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
                Editorial feed
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Latest articles{user?.username ? `, ${user.username}` : ""}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Thoughts, product ideas, and technical writing presented in a calm, minimal reading experience.
              </p>
            </div>

            <button
              onClick={() => navigate("/add")}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Create story
            </button>
          </div>

          {blogs.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
              <p className="text-lg font-medium text-slate-900">No articles published yet.</p>
              <p className="mt-2 text-sm text-slate-500">Start the first story and shape the tone of the platform.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Article
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-950 line-clamp-2">
                    {blog.title}
                  </h2>

                  <div className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString()} · <span className="text-slate-700">{blog.author}</span>
                  </div>

                  <div className="mt-5 line-clamp-4 text-sm text-slate-600">
                    <BlogContent content={blog.content} />
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-sm font-medium text-slate-900 underline decoration-amber-400 underline-offset-4"
                    >
                      Read article
                    </Link>

                    <div className="flex gap-3">
                      <button
                        onClick={() => verifyAdmin(blog._id, "edit")}
                        className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => verifyAdmin(blog._id, "delete")}
                        className="text-xs font-medium text-rose-500 transition hover:text-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
            <h3 className="text-lg font-semibold text-slate-950">
              Admin Password Required
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Confirm the password to continue with this admin action.
            </p>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              onKeyDown={(e) =>
                e.key === "Enter" && handleAdminAction()
              }
            />

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleAdminAction}
                className="flex-1 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
