import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

async function verifyStaffRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["staff", "admin"].includes(profile.role)) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

export async function POST(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `training/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("training-images")
    .upload(fileName, file, { contentType: file.type });

  if (error) {
    // Fall back to forum-images bucket if training-images doesn't exist
    if (
      error.message.includes("not found") ||
      error.message.includes("Bucket")
    ) {
      const { data: fallbackData, error: fallbackError } =
        await supabase.storage
          .from("forum-images")
          .upload(fileName, file, { contentType: file.type });

      if (fallbackError) {
        return NextResponse.json(
          { error: fallbackError.message },
          { status: 500 }
        );
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("forum-images").getPublicUrl(fallbackData.path);

      return NextResponse.json({ url: publicUrl });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("training-images").getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
