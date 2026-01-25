import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blogs");
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
      await axios.delete(`http://localhost:3000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
  <div>
    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
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
                {/* Title */}
                <h2 className="text-lg font-medium text-gray-900 leading-snug line-clamp-2">
                  {blog.title}
                </h2>

                {/* Meta */}
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()} · {blog.author}
                </div>

                {/* Content Preview */}
                <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {blog.content}
                </p>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">

                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Read more →
                  </Link>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/edit/${blog._id}`)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
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
  );
};

export default Home;
