import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";

// https://devnotex.onrender.com
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: Hooks must be declared at top level
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [action, setAction] = useState(null); // 'edit' or 'delete'

  const navigate = useNavigate();

  const ADMIN_PASSWORD = "123456"; // Move to env later

  const Location = useLocation()
  const user = Location.state
  // console.log(user);
  

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://devnotex.onrender.com/api/blogs");
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
      await axios.delete(`https://devnotex.onrender.com/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

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

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-1">
                Welcome! <span className="text-red-700 font-bold">{user?.name}</span>
              </h1>
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mt-2">
                Latest Articles
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                Thoughts, ideas, and technical learnings
              </p>
            </div>

            <button
              onClick={() => navigate("/add")}
              className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm hover:bg-black transition"
            >
              + New Blog
            </button>
          </div>

          {/* Empty State */}
          {blogs.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No articles published yet.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white rounded-xl border border-gray-200 
                             p-6 transition-all duration-200 
                             hover:shadow-md hover:-translate-y-1"
                >
                  <h2 className="text-lg font-medium text-gray-900 leading-snug line-clamp-2">
                    {blog.title}
                  </h2>

                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()} · <span className="text-black font-semibold">{blog.author}</span>
                  </div>

                  {/* ✅ Render formatted HTML safely */}
                  <div
                    className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      Read more →
                    </Link>

                    <div className="flex gap-3">
                      <button
                        onClick={() => verifyAdmin(blog._id, "edit")}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => verifyAdmin(blog._id, "delete")}
                        className="text-xs text-red-500 hover:underline"
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
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Admin Password Required
            </h3>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              onKeyDown={(e) =>
                e.key === "Enter" && handleAdminAction()
              }
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="flex-1 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleAdminAction}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
