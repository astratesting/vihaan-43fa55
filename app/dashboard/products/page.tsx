import { getUser } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo-auth";
import { PRODUCTS } from "@/lib/data";
import SkuSelector from "@/components/dashboard/SkuSelector";
import ExtrasPlaceholder from "@/components/dashboard/ExtrasPlaceholder";

export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const user = await getUser();

  if (!user) return null;

  // Demo mode
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

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-ink">Choose your box</h1>
          <p className="mt-2 text-muted font-body">
            You can change flavors, swap SKUs, or add extras any time before your next ship date.
          </p>
        </div>

        <SkuSelector
          products={PRODUCTS}
          currentSku={mockSubscription.selected_sku}
          subscription={mockSubscription}
        />

        <ExtrasPlaceholder />
      </div>
    );
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("selected_sku, plan, status, next_ship_date, current_period_end")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-ink">Choose your box</h1>
        <p className="mt-2 text-muted font-body">
          You can change flavors, swap SKUs, or add extras any time before your next ship date.
        </p>
      </div>

      <SkuSelector
        products={PRODUCTS}
        currentSku={subscription?.selected_sku || "gummy-bears"}
        subscription={subscription}
      />

      <ExtrasPlaceholder />
    </div>
  );
}
