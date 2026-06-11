import { createClient, getUser } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo-auth";
import { PRODUCTS, PLAN_LABELS, SKU_LABELS } from "@/lib/data";
import { formatMoney, formatDate } from "@/lib/format";
import Link from "next/link";
import TodayCard from "@/components/dashboard/TodayCard";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickAdd from "@/components/dashboard/QuickAdd";
import RecentOrders from "@/components/dashboard/RecentOrders";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const params = await searchParams;
  const user = await getUser();

  if (!user) return null;

  const showWelcome = params.welcome === "1";

  // Demo mode: provide mock data
  if (isDemoMode()) {
    const mockSubscription = {
      id: "demo-sub-1",
      user_id: user.id,
      plan: "monthly" as const,
      selected_sku: "gummy-bears" as const,
      status: "active" as const,
      paused_until: null,
      current_period_start: null,
      current_period_end: null,
      next_ship_date: null,
      stripe_customer_id: null,
      stripe_subscription_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockOrders = [
      {
        id: "demo-order-1",
        user_id: user.id,
        status: "delivered" as const,
        total_cents: 3499,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [{ sku: "gummy-bears", name: "Gummy Bears", qty: 1, price_cents: 3499 }],
      },
    ];

    return (
      <div className="space-y-6">
        {showWelcome && <WelcomeBanner />}
        <TodayCard subscription={mockSubscription} />
        <QuickAdd />
        <RecentOrders orders={mockOrders} />
      </div>
    );
  }

  // Real Supabase mode
  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      {showWelcome && <WelcomeBanner />}
      <TodayCard subscription={subscription} />
      <QuickAdd />
      <RecentOrders orders={orders || []} />
    </div>
  );
}
