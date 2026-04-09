import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { AlignCenter, AlignLeft, AlignRight, Bold, Code2, Heading1, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Underline as UnderlineIcon, Unlink } from "lucide-react";

const toolbarButtons = [
  {
    label: "Bold",
    icon: Bold,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    label: "Italic",
    icon: Italic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    label: "Underline",
    icon: UnderlineIcon,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  {
    label: "H1",
    icon: Heading1,
    action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    label: "H2",
    icon: Heading2,
    action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "H3",
    icon: Heading3,
    action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    label: "Bullet list",
    icon: List,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    label: "Numbered list",
    icon: ListOrdered,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    label: "Quote",
    icon: Quote,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    label: "Code block",
    icon: Code2,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  {
    label: "Align left",
    icon: AlignLeft,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
  },
  {
    label: "Align center",
    icon: AlignCenter,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
  },
  {
    label: "Align right",
    icon: AlignRight,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
  },
];

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Image upload failed"));
    reader.readAsDataURL(file);
  });

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-[15px] leading-7 text-slate-800 focus:outline-none",
      },
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
          file.type.startsWith("image/")
        );

        if (files.length === 0) {
          return false;
        }

        event.preventDefault();

        Promise.all(files.map(readFileAsDataUrl))
          .then((images) => {
            images.forEach((src) => {
              view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src })));
            });
          })
          .catch(() => {
            window.alert("Unable to add the dropped image.");
          });

        return true;
      },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
          file.type.startsWith("image/")
        );

        if (files.length === 0) {
          return false;
        }

        event.preventDefault();

        Promise.all(files.map(readFileAsDataUrl))
          .then((images) => {
            images.forEach((src) => {
              view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src })));
            });
          })
          .catch(() => {
            window.alert("Unable to paste the image.");
          });

        return true;
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || value === editor.getHTML()) {
      return;
    }

    editor.commands.setContent(value, false);
  }, [editor, value]);

  const setLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Enter the link URL", previousUrl);

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const insertImageByUrl = () => {
    if (!editor) {
      return;
    }

    const url = window.prompt("Paste an image URL");

    if (!url?.trim()) {
      return;
    }

    editor.chain().focus().setImage({ src: url.trim(), alt: "Embedded blog visual" }).run();
  };

  if (!editor) {
    return (
      <div className="min-h-[320px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white/90 px-4 py-3">
        {toolbarButtons.map(({ label, icon: Icon, action, isActive }) => (
          <button
            key={label}
            type="button"
            onClick={() => action(editor)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
              isActive(editor)
                ? "border-amber-300 bg-amber-100 text-amber-950"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={setLink}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
            editor.isActive("link")
              ? "border-amber-300 bg-amber-100 text-amber-950"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
          }`}
        >
          <Link2 size={16} />
          <span>Link</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <Unlink size={16} />
          <span>Unlink</span>
        </button>

        <button
          type="button"
          onClick={insertImageByUrl}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <ImagePlus size={16} />
          <span>Image URL</span>
        </button>
      </div>

      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>

      <div className="border-t border-slate-200 bg-amber-50 px-4 py-3 text-sm text-slate-600">
        Drag and drop images directly into the editor, paste screenshots, or use the image URL button.
      </div>
    </div>
  );
};

export default RichTextEditor;
