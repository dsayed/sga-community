import Link from "next/link";
import type { TrainingModule, TrainingProgress, TrainingStatus } from "@/lib/types";

interface ModuleCardProps {
  module: TrainingModule;
  index: number;
  progress?: TrainingProgress;
}

/** Map module title keywords to SGA photos. */
const MODULE_IMAGES: Record<string, string> = {
  "body language": "/images/foster-dogs.jpg",
  "handling": "/images/volunteer.jpg",
  "decompression": "/images/hero-dog.jpg",
  "meeting needs": "/images/available-dogs.jpg",
  "reinforcement": "/images/adoption.jpg",
};

function getModuleImage(title: string): string {
  const lower = title.toLowerCase();
  for (const [keyword, src] of Object.entries(MODULE_IMAGES)) {
    if (lower.includes(keyword)) return src;
  }
  return "/images/foster-dogs.jpg";
}

/** Status badge styling and label. */
function getBadge(status: TrainingStatus) {
  switch (status) {
    case "completed":
      return {
        className: "bg-white/90 text-sga-success",
        label: "\u2713 Completed",
      };
    case "in_progress":
      return {
        className: "bg-white/90 text-sga-orange",
        label: "In Progress",
      };
    default:
      return {
        className: "bg-white/90 text-sga-text-secondary",
        label: "Not Started",
      };
  }
}

export function ModuleCard({ module, index, progress }: ModuleCardProps) {
  const status: TrainingStatus = progress?.status ?? "not_started";
  const badge = getBadge(status);
  const imageSrc = getModuleImage(module.title);

  const step = progress?.current_step ?? 1;
  const href = `/training/${module.id}/${step}`;

  return (
    <Link href={href} className="block">
      <div className="card mx-4 mb-3 h-36 relative overflow-hidden cursor-pointer">
        {/* Photo background */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Content overlay */}
        <div className="relative h-full p-4 flex flex-col justify-end">
          <div className="font-serif text-base font-semibold text-white drop-shadow-sm mb-1">
            {index + 1}. {module.title}
          </div>
          {module.description && (
            <p className="text-xs text-white/70 line-clamp-1 mb-2">
              {module.description}
            </p>
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
