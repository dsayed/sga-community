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
    <div className="relative h-[220px] md:h-[240px] overflow-hidden">
      <img
        src="/images/hero-dog.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative h-full p-5 flex flex-col justify-end">
        <h1 className="font-serif text-[24px] font-semibold text-white mb-0.5 drop-shadow-sm">
          Hey {userName} 👋
        </h1>
        <p className="text-[14px] text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
