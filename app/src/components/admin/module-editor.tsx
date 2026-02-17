"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { TrainingModule, TrainingStep } from "@/lib/types";
import { StepEditor } from "./step-editor";

interface ModuleEditorProps {
  module: TrainingModule | null;
  steps: TrainingStep[];
  defaultSortOrder: number;
}

export function ModuleEditor({
  module,
  steps: initialSteps,
  defaultSortOrder,
}: ModuleEditorProps) {
  const router = useRouter();
  const isNew = !module;

  const [title, setTitle] = useState(module?.title ?? "");
  const [description, setDescription] = useState(module?.description ?? "");
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [published, setPublished] = useState(module?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<TrainingStep[]>(initialSteps);
  const [moduleId, setModuleId] = useState<number | null>(module?.id ?? null);

  async function handleSaveModule() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const method = isNew && !moduleId ? "POST" : "PUT";
      const res = await fetch("/api/admin/training", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: moduleId,
          title: title.trim(),
          description: description.trim() || null,
          sort_order: sortOrder,
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      const data = await res.json();

      if (!moduleId) {
        setModuleId(data.id);
        // Update URL without full reload
        window.history.replaceState(null, "", `/admin/training/${data.id}`);
      }

      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteModule() {
    if (!moduleId) return;
    if (!confirm("Delete this module and all its steps? This cannot be undone.")) return;

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/training", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: moduleId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      router.push("/admin/training");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
      setDeleting(false);
    }
  }

  async function handleAddStep() {
    if (!moduleId) {
      setError("Save the module first before adding steps");
      return;
    }

    const nextStepNumber = steps.length > 0
      ? Math.max(...steps.map((s) => s.step_number)) + 1
      : 1;

    try {
      const res = await fetch("/api/admin/training/steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_id: moduleId,
          step_number: nextStepNumber,
          title: "New Step",
          body: "",
          image_url: null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add step");
      }

      const newStep = await res.json();
      setSteps((prev) => [...prev, newStep]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add step");
    }
  }

  function handleStepUpdated(updatedStep: TrainingStep) {
    setSteps((prev) =>
      prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
    );
  }

  function handleStepDeleted(stepId: number) {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  }

  async function handleMoveStep(stepId: number, direction: "up" | "down") {
    const idx = steps.findIndex((s) => s.id === stepId);
    if (idx < 0) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === steps.length - 1) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const stepA = steps[idx];
    const stepB = steps[swapIdx];

    // Swap step_numbers
    try {
      await Promise.all([
        fetch("/api/admin/training/steps", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...stepA, step_number: stepB.step_number }),
        }),
        fetch("/api/admin/training/steps", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...stepB, step_number: stepA.step_number }),
        }),
      ]);

      const newSteps = [...steps];
      newSteps[idx] = { ...stepA, step_number: stepB.step_number };
      newSteps[swapIdx] = { ...stepB, step_number: stepA.step_number };
      newSteps.sort((a, b) => a.step_number - b.step_number);
      setSteps(newSteps);
    } catch {
      setError("Failed to reorder steps");
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link
          href="/admin/training"
          className="text-sga-blue hover:underline"
        >
          Training Modules
        </Link>
        <span className="text-sga-text-secondary mx-2">/</span>
        <span className="text-sga-text">
          {isNew && !moduleId ? "New Module" : title || "Edit Module"}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Module Details Form */}
      <div className="border border-sga-border rounded-lg p-4 bg-white mb-6">
        <h2 className="font-semibold text-sga-text mb-4">Module Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sga-text mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-sga-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sga-blue"
              placeholder="Module title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sga-text mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-sga-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sga-blue"
              placeholder="Brief description of this module"
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium text-sga-text mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                className="w-24 border border-sga-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sga-blue"
                min={0}
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sga-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500" />
              </label>
              <span className="text-sm text-sga-text">Published</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSaveModule}
              disabled={saving}
              className="bg-sga-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-sga-blue-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : moduleId ? "Save Module" : "Create Module"}
            </button>

            {moduleId && (
              <button
                onClick={handleDeleteModule}
                disabled={deleting}
                className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Module"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="border border-sga-border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sga-text">
            Steps ({steps.length})
          </h2>
          <button
            onClick={handleAddStep}
            disabled={!moduleId}
            className="bg-sga-blue text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-sga-blue-dark disabled:opacity-50"
          >
            + Add Step
          </button>
        </div>

        {!moduleId && (
          <p className="text-sm text-sga-text-secondary">
            Save the module first, then you can add steps.
          </p>
        )}

        {steps.length === 0 && moduleId && (
          <p className="text-sm text-sga-text-secondary">
            No steps yet. Add one to get started.
          </p>
        )}

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <StepEditor
              key={step.id}
              step={step}
              isFirst={idx === 0}
              isLast={idx === steps.length - 1}
              onUpdated={handleStepUpdated}
              onDeleted={handleStepDeleted}
              onMove={handleMoveStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
