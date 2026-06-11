import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/lib/data";
import SkuSelector from "@/components/dashboard/SkuSelector";
import ExtrasPlaceholder from "@/components/dashboard/ExtrasPlaceholder";

export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

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
