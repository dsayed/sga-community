"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Training Content", href: "/admin/training" },
  { label: "Member Progress", href: "/admin/members" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 px-4 py-2 bg-sga-warm-gray border-b border-sga-border">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-1 rounded text-xs font-medium ${
              isActive
                ? "bg-sga-blue text-white"
                : "text-sga-text-secondary hover:bg-sga-border"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
