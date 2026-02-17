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

// POST: Create a new module
export async function POST(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { title, description, sort_order, published } = body;

  if (!title?.trim()) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("training_modules")
    .insert({
      title: title.trim(),
      description: description || null,
      sort_order: sort_order ?? 0,
      published: published ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PUT: Update an existing module
export async function PUT(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id, title, description, sort_order, published } = body;

  if (!id) {
    return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
  }

  if (!title?.trim()) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("training_modules")
    .update({
      title: title.trim(),
      description: description || null,
      sort_order: sort_order ?? 0,
      published: published ?? false,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Delete a module (steps cascade-deleted by DB)
export async function DELETE(request: Request) {
  const { supabase, user } = await verifyStaffRole();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("training_modules")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
