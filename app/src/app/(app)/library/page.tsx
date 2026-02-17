import { createClient } from "@/lib/supabase/server";
import { SearchBar } from "@/components/library/search-bar";
import { CategoryChips } from "@/components/library/category-chips";
import { ResourceCard } from "@/components/library/resource-card";
import type { LibraryResource } from "@/lib/types";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const supabase = await createClient();

  // Fetch all resources to extract unique categories
  const { data: allResources } = await supabase
    .from("library_resources")
    .select("category");

  const categories = Array.from(
    new Set((allResources ?? []).map((r) => r.category))
  ).sort();

  // Build the filtered query
  let query = supabase
    .from("library_resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,description.ilike.%${q}%`
    );
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data: resources } = await query;
  const results: LibraryResource[] = resources ?? [];

  // Group results by category
  const grouped: Record<string, LibraryResource[]> = {};
  for (const resource of results) {
    if (!grouped[resource.category]) {
      grouped[resource.category] = [];
    }
    grouped[resource.category].push(resource);
  }

  // Sort group keys alphabetically
  const sortedCategories = Object.keys(grouped).sort();

  return (
    <>
      <SearchBar defaultValue={q ?? ""} />
      <CategoryChips
        categories={categories}
        activeCategory={category ?? null}
      />

      {results.length === 0 ? (
        <div className="text-center py-12 text-sga-text-secondary text-sm">
          {q
            ? `No resources found for "${q}". Try a different search term.`
            : "No resources available yet."}
        </div>
      ) : (
        sortedCategories.map((cat) => (
          <section key={cat} className="mb-5">
            <div className="flex items-center gap-2.5 px-4 pt-4 pb-2">
              <div className="w-1 h-5 rounded-full bg-sga-orange" />
              <h2 className="font-serif text-base font-bold text-sga-blue-dark flex-1">
                {cat}
              </h2>
              <span className="text-xs text-sga-text-secondary">
                {grouped[cat].length} topic{grouped[cat].length !== 1 ? "s" : ""}
              </span>
            </div>
            {grouped[cat].map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </section>
        ))
      )}
    </>
  );
}
