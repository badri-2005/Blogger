import DOMPurify from "dompurify";

export const sanitizeBlogHtml = (html = "") =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class", "style"],
  });

export const isRichTextEmpty = (html = "") => {
  if (!html) {
    return true;
  }

  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "").trim().length === 0;
  }

  const doc = new window.DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
  const hasImage = doc.body.querySelector("img");

  return !text && !hasImage;
};
