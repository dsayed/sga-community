export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 relative">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-dog.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
