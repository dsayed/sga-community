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
  const { title, content, category_id, images } = body;

  if (!content || !category_id) {
    return NextResponse.json(
      { error: "Content and category are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("forum_posts")
    .insert({
      author_id: user.id,
      title: title || null,
      body: content,
      category_id,
      images: images || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
