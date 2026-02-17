interface HeroProps {
  userName: string;
  newPostCount: number;
  eventCount?: number;
}

export function Hero({ userName, newPostCount, eventCount = 0 }: HeroProps) {
  const parts: string[] = [];
  if (newPostCount > 0) {
    parts.push(`${newPostCount} new post${newPostCount === 1 ? "" : "s"}`);
  }
  if (eventCount > 0) {
    parts.push(`${eventCount} upcoming event${eventCount === 1 ? "" : "s"}`);
  }
  const subtitle = parts.length > 0 ? parts.join(" \u00B7 ") : "Welcome back!";

  return (
    <div
      className="relative h-[180px] p-5 flex flex-col justify-end"
      style={{
        background:
          "linear-gradient(135deg, var(--sga-blue) 0%, var(--sga-blue-dark) 100%)",
      }}
    >
      {/* Faded dog emoji */}
      <span
        className="absolute right-5 top-5 text-6xl opacity-20 select-none pointer-events-none"
        aria-hidden="true"
      >
        🐶
      </span>

      <h1 className="font-serif text-[22px] font-semibold text-white mb-0.5">
        Hey {userName} 👋
      </h1>
      <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
        {subtitle}
      </p>
    </div>
  );
}
