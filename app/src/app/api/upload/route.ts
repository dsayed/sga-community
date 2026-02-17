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

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `${user.id}/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("forum-images")
    .upload(fileName, file, { contentType: file.type });

  if (error) {
    // Provide a helpful message if the bucket doesn't exist yet
    if (error.message.includes("not found") || error.message.includes("Bucket")) {
      return NextResponse.json(
        {
          error:
            'Storage bucket "forum-images" has not been created yet. Please create it in the Supabase dashboard.',
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("forum-images").getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
