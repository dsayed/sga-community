import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { StepViewer } from "@/components/training/step-viewer";

export default async function TrainingStepPage({
  params,
}: {
  params: Promise<{ moduleId: string; step: string }>;
}) {
  const { moduleId, step } = await params;
  const stepNumber = parseInt(step, 10);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: module } = await supabase
    .from("training_modules")
    .select("*")
    .eq("id", parseInt(moduleId, 10))
    .single();

  if (!module) notFound();

  const { data: allSteps } = await supabase
    .from("training_steps")
    .select("*")
    .eq("module_id", module.id)
    .order("step_number");

  const currentStep = allSteps?.find((s) => s.step_number === stepNumber);
  if (!currentStep) notFound();

  const totalSteps = allSteps?.length || 0;

  let progress = null;
  if (user) {
    const { data } = await supabase
      .from("training_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("module_id", module.id)
      .single();
    progress = data;
  }

  return (
    <StepViewer
      module={module}
      step={currentStep}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      isCompleted={progress?.status === "completed"}
    />
  );
}
