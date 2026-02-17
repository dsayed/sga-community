import Link from "next/link";

interface UrgentBannerProps {
  message: string;
  href: string;
}

export function UrgentBanner({ message, href }: UrgentBannerProps) {
  if (!message) return null;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-white cursor-pointer"
      style={{
        background: "linear-gradient(135deg, var(--sga-urgent), #B83A25)",
      }}
    >
      <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
      <span>
        <strong>Urgent:</strong> {message}
      </span>
    </Link>
  );
}
