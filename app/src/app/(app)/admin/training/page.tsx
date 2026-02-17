import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminTrainingPage() {
  const supabase = await createClient();

  const { data: modules } = await supabase
    .from("training_modules")
    .select("*, steps:training_steps(count)")
    .order("sort_order");

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-sga-text">Training Modules</h1>
        <Link
          href="/admin/training/new"
          className="bg-sga-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sga-blue-dark"
        >
          + Add Module
        </Link>
      </div>

      {!modules || modules.length === 0 ? (
        <p className="text-sga-text-secondary text-sm">
          No training modules yet. Create one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {modules.map((mod) => {
            const stepCount =
              mod.steps?.[0]?.count ?? 0;

            return (
              <div
                key={mod.id}
                className="border border-sga-border rounded-lg p-4 bg-white flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-sga-text truncate">
                      {mod.title}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        mod.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {mod.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  {mod.description && (
                    <p className="text-sm text-sga-text-secondary line-clamp-1 mb-1">
                      {mod.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-sga-text-secondary">
                    <span>Order: {mod.sort_order}</span>
                    <span>
                      {stepCount} {stepCount === 1 ? "step" : "steps"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/training/${mod.id}`}
                  className="shrink-0 bg-sga-warm-gray text-sga-text-secondary px-3 py-1.5 rounded text-sm font-medium hover:bg-sga-border"
                >
                  Edit
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
