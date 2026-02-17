import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { post_id } = body;

  if (!post_id) {
    return NextResponse.json(
      { error: "post_id is required" },
      { status: 400 }
    );
  }

  // Check if the user already reacted to this post
  const { data: existing } = await supabase
    .from("forum_reactions")
    .select("*")
    .eq("post_id", post_id)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    // Remove the reaction
    const { error } = await supabase
      .from("forum_reactions")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reacted: false });
  } else {
    // Add the reaction
    const { error } = await supabase.from("forum_reactions").insert({
      post_id,
      user_id: user.id,
      emoji: "heart",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reacted: true });
  }
}
