"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { TrainingModule, TrainingStep } from "@/lib/types";

interface StepViewerProps {
  module: TrainingModule;
  step: TrainingStep;
  stepNumber: number;
  totalSteps: number;
  isCompleted: boolean;
}

export function StepViewer({
  module,
  step,
  stepNumber,
  totalSteps,
  isCompleted,
}: StepViewerProps) {
  const router = useRouter();
  const [completing, setCompleting] = useState(false);

  const isFirstStep = stepNumber === 1;
  const isLastStep = stepNumber === totalSteps;

  function handleBack() {
    if (!isFirstStep) {
      router.push(`/training/${module.id}/${stepNumber - 1}`);
    }
  }

  function handleNext() {
    if (!isLastStep) {
      // Fire-and-forget: update progress in the background
      fetch("/api/training/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_id: module.id,
          action: "update_step",
          current_step: stepNumber + 1,
        }),
      });
      router.push(`/training/${module.id}/${stepNumber + 1}`);
    }
  }

  async function handleComplete() {
    setCompleting(true);
    try {
      await fetch("/api/training/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_id: module.id,
          action: "complete",
        }),
      });
      router.push("/training");
    } catch {
      setCompleting(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <div className="bg-white px-4 py-3 border-b border-sga-border flex items-center gap-3">
        <Link
          href="/training"
          className="text-sga-text-secondary hover:text-sga-text transition-colors"
          aria-label="Back to training"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-sga-text truncate">
            {module.title}
          </h1>
        </div>
        <span className="text-xs text-sga-text-secondary whitespace-nowrap">
          Step {stepNumber} of {totalSteps}
        </span>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto bg-sga-warm-gray">
        <div className="bg-white mx-4 my-4 rounded-lg p-5 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-sga-blue-dark mb-3">
            {step.title}
          </h2>

          {step.image_url && (
            <div className="relative w-full aspect-video mb-4">
              <Image
                src={step.image_url}
                alt={step.title}
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}

          <div className="text-sm text-sga-text leading-relaxed whitespace-pre-wrap">
            {step.body}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="bg-white px-4 py-3 border-t border-sga-border flex justify-between items-center">
        {!isFirstStep ? (
          <button
            onClick={handleBack}
            className="px-4 py-2.5 rounded-md border border-sga-border text-sm font-medium text-sga-text-secondary hover:bg-sga-warm-gray transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {isLastStep ? (
          isCompleted ? (
            <span className="px-6 py-2.5 rounded-md bg-[#E8F5ED] text-sga-success text-sm font-semibold">
              Already Completed
            </span>
          ) : (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="px-6 py-2.5 rounded-md bg-sga-success text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {completing ? "Completing..." : "Mark as Complete"}
            </button>
          )
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-md bg-sga-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
