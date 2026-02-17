import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { LibraryResource } from "@/lib/types";

const TYPE_CONFIG = {
  video: { label: "Video", labelClass: "text-sga-orange" },
  article: { label: "Article", labelClass: "text-sga-blue" },
  link: { label: "Link", labelClass: "text-sga-text-secondary" },
} as const;

export default async function LibraryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: resource, error } = await supabase
    .from("library_resources")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !resource) {
    notFound();
  }

  const typedResource = resource as LibraryResource;
  const config = TYPE_CONFIG[typedResource.type] ?? TYPE_CONFIG.link;

  return (
    <div className="pb-4">
      {/* Back link */}
      <div className="px-4 py-3">
        <Link
          href="/library"
          className="text-sm text-sga-text-secondary hover:text-sga-text flex items-center gap-1"
        >
          &larr; Back to Library
        </Link>
      </div>

      {/* Resource detail */}
      <article className="bg-white mx-4 rounded-md p-4 shadow-sm">
        {/* Type + Category */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wide ${config.labelClass}`}
          >
            {config.label}
          </span>
          <span className="text-[10px] text-sga-text-secondary">
            {typedResource.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-xl font-bold mb-3 leading-tight">
          {typedResource.title}
        </h1>

        {/* Description */}
        {typedResource.description && (
          <p className="text-sm text-sga-text-secondary mb-4 leading-relaxed">
            {typedResource.description}
          </p>
        )}

        {/* External link */}
        {typedResource.url && (
          <a
            href={typedResource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-sga-blue font-medium underline mb-4"
          >
            Open external resource &rarr;
          </a>
        )}

        {/* Article content */}
        {typedResource.content && (
          <div className="border-t border-sga-border pt-4 mt-2">
            <div className="text-sm text-sga-text leading-relaxed whitespace-pre-wrap">
              {typedResource.content}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
