import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import RichTextEditor from "../Components/RichTextEditor";
import BlogContent from "../Components/BlogContent";
import { isRichTextEmpty, sanitizeBlogHtml } from "../utils/content";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/blogs/${id}`)
      .then((response) => {
        setForm({
          title: response.data.title ?? "",
          author: response.data.author ?? "",
          content: response.data.content ?? "",
        });
      })
      .catch(() => window.alert("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.author.trim() || isRichTextEmpty(form.content)) {
      window.alert("Title, author, and content are all required.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(`/api/blogs/${id}`, {
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        content: sanitizeBlogHtml(form.content),
      });
      navigate(`/blog/${id}`);
    } catch {
      window.alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="mt-10 text-center text-slate-600">Loading editor...</p>;
  }

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-transparent pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Revision Mode
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Refine your article before publishing the update
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Keep iterating with the same editor controls and live article preview you use when drafting a new post.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="Update the story title"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Author</span>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleInputChange}
                    placeholder="Author name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white"
                  />
                </label>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-sm font-medium text-slate-700">Story content</label>
                  <span className="text-xs text-slate-500">Your changes update the preview instantly</span>
                </div>

                <RichTextEditor
                  value={form.content}
                  onChange={(content) => setForm((currentForm) => ({ ...currentForm, content }))}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Update story"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/blog/${id}`)}
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </section>

            <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Live preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {form.title.trim() || "Your revised headline will appear here"}
              </h2>

              <p className="mt-4 text-sm text-slate-300">
                {form.author.trim() ? `By ${form.author.trim()}` : "Add an author name to complete the article header"}
              </p>

              <div className="mt-8 rounded-[1.5rem] bg-white px-6 py-7 text-slate-800">
                {isRichTextEmpty(form.content) ? (
                  <p className="text-sm leading-7 text-slate-400">
                    Start editing to preview headings, links, lists, images, and code blocks.
                  </p>
                ) : (
                  <BlogContent content={form.content} />
                )}
              </div>
            </aside>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
