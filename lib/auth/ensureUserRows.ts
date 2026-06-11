import { createClient } from "@/lib/supabase/server";

export async function ensureUserRows(userId: string) {
  const supabase = await createClient();

  // Profile
  await supabase
    .from("profiles")
    .upsert({ id: userId }, { onConflict: "id" });

  // Subscription
  await supabase
    .from("subscriptions")
    .upsert(
      { user_id: userId, plan: "monthly", selected_sku: "gummy-bears", status: "not_started" },
      { onConflict: "user_id" }
    );

  // Notification prefs
  await supabase
    .from("notification_prefs")
    .upsert(
      { user_id: userId, order_updates_email: true, marketing_email: false },
      { onConflict: "user_id" }
    );
}
