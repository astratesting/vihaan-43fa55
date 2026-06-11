"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { PLAN_LABELS, SKU_LABELS } from "@/lib/data";
import { formatMoney, formatDate } from "@/lib/format";
import { PLAN_PRICES } from "@/lib/compute";
import { pauseSubscriptionAction, resumeSubscriptionAction, cancelSubscriptionAction, activateSubscriptionAction } from "@/app/dashboard/products/actions";
import { useToast } from "@/components/ui/Toast";
import type { Subscription } from "@/types/domain";

interface TodayCardProps {
  subscription: Subscription | null;
}

export default function TodayCard({ subscription }: TodayCardProps) {
  const [showModal, setShowModal] = useState<"pause" | "resume" | "cancel" | "activate" | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const status = subscription?.status || "not_started";
  const plan = subscription?.plan || "monthly";
  const selectedSku = subscription?.selected_sku || "gummy-bears";
  const nextShipDate = subscription?.next_ship_date;

  const statusConfig = {
    active: { label: "Active", variant: "success" as const },
    paused: { label: "Paused", variant: "warning" as const },
    cancelled: { label: "Cancelled", variant: "muted" as const },
    not_started: { label: "Not started yet", variant: "muted" as const },
  };

  const current = statusConfig[status];

  async function handleAction() {
    setLoading(true);
    let result;
    if (showModal === "pause") result = await pauseSubscriptionAction();
    else if (showModal === "resume") result = await resumeSubscriptionAction();
    else if (showModal === "cancel") result = await cancelSubscriptionAction();
    else if (showModal === "activate") result = await activateSubscriptionAction(plan);

    setLoading(false);
    setShowModal(null);

    if (result?.error) {
      toast(result.error, "error");
    } else if (result?.success) {
      if (showModal === "pause") toast("Subscription paused.");
      else if (showModal === "resume") toast("Subscription resumed!");
      else if (showModal === "cancel") toast("Subscription cancelled.");
      else if (showModal === "activate") toast("Subscription activated!");
    }
  }

  return (
    <>
      <Card className="border-l-4 border-l-primary">
        <h2 className="text-xl font-heading font-bold text-ink mb-4">Your subscription</h2>

        {/* Status row */}
        <div className="flex items-center gap-3 mb-3">
          <Pill variant={current.variant}>{current.label}</Pill>
          {nextShipDate && (
            <span className="text-sm text-muted font-body">
              Next box ships {formatDate(nextShipDate)}
            </span>
          )}
        </div>

        {/* Plan row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-body text-ink">
            {PLAN_LABELS[plan] || "Monthly Plan"} &middot; {formatMoney(PLAN_PRICES[plan as keyof typeof PLAN_PRICES] || 3499)}
            {plan !== "starter" ? "/mo" : ""}
          </span>
          <Link href="/dashboard/products" className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors">
            Change plan
          </Link>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {status === "not_started" && (
            <Button size="sm" onClick={() => setShowModal("activate")}>
              Start subscription
            </Button>
          )}
          {status === "active" && (
            <>
              <Button size="sm" variant="secondary" onClick={() => setShowModal("pause")}>
                Pause subscription
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowModal("cancel")}>
                Cancel
              </Button>
            </>
          )}
          {status === "paused" && (
            <Button size="sm" onClick={() => setShowModal("resume")}>
              Resume subscription
            </Button>
          )}
        </div>

        <p className="mt-4 text-xs text-muted font-body">
          Need help? <a href="mailto:support@vihaan.com" className="text-primary hover:underline">Email us</a>
        </p>
      </Card>

      {/* Confirm Modals */}
      <Modal open={showModal === "pause"} onClose={() => setShowModal(null)} title="Pause subscription?">
        <p className="text-muted font-body mb-4">
          Your subscription will be paused for 1 month. You can resume anytime from your dashboard.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>Cancel</Button>
          <Button size="sm" onClick={handleAction} disabled={loading}>
            {loading ? "Pausing..." : "Pause for 1 month"}
          </Button>
        </div>
      </Modal>

      <Modal open={showModal === "resume"} onClose={() => setShowModal(null)} title="Resume subscription?">
        <p className="text-muted font-body mb-4">
          Your next box will ship on your regular schedule.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>Cancel</Button>
          <Button size="sm" onClick={handleAction} disabled={loading}>
            {loading ? "Resuming..." : "Resume"}
          </Button>
        </div>
      </Modal>

      <Modal open={showModal === "cancel"} onClose={() => setShowModal(null)} title="Cancel subscription?">
        <p className="text-muted font-body mb-4">
          You can always restart later. No hard feelings.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>Keep it</Button>
          <Button variant="danger" size="sm" onClick={handleAction} disabled={loading}>
            {loading ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </div>
      </Modal>

      <Modal open={showModal === "activate"} onClose={() => setShowModal(null)} title="Start subscription?">
        <p className="text-muted font-body mb-4">
          Your {PLAN_LABELS[plan]} will start now. You&apos;ll be charged {formatMoney(PLAN_PRICES[plan as keyof typeof PLAN_PRICES] || 3499)} today.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>Cancel</Button>
          <Button size="sm" onClick={handleAction} disabled={loading}>
            {loading ? "Starting..." : "Start subscription"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
