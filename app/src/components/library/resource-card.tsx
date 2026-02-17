import Link from "next/link";
import type { LibraryResource } from "@/lib/types";

interface ResourceCardProps {
  resource: LibraryResource;
}

const TYPE_CONFIG = {
  video: {
    icon: "\uD83D\uDCF9",
    borderClass: "border-l-4 border-l-sga-orange",
    labelClass: "text-sga-orange",
    label: "Video",
  },
  article: {
    icon: "\uD83D\uDCC4",
    borderClass: "border-l-4 border-l-sga-blue",
    labelClass: "text-sga-blue",
    label: "Article",
  },
  link: {
    icon: "\uD83D\uDD17",
    borderClass: "border-l-4 border-l-sga-border",
    labelClass: "text-sga-text-secondary",
    label: "Link",
  },
} as const;

export function ResourceCard({ resource }: ResourceCardProps) {
  const config = TYPE_CONFIG[resource.type] ?? TYPE_CONFIG.link;

  const isInternalArticle = resource.type === "article" && resource.content;

  const cardContent = (
    <div className={`card mx-4 mb-3 p-4 flex gap-3.5 cursor-pointer ${config.borderClass}`}>
      {/* Type icon */}
      <div className="w-11 h-11 rounded-lg bg-sga-warm-gray flex items-center justify-center text-xl shrink-0">
        {config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 block ${config.labelClass}`}
        >
          {config.label}
        </span>
        <h4 className="font-semibold text-[15px] mb-0.5">{resource.title}</h4>
        {resource.description && (
          <p className="text-[13px] text-sga-text-secondary leading-relaxed line-clamp-2">
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

  return cardContent;
}
