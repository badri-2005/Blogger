import { sanitizeBlogHtml } from "../utils/content";

const BlogContent = ({ content, className = "" }) => {
  const safeContent = sanitizeBlogHtml(content);

  return (
    <div
      className={`blog-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
};

export default BlogContent;
