"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  icon: string;
  href: string;
  disabled?: boolean;
}

const tabs: Tab[] = [
  { label: "Home", icon: "🏠", href: "/" },
  { label: "Forums", icon: "💬", href: "/forums" },
  { label: "Training", icon: "🎓", href: "/training" },
  { label: "Library", icon: "📚", href: "/library" },
  { label: "People", icon: "👥", href: "#", disabled: true },
];

export function TabBar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="flex items-center justify-around py-2 pb-7 bg-sga-warm-white border-t border-sga-border md:hidden">
      {tabs.map((tab) => {
        const active = !tab.disabled && isActive(tab.href);

        if (tab.disabled) {
          return (
            <span
              key={tab.label}
              className="flex flex-col items-center gap-0.5 opacity-30 pointer-events-none"
            >
              <span className="text-xl opacity-40">{tab.icon}</span>
              <span className="text-[10px] font-medium text-sga-text-secondary opacity-60">
                {tab.label}
              </span>
            </span>
          );
        }

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex flex-col items-center gap-0.5"
          >
            <span className={`text-xl ${active ? "opacity-100" : "opacity-40"}`}>
              {tab.icon}
            </span>
            <span
              className={`text-[10px] font-medium ${
                active
                  ? "text-sga-orange font-semibold opacity-100"
                  : "text-sga-text-secondary opacity-60"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
