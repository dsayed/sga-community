import Link from "next/link";
import type { ForumPost } from "@/lib/types";

interface PostCardProps {
  post: ForumPost;
}

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

export function PostCard({ post }: PostCardProps) {
  const author = post.author;
  const category = post.category;
  const isStaff = author?.role === "staff" || author?.role === "admin";

  const avatarBg = isStaff ? "bg-sga-blue-light" : "bg-sga-orange-light";
  const avatarText = isStaff ? "text-sga-blue" : "text-sga-orange";

  return (
    <Link href={`/forums/${post.id}`} className="block">
      <article className="bg-white mx-4 mb-2.5 rounded-md p-3.5 shadow-sm">
        {/* Header: avatar + name/role/time */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[13px] flex-shrink-0 ${avatarBg} ${avatarText}`}
          >
            {getInitials(author?.full_name)}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-[13px]">
                {author?.full_name || "Unknown"}
              </span>
              {author?.role && (
                <span className="text-[10px] font-semibold bg-sga-blue-light text-sga-blue px-1.5 py-px rounded ml-1 capitalize">
                  {author.role}
                </span>
              )}
            </div>
            <span className="text-[11px] text-sga-text-secondary">
              {getRelativeTime(post.created_at)}
            </span>
          </div>
        </div>

        {/* Category tag */}
        {category && (
          <div className="text-[10px] font-semibold uppercase tracking-wide text-sga-orange mb-1">
            {category.name}
          </div>
        )}

        {/* Title */}
        {post.title && (
          <h4 className="font-semibold text-sm mb-1 leading-tight">
            {post.title}
          </h4>
        )}

        {/* Preview */}
        <p className="text-[13px] text-sga-text-secondary leading-relaxed line-clamp-2">
          {post.body}
        </p>

        {/* Actions */}
        <div className="flex gap-4 mt-2.5 pt-2.5 border-t border-sga-border">
          <span className="flex items-center gap-1 text-xs text-sga-text-secondary">
            ❤️ {post.reaction_count ?? 0}
          </span>
          <span className="flex items-center gap-1 text-xs text-sga-text-secondary">
            💬 {post.comment_count ?? 0}
          </span>
        </div>
      </article>
    </Link>
  );
}
