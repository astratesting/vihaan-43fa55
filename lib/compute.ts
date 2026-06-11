import type { Plan, SubscriptionStatus } from "@/types/domain";

export const PLAN_PRICES: Record<Plan, number> = {
  starter: 3999,
  monthly: 3499,
  family: 5999,
};

export const PLAN_INTERVALS: Record<Plan, string> = {
  starter: "one_time",
  monthly: "month",
  family: "month",
};

export function computeNextCharge(
  plan: Plan,
  status: SubscriptionStatus,
  currentPeriodEnd: string | null
): { amount: number; date: string | null } {
  const amount = PLAN_PRICES[plan];

  if (status === "not_started" || status === "cancelled") {
    return { amount, date: null };
  }

  if (status === "paused") {
    return { amount, date: null };
  }

  if (currentPeriodEnd) {
    const d = new Date(currentPeriodEnd);
    d.setMonth(d.getMonth() + 1);
    return { amount, date: d.toISOString().split("T")[0] };
  }

  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  return { amount, date: now.toISOString().split("T")[0] };
}
