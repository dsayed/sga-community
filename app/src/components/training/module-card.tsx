import Link from "next/link";
import type { TrainingModule, TrainingProgress, TrainingStatus } from "@/lib/types";

interface ModuleCardProps {
  module: TrainingModule;
  index: number; // 0-based, for numbering
  progress?: TrainingProgress;
}

/** Map module title keywords to emoji icons. */
function getModuleEmoji(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("body language")) return "\u{1F436}";
  if (lower.includes("handling")) return "\u{1F91D}";
  if (lower.includes("meeting needs")) return "\u{1F372}";
  if (lower.includes("decompression")) return "\u{1F3E0}";
  if (lower.includes("reinforcement")) return "\u2B50";
  return "\u{1F4D6}";
}

/** Thumbnail background color based on training status. */
function getThumbBg(status: TrainingStatus): string {
  switch (status) {
    case "completed":
      return "#E8F5ED";
    case "in_progress":
      return "var(--sga-orange-light)";
    default:
      return "var(--sga-warm-gray)";
  }
}

/** Status badge styling and label. */
function getBadge(status: TrainingStatus) {
  switch (status) {
    case "completed":
      return {
        className: "bg-[#E8F5ED] text-sga-success",
        label: "\u2713 Completed",
      };
    case "in_progress":
      return {
        className: "bg-sga-orange-light text-sga-orange",
        label: "In Progress",
      };
    default:
      return {
        className: "bg-sga-warm-gray text-sga-text-secondary",
        label: "Not Started",
      };
  }
}

export function ModuleCard({ module, index, progress }: ModuleCardProps) {
  const status: TrainingStatus = progress?.status ?? "not_started";
  const badge = getBadge(status);
  const emoji = getModuleEmoji(module.title);
  const thumbBg = getThumbBg(status);

  // Link to current step if progress exists, otherwise first step
  const step = progress?.current_step ?? 1;
  const href = `/training/${module.id}/${step}`;

  return (
    <Link href={href} className="block">
      <div className="bg-white mx-4 mb-2.5 rounded-md p-3.5 shadow-sm flex gap-3.5 cursor-pointer active:scale-[0.98] transition-transform">
        {/* Thumbnail */}
        <div
          className="w-16 h-16 rounded-sm flex items-center justify-center text-[28px] shrink-0"
          style={{ background: thumbBg }}
        >
          {emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-0.5">
            {index + 1}. {module.title}
          </div>
          {module.description && (
            <div className="text-xs text-sga-text-secondary mb-1.5 leading-relaxed">
              {module.description}
            </div>
          )}
          <div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
