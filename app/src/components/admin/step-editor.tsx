"use client";

import { useState } from "react";
import type { TrainingStep } from "@/lib/types";

interface StepEditorProps {
  step: TrainingStep;
  isFirst: boolean;
  isLast: boolean;
  onUpdated: (step: TrainingStep) => void;
  onDeleted: (stepId: number) => void;
  onMove: (stepId: number, direction: "up" | "down") => void;
}

export function StepEditor({
  step,
  isFirst,
  isLast,
  onUpdated,
  onDeleted,
  onMove,
}: StepEditorProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(step.title);
  const [body, setBody] = useState(step.body);
  const [imageUrl, setImageUrl] = useState(step.image_url ?? "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/training/steps", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: step.id,
          module_id: step.module_id,
          step_number: step.step_number,
          title: title.trim(),
          body: body,
          image_url: imageUrl.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save step");
      }

      const updated = await res.json();
      onUpdated(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save step");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this step? This cannot be undone.")) return;

    try {
      const res = await fetch("/api/admin/training/steps", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: step.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete step");
      }

      onDeleted(step.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete step");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/training/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setImageUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border border-sga-border rounded-lg overflow-hidden">
      {/* Collapsed header */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 bg-sga-warm-gray cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xs font-bold text-sga-text-secondary w-6 text-center">
          {step.step_number}
        </span>
        <span className="text-sm text-sga-text flex-1 truncate">
          {step.title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMove(step.id, "up");
            }}
            disabled={isFirst}
            className="text-xs px-1.5 py-0.5 rounded hover:bg-sga-border disabled:opacity-30"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMove(step.id, "down");
            }}
            disabled={isLast}
            className="text-xs px-1.5 py-0.5 rounded hover:bg-sga-border disabled:opacity-30"
            title="Move down"
          >
            ↓
          </button>
          <span className="text-xs text-sga-text-secondary ml-1">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div className="p-3 space-y-3 bg-white">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-sga-text mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-sga-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sga-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-sga-text mb-1">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full border border-sga-border rounded px-3 py-1.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-sga-blue font-mono"
              placeholder="Step content..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-sga-text mb-1">
              Image (optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs"
                disabled={uploading}
              />
              {uploading && (
                <span className="text-xs text-sga-text-secondary">
                  Uploading...
                </span>
              )}
            </div>
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Step image"
                  className="max-h-32 rounded border border-sga-border"
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-sga-blue text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-sga-blue-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Step"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-600"
            >
              Delete Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
