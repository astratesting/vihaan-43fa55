import { createClient, getUser } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo-auth";
import ProfileSection from "@/components/dashboard/SettingsSections/ProfileSection";
import AddressSection from "@/components/dashboard/SettingsSections/AddressSection";
import PasswordSection from "@/components/dashboard/SettingsSections/PasswordSection";
import NotificationsSection from "@/components/dashboard/SettingsSections/NotificationsSection";
import DangerZone from "@/components/dashboard/SettingsSections/DangerZone";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) return null;

  // Demo mode: provide mock settings data
  if (isDemoMode()) {
    const emailPrefix = user.email?.split("@")[0] || "Demo";
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-heading font-extrabold text-ink">Account settings</h1>

        <ProfileSection
          profile={{ first_name: emailPrefix, last_name: "" }}
          email={user.email || "demo@example.com"}
        />
        <AddressSection address={null} />
        <PasswordSection />
        <NotificationsSection prefs={{ order_updates_email: true, marketing_email: false }} />
        <DangerZone />
      </div>
    );
  }

  const supabase = await createClient();

  const [profileRes, addressRes, notifRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("addresses").select("*").eq("user_id", user.id).single(),
    supabase.from("notification_prefs").select("*").eq("user_id", user.id).single(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-extrabold text-ink">Account settings</h1>

      <ProfileSection profile={profileRes.data} email={user.email || ""} />
      <AddressSection address={addressRes.data} />
      <PasswordSection />
      <NotificationsSection prefs={notifRes.data} />
      <DangerZone />
    </div>
  );
}
