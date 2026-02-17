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
  const { post_id, body: commentBody } = body;

  if (!post_id || !commentBody?.trim()) {
    return NextResponse.json(
      { error: "post_id and body are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("forum_comments")
    .insert({
      post_id,
      author_id: user.id,
      body: commentBody.trim(),
    })
    .select("*, author:profiles!forum_comments_author_id_fkey(*)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
