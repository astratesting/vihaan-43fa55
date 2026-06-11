"use client";

import { useActionState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { updateAddressAction } from "@/app/dashboard/settings/actions";
import { US_STATES } from "@/lib/format";
import type { Address } from "@/types/domain";

interface AddressSectionProps {
  address: Address | null;
}

export default function AddressSection({ address }: AddressSectionProps) {
  const [state, formAction, isPending] = useActionState(updateAddressAction, {});
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) toast("Address updated.");
    if (state.error) toast(state.error, "error");
  }, [state, toast]);

  return (
    <Card>
      <h2 className="text-lg font-heading font-bold text-ink mb-4">Shipping address</h2>
      <form action={formAction} className="space-y-4">
        <Input
          label="Street address"
          name="line1"
          defaultValue={address?.line1 || ""}
          required
          placeholder="123 Main St"
        />
        <Input
          label="Apt, suite, etc."
          name="line2"
          defaultValue={address?.line2 || ""}
          placeholder="Apt 4B (optional)"
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="City"
            name="city"
            defaultValue={address?.city || ""}
            required
          />
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-ink mb-1.5 font-body">
              State
            </label>
            <select
              id="state"
              name="state"
              defaultValue={address?.state || ""}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink font-body text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            >
              <option value="">Select</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <Input
            label="ZIP code"
            name="zip"
            defaultValue={address?.zip || ""}
            required
            placeholder="12345"
          />
        </div>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving..." : "Save address"}
        </Button>
      </form>
    </Card>
  );
}
