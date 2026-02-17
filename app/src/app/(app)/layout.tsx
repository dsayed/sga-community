import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/layout/top-bar";
import { TabBar } from "@/components/layout/tab-bar";
import { Sidebar } from "@/components/layout/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <TabBar />
      </div>
    </div>
  );
}
