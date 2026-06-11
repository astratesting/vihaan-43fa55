import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { isDemoMode } from "@/lib/demo-auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  // In demo mode, use email as the display name
  if (isDemoMode()) {
    return (
      <DashboardShell
        firstName={user.email?.split("@")[0] || "Demo"}
        lastName=""
      >
        {children}
      </DashboardShell>
    );
  }

  const supabase = await createClient();

  // Fetch profile for the topbar
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  return (
    <DashboardShell
      firstName={profile?.first_name}
      lastName={profile?.last_name}
    >
      {children}
    </DashboardShell>
  );
}
