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
  const { module_id, action, current_step } = body;

  if (!module_id || !action) {
    return NextResponse.json(
      { error: "module_id and action required" },
      { status: 400 }
    );
  }

  if (action === "update_step") {
    const { error } = await supabase.from("training_progress").upsert(
      {
        user_id: user.id,
        module_id,
        current_step,
        status: "in_progress",
      },
      { onConflict: "user_id,module_id" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  if (action === "complete") {
    const { error } = await supabase.from("training_progress").upsert(
      {
        user_id: user.id,
        module_id,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
