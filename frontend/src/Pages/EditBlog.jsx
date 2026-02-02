import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: ""
  });

  useEffect(() => {
    axios
      .get(`https://devnotex.onrender.com/api/blogs/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load blog"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://devnotex.onrender.com/api/blogs/${id}`, form);
      navigate("/");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows="6"
          placeholder="Content"
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-black"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
