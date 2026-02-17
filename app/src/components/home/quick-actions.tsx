import Link from "next/link";

interface QuickActionsProps {
  forumBadgeCount?: number;
}

interface QuickAction {
  icon: string;
  label: string;
  href: string;
  badge?: number;
  gradient: string;
}

export function QuickActions({ forumBadgeCount }: QuickActionsProps) {
  const actions: QuickAction[] = [
    { icon: "🎓", label: "Training", href: "/training", gradient: "from-amber-50 to-orange-50" },
    { icon: "📚", label: "Library", href: "/library", gradient: "from-blue-50 to-indigo-50" },
    {
      icon: "💬",
      label: "Forums",
      href: "/forums",
      badge: forumBadgeCount,
      gradient: "from-orange-50 to-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 px-4 -mt-6 relative z-10">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={`card bg-gradient-to-br ${action.gradient} p-4 text-center cursor-pointer`}
        >
          <span className="text-2xl block mb-1.5">{action.icon}</span>
          <span className="text-[11px] font-semibold text-sga-text">
            {action.label}
          </span>
          {action.badge != null && action.badge > 0 && (
            <span className="inline-block bg-sga-urgent text-white text-[9px] font-bold px-1.5 rounded-lg mt-1">
              {action.badge} new
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
