import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ModuleEditor } from "@/components/admin/module-editor";

export default async function AdminModuleEditorPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const supabase = await createClient();
  const isNew = moduleId === "new";

  if (isNew) {
    // Get current module count for default sort_order
    const { count } = await supabase
      .from("training_modules")
      .select("*", { count: "exact", head: true });

    return (
      <ModuleEditor
        module={null}
        steps={[]}
        defaultSortOrder={(count ?? 0) + 1}
      />
    );
  }

  const { data: module } = await supabase
    .from("training_modules")
    .select("*")
    .eq("id", parseInt(moduleId, 10))
    .single();

  if (!module) notFound();

  const { data: steps } = await supabase
    .from("training_steps")
    .select("*")
    .eq("module_id", module.id)
    .order("step_number");

  return (
    <ModuleEditor
      module={module}
      steps={steps ?? []}
      defaultSortOrder={module.sort_order}
    />
  );
}
