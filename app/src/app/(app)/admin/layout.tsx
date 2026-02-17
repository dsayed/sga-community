import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["staff", "admin"].includes(profile.role)) {
    redirect("/");
  }

  return (
    <div>
      <div className="bg-sga-blue-dark text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider">
        Admin
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
