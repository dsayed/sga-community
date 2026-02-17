import { createClient } from "@/lib/supabase/server";
import { ProgressBar } from "@/components/training/progress-bar";
import { ModuleCard } from "@/components/training/module-card";
import type { TrainingProgress } from "@/lib/types";

export default async function TrainingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: modules } = await supabase
    .from("training_modules")
    .select("*")
    .eq("published", true)
    .order("sort_order");

  let progressMap: Record<number, TrainingProgress> = {};
  if (user) {
    const { data: progress } = await supabase
      .from("training_progress")
      .select("*")
      .eq("user_id", user.id);

    progress?.forEach((p: TrainingProgress) => {
      progressMap[p.module_id] = p;
    });
  }

  const completed = Object.values(progressMap).filter(
    (p) => p.status === "completed"
  ).length;
  const total = modules?.length || 0;

  return (
    <>
      <ProgressBar completed={completed} total={total} />

      <div className="flex items-center justify-between px-4 pt-5 pb-2.5">
        <h3 className="font-serif text-[17px] font-semibold text-sga-text">
          Foster Training Basics
        </h3>
      </div>

      {modules?.map((mod, i) => (
        <ModuleCard
          key={mod.id}
          module={mod}
          index={i}
          progress={progressMap[mod.id]}
        />
      ))}
    </>
  );
}
