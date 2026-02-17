import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UrgentBanner } from "@/components/home/urgent-banner";
import { Hero } from "@/components/home/hero";
import { QuickActions } from "@/components/home/quick-actions";
import { PostCard } from "@/components/forums/post-card";
import type { ForumPost } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch profile for greeting
  const { data: profile } = user
    ? await supabase.from("profiles").select("*").eq("id", user.id).single()
    : { data: null };

  // Fetch latest urgent post
  const { data: urgentPost } = await supabase
    .from("forum_posts")
    .select("*, category:forum_categories!inner(*)")
    .eq("category.slug", "urgent-needs")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch recent posts with authors and categories
  const { data: recentPosts } = await supabase
    .from("forum_posts")
    .select("*, author:profiles!forum_posts_author_id_fkey(*), category:forum_categories(*)")
    .order("created_at", { ascending: false })
    .limit(5);

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <>
      {urgentPost && (
        <UrgentBanner
          message={urgentPost.title || urgentPost.body?.slice(0, 80)}
          href={`/forums/${urgentPost.id}`}
        />
      )}
      <Hero
        userName={firstName}
        newPostCount={recentPosts?.length || 0}
      />
      <QuickActions forumBadgeCount={3} />
      <div className="flex items-center justify-between px-4 pt-5 pb-2.5">
        <h3 className="font-serif text-[17px] font-semibold text-sga-text">
          Recent Activity
        </h3>
        <Link
          href="/forums"
          className="text-xs font-semibold text-sga-orange cursor-pointer"
        >
          See all
        </Link>
      </div>
      {recentPosts?.map((post: ForumPost) => (
        <PostCard key={post.id} post={post} />
      ))}
      {(!recentPosts || recentPosts.length === 0) && (
        <div className="flex flex-col items-center py-12 px-4 animate-fade-in">
          <img src="/images/adoption.jpg" alt="" className="w-48 h-32 object-cover rounded-2xl mb-4 opacity-80" />
          <p className="text-sm font-medium text-sga-text mb-1">No activity yet</p>
          <p className="text-xs text-sga-text-secondary">Check back soon for updates from the community!</p>
        </div>
      )}
    </>
  );
}
