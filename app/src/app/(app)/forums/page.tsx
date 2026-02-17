import { createClient } from "@/lib/supabase/server";
import { CategoryTabs } from "@/components/forums/category-tabs";
import { ForumsClientWrapper } from "@/components/forums/forums-client-wrapper";
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
    .select("*, author:profiles!forum_posts_author_id_fkey(*), category:forum_categories(*)")
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
      <ForumsClientWrapper categories={categories || []} />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {(!posts || posts.length === 0) && (
        <div className="flex flex-col items-center py-12 px-4 animate-fade-in">
          <img src="/images/available-dogs.jpg" alt="" className="w-48 h-32 object-cover rounded-2xl mb-4 opacity-80" />
          <p className="text-sm font-medium text-sga-text mb-1">No posts yet</p>
          <p className="text-xs text-sga-text-secondary">Be the first to share what&apos;s happening with your foster!</p>
        </div>
      )}
    </>
  );
}
