interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
      <h4 className="font-serif text-[15px] font-semibold mb-2.5">
        Your Training Progress
      </h4>
      <div className="h-2 bg-sga-warm-gray rounded-full overflow-hidden mb-1.5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, var(--sga-orange), #F5A623)",
          }}
        />
      </div>
      <div className="text-xs text-sga-text-secondary">
        {completed} of {total} modules completed
      </div>
    </div>
  );
}
