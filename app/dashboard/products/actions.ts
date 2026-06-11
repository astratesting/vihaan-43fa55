"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo-auth";
import { revalidatePath } from "next/cache";

interface ActionResult {
  error?: string;
  success?: boolean;
}

export async function updateSkuAction(sku: string): Promise<ActionResult> {
  if (isDemoMode()) {
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("subscriptions")
    .update({ selected_sku: sku, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function pauseSubscriptionAction(): Promise<ActionResult> {
  if (isDemoMode()) {
    revalidatePath("/dashboard");
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const pausedUntil = new Date();
  pausedUntil.setDate(pausedUntil.getDate() + 30);

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "paused",
      paused_until: pausedUntil.toISOString().split("T")[0],
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function resumeSubscriptionAction(): Promise<ActionResult> {
  if (isDemoMode()) {
    revalidatePath("/dashboard");
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "active",
      paused_until: null,
      current_period_start: now.toISOString().split("T")[0],
      current_period_end: periodEnd.toISOString().split("T")[0],
      next_ship_date: periodEnd.toISOString().split("T")[0],
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function cancelSubscriptionAction(): Promise<ActionResult> {
  if (isDemoMode()) {
    revalidatePath("/dashboard");
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "cancelled",
      paused_until: null,
      next_ship_date: null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function activateSubscriptionAction(plan: string): Promise<ActionResult> {
  if (isDemoMode()) {
    revalidatePath("/dashboard");
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "active",
      plan: plan,
      current_period_start: now.toISOString().split("T")[0],
      current_period_end: periodEnd.toISOString().split("T")[0],
      next_ship_date: periodEnd.toISOString().split("T")[0],
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}
