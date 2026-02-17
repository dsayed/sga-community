import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CommentThread } from "@/components/forums/comment-thread";
import { CommentForm } from "@/components/forums/comment-form";
import { ReactionButton } from "@/components/forums/reaction-button";
import type { ForumPost, ForumComment } from "@/lib/types";

/** Extract initials from a full name (first letter of first and last word). */
function getInitials(name: string | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Format a date string into a human-readable relative time. */
function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;

  if (Number.isNaN(diffMs)) return "";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(dateString).toLocaleDateString();
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase = await createClient();

  // Fetch the post with author and category
  const { data: post, error: postError } = await supabase
    .from("forum_posts")
    .select("*, author:profiles!forum_posts_author_id_fkey(*), category:forum_categories(*)")
    .eq("id", postId)
    .single();

  if (postError || !post) {
    notFound();
  }

  const typedPost = post as ForumPost;

  // Fetch comments, reaction count, and current user in parallel
  const [commentsResult, reactionCountResult, userResult] = await Promise.all([
    supabase
      .from("forum_comments")
      .select("*, author:profiles!forum_comments_author_id_fkey(*)")
      .eq("post_id", postId)
      .order("created_at"),
    supabase
      .from("forum_reactions")
      .select("*", { count: "exact" })
      .eq("post_id", postId),
    supabase.auth.getUser(),
  ]);

  const comments = (commentsResult.data || []) as ForumComment[];
  const reactionCount = reactionCountResult.count ?? 0;
  const user = userResult.data.user;

  // Check if current user has reacted
  let userReacted = false;
  if (user) {
    const { data: reaction } = await supabase
      .from("forum_reactions")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .single();
    userReacted = !!reaction;
  }

  const author = typedPost.author;
  const category = typedPost.category;
  const isStaff = author?.role === "staff" || author?.role === "admin";
  const avatarBg = isStaff ? "bg-sga-blue-light" : "bg-sga-orange-light";
  const avatarText = isStaff ? "text-sga-blue" : "text-sga-orange";

  return (
    <div className="pb-4">
      {/* Back button */}
      <div className="px-4 py-3">
        <Link
          href="/forums"
          className="text-sm text-sga-text-secondary hover:text-sga-text flex items-center gap-1"
        >
          &larr; Back to Forums
        </Link>
      </div>

      {/* Full post */}
      <article className="bg-white mx-4 mb-3 rounded-md p-4 shadow-sm">
        {/* Author row */}
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${avatarBg} ${avatarText}`}
          >
            {getInitials(author?.full_name)}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-[14px]">
                {author?.full_name || "Unknown"}
              </span>
              {author?.role && (
                <span className="text-[10px] font-semibold bg-sga-blue-light text-sga-blue px-1.5 py-px rounded ml-1.5 capitalize">
                  {author.role}
                </span>
              )}
            </div>
            <span className="text-[11px] text-sga-text-secondary">
              {getRelativeTime(typedPost.created_at)}
            </span>
          </div>
        </div>

        {/* Category tag */}
        {category && (
          <div className="text-[10px] font-semibold uppercase tracking-wide text-sga-orange mb-1.5">
            {category.name}
          </div>
        )}

        {/* Title */}
        {typedPost.title && (
          <h1 className="font-serif text-xl font-bold mb-2 leading-tight">
            {typedPost.title}
          </h1>
        )}

        {/* Body */}
        <p className="text-sm text-sga-text leading-relaxed whitespace-pre-wrap">
          {typedPost.body}
        </p>

        {/* Images */}
        {typedPost.images && typedPost.images.length > 0 && (
          <div className="mt-3 grid gap-2">
            {typedPost.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Post image ${i + 1}`}
                className="w-full rounded-md object-cover max-h-80"
              />
            ))}
          </div>
        )}

        {/* Reaction button */}
        <div className="mt-3 pt-3 border-t border-sga-border">
          <ReactionButton
            postId={postId}
            initialCount={reactionCount}
            initialReacted={userReacted}
          />
        </div>
      </article>

      {/* Comments section */}
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-sga-text mb-2">
          Comments ({comments.length})
        </h2>
      </div>

      <CommentThread comments={comments} />

      {/* Comment form */}
      <div className="mt-2">
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}
