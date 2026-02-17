import Link from "next/link";

interface QuickActionsProps {
  forumBadgeCount?: number;
}

interface QuickAction {
  icon: string;
  label: string;
  href: string;
  external?: boolean;
  badge?: number;
}

export function QuickActions({ forumBadgeCount }: QuickActionsProps) {
  const actions: QuickAction[] = [
    { icon: "🎓", label: "Training", href: "/training" },
    { icon: "📚", label: "Library", href: "/library" },
    {
      icon: "💬",
      label: "Forums",
      href: "/forums",
      badge: forumBadgeCount,
    },
    {
      icon: "📋",
      label: "Vol. Shifts",
      href: "https://www.signupgenius.com",
      external: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 px-4 -mt-6 relative z-10">
      {actions.map((action) => {
        const content = (
          <>
            <span className="text-2xl block mb-1.5">{action.icon}</span>
            <span className="text-[11px] font-semibold text-sga-text">
              {action.label}
            </span>
            {action.badge != null && action.badge > 0 && (
              <span className="inline-block bg-sga-urgent text-white text-[9px] font-bold px-1.5 rounded-lg mt-1">
                {action.badge} new
              </span>
            )}
          </>
        );

        const className =
          "bg-white rounded-md p-3.5 text-center shadow-md cursor-pointer active:scale-[0.96] transition-transform";

        if (action.external) {
          return (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          );
        }

        return (
          <Link key={action.label} href={action.href} className={className}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
