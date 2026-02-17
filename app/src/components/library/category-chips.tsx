"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryChipsProps {
  categories: string[];
  activeCategory: string | null;
}

export function CategoryChips({
  categories,
  activeCategory,
}: CategoryChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChipClick(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === null) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const qs = params.toString();
    router.push(qs ? `/library?${qs}` : "/library");
  }

  return (
    <div
      className="flex gap-2 px-4 py-3 overflow-x-auto"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* All chip */}
      <button
        onClick={() => handleChipClick(null)}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border cursor-pointer ${
          activeCategory === null
            ? "bg-sga-blue text-white border-sga-blue"
            : "bg-white text-sga-text-secondary border-sga-border"
        }`}
      >
        All
      </button>

      {/* Category chips */}
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => handleChipClick(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border cursor-pointer ${
              isActive
                ? "bg-sga-blue text-white border-sga-blue"
                : "bg-white text-sga-text-secondary border-sga-border"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
