"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ForumCategory } from "@/lib/types";

interface PostComposerProps {
  categories: ForumCategory[];
  isOpen: boolean;
  onClose: () => void;
}

const MAX_IMAGES = 3;

async function resizeImage(file: File, maxWidth = 1200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to resize image"));
        },
        file.type === "image/png" ? "image/png" : "image/jpeg",
        0.85
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export function PostComposer({
  categories,
  isOpen,
  onClose,
}: PostComposerProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<number | null>(
    categories[0]?.id ?? null
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetForm = useCallback(() => {
    setTitle("");
    setBody("");
    setImages([]);
    setError(null);
    setCategoryId(categories[0]?.id ?? null);
  }, [categories]);

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const remaining = MAX_IMAGES - images.length;
    const selected = Array.from(files).slice(0, remaining);

    const newImages = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!body.trim()) {
      setError("Please write something before posting.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const img of images) {
        const resized = await resizeImage(img.file);
        const formData = new FormData();
        formData.append("file", resized, img.file.name);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json();
          throw new Error(uploadErr.error || "Failed to upload image");
        }

        const { url } = await uploadRes.json();
        imageUrls.push(url);
      }

      // Create post
      const postRes = await fetch("/api/forums/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || null,
          content: body.trim(),
          category_id: categoryId,
          images: imageUrls,
        }),
      });

      if (!postRes.ok) {
        const postErr = await postRes.json();
        throw new Error(postErr.error || "Failed to create post");
      }

      resetForm();
      onClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-4 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sga-text">Create Post</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sga-warm-gray text-sga-text-secondary"
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Category selector */}
          <div className="mb-3">
            <div
              className="flex gap-1 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                    categoryId === cat.id
                      ? "bg-sga-orange text-white"
                      : "bg-sga-warm-gray text-sga-text-secondary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full border border-sga-border rounded-md px-3 py-2 text-sm text-sga-text placeholder:text-sga-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-sga-orange/40 mb-3"
          />

          {/* Body textarea */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's happening with your foster?"
            className="w-full border border-sga-border rounded-md px-3 py-2 text-sm text-sga-text placeholder:text-sga-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-sga-orange/40 mb-3 resize-none"
            style={{ minHeight: 120 }}
          />

          {/* Image upload area */}
          <div className="mb-4">
            {images.length > 0 && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.preview}
                      alt={`Upload preview ${i + 1}`}
                      className="w-20 h-20 object-cover rounded-md border border-sga-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sga-urgent text-white rounded-full text-xs flex items-center justify-center leading-none"
                      aria-label={`Remove image ${i + 1}`}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length < MAX_IMAGES && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-sga-text-secondary hover:text-sga-text flex items-center gap-1.5"
                >
                  <span>&#x1F4F7;</span>
                  Add Photos (max {MAX_IMAGES})
                </button>
              </>
            )}
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-sga-urgent mb-3">{error}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sga-orange text-white w-full py-2.5 rounded-md font-semibold text-sm disabled:opacity-60"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
