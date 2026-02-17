import type { ForumComment } from "@/lib/types";

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

interface CommentThreadProps {
  comments: ForumComment[];
}

export function CommentThread({ comments }: CommentThreadProps) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-sga-text-secondary text-center py-6 mx-4">
        No comments yet. Be the first to reply!
      </p>
    );
  }

  return (
    <div>
      {comments.map((comment) => {
        const author = comment.author;
        const isStaff = author?.role === "staff" || author?.role === "admin";
        const avatarBg = isStaff ? "bg-sga-blue-light" : "bg-sga-orange-light";
        const avatarText = isStaff ? "text-sga-blue" : "text-sga-orange";

        return (
          <div
            key={comment.id}
            className="bg-white rounded-md p-3 mx-4 mb-2 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[11px] flex-shrink-0 ${avatarBg} ${avatarText}`}
              >
                {getInitials(author?.full_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[13px]">
                    {author?.full_name || "Unknown"}
                  </span>
                  <span className="text-[11px] text-sga-text-secondary">
                    {getRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className="text-sm text-sga-text-secondary leading-relaxed mt-1">
                  {comment.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
