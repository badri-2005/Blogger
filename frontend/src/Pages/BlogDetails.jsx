import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BlogContent from "../Components/BlogContent";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch(() => window.alert("Failed to load blog"));
  }, [id]);

  if (!blog) {
    return <p className="mt-10 text-center text-slate-600">Loading...</p>;
  }

  return (
    <div>
      <Header />

      <div className="mx-auto max-w-4xl px-6 py-28">
        <Link to="/home" className="text-sm text-amber-700 hover:underline">
          ← Back to articles
        </Link>

        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white/95 px-7 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-12 md:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Published story
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-4 text-sm font-medium text-slate-500">
            {new Date(blog.createdAt).toLocaleDateString()} · <span className="text-slate-800">{blog.author}</span>
          </p>

          <div className="mt-10">
            <BlogContent content={blog.content} className="text-lg" />
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;
