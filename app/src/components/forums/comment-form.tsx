"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/forums/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, body: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post comment");
      }

      setBody("");
      router.refresh();
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mx-4 mb-4 rounded-md p-3 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-sga-border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sga-orange/30 focus:border-sga-orange"
        />
        <button
          type="submit"
          disabled={!body.trim() || loading}
          className="bg-sga-orange text-white px-4 py-2 rounded-md text-sm font-semibold ml-0 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Post"}
        </button>
      </div>
    </form>
  );
}
