"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatMoney, formatDate } from "@/lib/format";
import { PLAN_PRICES } from "@/lib/compute";
import { updateSkuAction } from "@/app/dashboard/products/actions";
import type { Product } from "@/types/domain";

interface SkuSelectorProps {
  products: Product[];
  currentSku: string;
  subscription: {
    selected_sku: string;
    plan: string;
    status: string;
    next_ship_date: string | null;
    current_period_end: string | null;
  } | null;
}

export default function SkuSelector({ products, currentSku, subscription }: SkuSelectorProps) {
  const [confirmSku, setConfirmSku] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const plan = subscription?.plan || "monthly";
  const nextDate = subscription?.next_ship_date;
  const price = PLAN_PRICES[plan as keyof typeof PLAN_PRICES] || 3499;

  async function handleConfirm() {
    if (!confirmSku) return;
    setLoading(true);
    const result = await updateSkuAction(confirmSku.sku);
    setLoading(false);
    setConfirmSku(null);

    if (result.error) {
      toast(result.error, "error");
    } else {
      toast(`${confirmSku.name} added to your next box!`);
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => {
          const isSelected = product.sku === currentSku;
          return (
            <div
              key={product.sku}
              className={`bg-background rounded-2xl p-6 border-2 transition-all duration-200 ${
                isSelected
                  ? "border-primary shadow-[0_4px_24px_rgba(123,94,167,0.15)]"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="w-full aspect-square max-w-[140px] mx-auto rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                <span className="text-4xl">{product.shape_emoji}</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-ink">{product.name}</h3>
              <p className="text-sm text-muted font-body">{product.flavor}</p>
              <p className="mt-1 text-sm text-muted font-body">
                5g prebiotic fiber &middot; {product.pieces_per_box} pieces
              </p>
              <p className="mt-2 text-lg font-heading font-bold text-ink">
                {formatMoney(product.price_cents)}/mo
              </p>
              {isSelected ? (
                <div className="mt-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-heading font-semibold text-center">
                  Currently selected
                </div>
              ) : (
                <Button
                  fullWidth
                  size="sm"
                  className="mt-4"
                  onClick={() => setConfirmSku(product)}
                >
                  Select
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <Modal open={!!confirmSku} onClose={() => setConfirmSku(null)} title="Change your box?">
        {confirmSku && (
          <>
            <p className="text-muted font-body mb-2">
              Add <strong className="text-ink">{confirmSku.name}</strong> ({confirmSku.flavor}) to your next box?
            </p>
            <p className="text-muted font-body mb-4">
              We&apos;ll charge {formatMoney(price)}{nextDate ? ` on ${formatDate(nextDate)}` : ""}.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setConfirmSku(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm} disabled={loading}>
                {loading ? "Updating..." : "Confirm"}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
