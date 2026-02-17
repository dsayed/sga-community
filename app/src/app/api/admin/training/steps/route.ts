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

// POST: Create a new step
export async function POST(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { module_id, step_number, title, body: stepBody, image_url } = body;

  if (!module_id || !step_number) {
    return NextResponse.json(
      { error: "module_id and step_number are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("training_steps")
    .insert({
      module_id,
      step_number,
      title: title || "Untitled Step",
      body: stepBody || "",
      image_url: image_url || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PUT: Update an existing step
export async function PUT(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id, step_number, title, body: stepBody, image_url } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Step ID is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("training_steps")
    .update({
      step_number,
      title: title || "Untitled Step",
      body: stepBody ?? "",
      image_url: image_url || null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Delete a step
export async function DELETE(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Step ID is required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("training_steps")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
