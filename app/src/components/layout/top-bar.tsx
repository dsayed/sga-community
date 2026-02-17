export function TopBar() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-sga-warm-white border-b border-sga-border md:hidden">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-sga-blue rounded-lg flex items-center justify-center text-white text-sm">
          🐾
        </div>
        <span className="font-serif text-[15px] font-bold text-sga-blue-dark">
          Saving <span className="text-sga-orange">Great</span> Animals
        </span>
      </div>

      {/* Right: Search + Notification */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="w-[34px] h-[34px] rounded-full bg-sga-warm-gray flex items-center justify-center text-sm"
          aria-label="Search"
        >
          🔍
        </button>
        <button
          type="button"
          className="relative w-[34px] h-[34px] rounded-full bg-sga-warm-gray flex items-center justify-center text-sm"
          aria-label="Notifications"
        >
          🔔
          <span className="absolute top-0 right-0 w-2 h-2 bg-sga-urgent rounded-full" />
        </button>
      </div>
    </header>
  );
}
