import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

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

  const showWelcome = params.welcome === "1";

  return (
    <div className="space-y-6">
      {showWelcome && <WelcomeBanner />}

      <TodayCard subscription={subscription} />

      <QuickAdd />

      <RecentOrders orders={orders || []} />
    </div>
  );
}
