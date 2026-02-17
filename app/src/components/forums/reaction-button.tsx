"use client";

import { useState } from "react";

interface ReactionButtonProps {
  postId: string;
  initialCount: number;
  initialReacted: boolean;
}

export function ReactionButton({
  postId,
  initialCount,
  initialReacted,
}: ReactionButtonProps) {
  const [reacted, setReacted] = useState(initialReacted);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (loading) return;

    // Optimistic update
    const prevReacted = reacted;
    const prevCount = count;
    setReacted(!reacted);
    setCount(reacted ? count - 1 : count + 1);

    setLoading(true);
    try {
      const res = await fetch("/api/forums/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId }),
      });

      if (!res.ok) {
        // Revert optimistic update
        setReacted(prevReacted);
        setCount(prevCount);
      }
    } catch {
      // Revert optimistic update
      setReacted(prevReacted);
      setCount(prevCount);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
        reacted
          ? "bg-red-50 text-red-500"
          : "bg-sga-warm-gray text-sga-text-secondary"
      }`}
    >
      {reacted ? "\u2764\uFE0F" : "\uD83E\uDD0D"} {count}
    </button>
  );
}
