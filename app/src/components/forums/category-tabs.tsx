"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ForumCategory } from "@/lib/types";

interface CategoryTabsProps {
  categories: ForumCategory[];
  counts: Record<number, number>; // category_id -> post count
  activeSlug: string | null; // currently selected category slug, null = "All"
}

export function CategoryTabs({
  categories,
  counts,
  activeSlug,
}: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);

  function handleTabClick(slug: string | null) {
    if (slug === null) {
      router.push("/forums");
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", slug);
      router.push(`/forums?${params.toString()}`);
    }
  }

  return (
    <div
      className="flex gap-1 px-4 py-3 overflow-x-auto"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* All tab */}
      <button
        onClick={() => handleTabClick(null)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
          activeSlug === null
            ? "bg-sga-orange text-white"
            : "bg-sga-warm-gray text-sga-text-secondary"
        }`}
      >
        All
        <span className="text-[10px] opacity-70 ml-0.5">({totalCount})</span>
      </button>

      {/* Category tabs */}
      {categories.map((cat) => {
        const isActive = activeSlug === cat.slug;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => handleTabClick(cat.slug)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              isActive
                ? "bg-sga-orange text-white"
                : "bg-sga-warm-gray text-sga-text-secondary"
            }`}
          >
            {cat.name}
            <span className="text-[10px] opacity-70 ml-0.5">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
