import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => alert("Failed to load blog"));
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-gray-500 hover:underline">
        ← Back
      </Link>

      <h1 className="mt-4 text-3xl font-semibold text-gray-900">
        {blog.title}
      </h1>

      <p className="mt-2 text-xs text-gray-400">
        {new Date(blog.createdAt).toLocaleDateString()} · {blog.author}
      </p>

      <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetails;
