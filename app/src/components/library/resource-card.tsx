import Link from "next/link";
import type { LibraryResource } from "@/lib/types";

interface ResourceCardProps {
  resource: LibraryResource;
}

const TYPE_CONFIG = {
  video: {
    icon: "\uD83D\uDCF9",
    bgClass: "bg-sga-orange-light",
    labelClass: "text-sga-orange",
    label: "Video",
  },
  article: {
    icon: "\uD83D\uDCC4",
    bgClass: "bg-sga-blue-light",
    labelClass: "text-sga-blue",
    label: "Article",
  },
  link: {
    icon: "\uD83D\uDD17",
    bgClass: "bg-sga-warm-gray",
    labelClass: "text-sga-text-secondary",
    label: "Link",
  },
} as const;

export function ResourceCard({ resource }: ResourceCardProps) {
  const config = TYPE_CONFIG[resource.type] ?? TYPE_CONFIG.link;

  // Articles with content navigate internally; external resources open in new tab
  const isInternalArticle = resource.type === "article" && resource.content;

  const cardContent = (
    <div className="bg-white mx-4 mb-2.5 rounded-md p-3.5 shadow-sm flex gap-3 cursor-pointer">
      {/* Type icon */}
      <div
        className={`w-11 h-11 rounded-sm flex items-center justify-center text-xl shrink-0 ${config.bgClass}`}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 block ${config.labelClass}`}
        >
          {config.label}
        </span>
        <h4 className="font-semibold text-sm mb-0.5">{resource.title}</h4>
        {resource.description && (
          <p className="text-xs text-sga-text-secondary leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        )}
      </div>
    </div>
  );

  if (isInternalArticle) {
    return <Link href={`/library/${resource.id}`}>{cardContent}</Link>;
  }

  if (resource.url) {
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }

  // Fallback: non-clickable card (no URL, no content)
  return cardContent;
}
