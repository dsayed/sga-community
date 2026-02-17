import { createClient } from "@/lib/supabase/server";
import { CategoryTabs } from "@/components/forums/category-tabs";
import { PostComposerPrompt } from "@/components/forums/post-composer-prompt";
import { PostCard } from "@/components/forums/post-card";

export default async function ForumsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from("forum_categories")
    .select("*")
    .order("sort_order");

  // Fetch posts (optionally filtered by category)
  let query = supabase
    .from("forum_posts")
    .select("*, author:profiles(*), category:forum_categories(*)")
    .order("created_at", { ascending: false })
    .limit(20);

  if (category) {
    const cat = categories?.find((c) => c.slug === category);
    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  const { data: posts } = await query;

  // Fetch all posts to calculate counts per category
  const { data: allPosts } = await supabase
    .from("forum_posts")
    .select("category_id");

  const counts: Record<number, number> = {};
  allPosts?.forEach((p) => {
    counts[p.category_id] = (counts[p.category_id] || 0) + 1;
  });

  return (
    <>
      <CategoryTabs
        categories={categories || []}
        counts={counts}
        activeSlug={category || null}
      />
      <PostComposerPrompt />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {(!posts || posts.length === 0) && (
        <div className="text-center py-12 text-sga-text-secondary text-sm">
          No posts yet. Be the first to share!
        </div>
      )}
    </>
  );
}
