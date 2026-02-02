import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const AddBlog = () => {

  const [user, setUser] = useState(null);
  

useEffect(()=>{
  axios.get("http://localhost:3000/api/me" , {withCredentials:true})
  .then((res)=>{
    setUser(res.data)
    console.log(res.data);
  })
  .catch((err)=>{
    setUser(null)
    console.log(err);
  })
},[])


  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.content) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/add",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Create New Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl border space-y-5"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full border rounded-md px-4 py-2"
          />

          <input
            name="author"
            value={user?.username || form.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full border rounded-md px-4 py-2"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            placeholder="Write your blog content..."
            className="w-full border rounded-md px-4 py-2"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-black disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="border px-6 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddBlog;
