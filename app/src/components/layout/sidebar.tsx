"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: string;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", icon: "🏠", href: "/" },
  { label: "Forums", icon: "💬", href: "/forums", badge: "3" },
  { label: "Training", icon: "🎓", href: "/training" },
  { label: "Library", icon: "📚", href: "/library" },
  { label: "Directory", icon: "👥", href: "#", disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden md:flex w-[220px] bg-sga-warm-white border-r border-sga-border py-5 shrink-0 flex-col">
      {/* Logo section */}
      <div className="flex items-center gap-2.5 px-4 pb-5 border-b border-sga-border mb-3">
        <div className="w-9 h-9 bg-sga-blue rounded-[10px] flex items-center justify-center text-white text-base shrink-0">
          🐾
        </div>
        <span className="font-serif text-sm font-bold text-sga-blue-dark leading-tight">
          Saving
          <br />
          <span className="text-sga-orange">Great</span> Animals
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col">
        {navItems.map((item) => {
          const active = !item.disabled && isActive(item.href);

          if (item.disabled) {
            return (
              <span
                key={item.label}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full opacity-30 pointer-events-none text-sga-text-secondary"
              >
                <span className="text-lg w-6 text-center">{item.icon}</span>
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm w-full ${
                active
                  ? "bg-sga-orange-light text-sga-orange font-semibold border-r-[3px] border-sga-orange"
                  : "text-sga-text-secondary hover:bg-sga-warm-gray"
              }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-sga-urgent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
