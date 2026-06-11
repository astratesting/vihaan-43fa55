"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { US_STATES, isValidZip } from "@/lib/format";

interface ActionResult {
  error?: string;
  success?: boolean;
}

export async function updateProfileAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();

  if (!firstName) return { error: "First name is required." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateAddressAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const line1 = (formData.get("line1") as string)?.trim();
  const line2 = (formData.get("line2") as string)?.trim() || null;
  const city = (formData.get("city") as string)?.trim();
  const state = formData.get("state") as string;
  const zip = (formData.get("zip") as string)?.trim();

  if (!line1 || !city || !state || !zip) {
    return { error: "Street, city, state, and ZIP are required." };
  }

  if (!US_STATES.includes(state)) {
    return { error: "Please select a valid US state." };
  }

  if (!isValidZip(zip)) {
    return { error: "Please enter a valid ZIP code." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("addresses")
    .upsert(
      { user_id: user.id, line1, line2, city, state, zip, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

  if (error) return { error: error.message };

  return { success: true };
}

export async function updateNotificationsAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const orderUpdates = formData.get("orderUpdates") === "on";
  const marketing = formData.get("marketing") === "on";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("notification_prefs")
    .upsert(
      { user_id: user.id, order_updates_email: orderUpdates, marketing_email: marketing },
      { onConflict: "user_id" }
    );

  if (error) return { error: error.message };

  return { success: true };
}

export async function deleteAccountAction(): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/account/delete`, {
    method: "POST",
  });

  if (!res.ok) {
    const data = await res.json();
    return { error: data.error || "Failed to delete account." };
  }

  await supabase.auth.signOut();
  return { success: true };
}
