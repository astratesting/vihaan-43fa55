"use client";

import { useActionState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { updateNotificationsAction } from "@/app/dashboard/settings/actions";

interface NotificationsSectionProps {
  prefs: { order_updates_email: boolean; marketing_email: boolean } | null;
}

export default function NotificationsSection({ prefs }: NotificationsSectionProps) {
  const [state, formAction, isPending] = useActionState(updateNotificationsAction, {});
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) toast("Notification preferences saved.");
    if (state.error) toast(state.error, "error");
  }, [state, toast]);

  return (
    <Card>
      <h2 className="text-lg font-heading font-bold text-ink mb-4">Notifications</h2>
      <form action={formAction} className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="orderUpdates"
            defaultChecked={prefs?.order_updates_email ?? true}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary/30"
          />
          <span className="text-sm font-body text-ink">Order updates by email</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="marketing"
            defaultChecked={prefs?.marketing_email ?? false}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary/30"
          />
          <span className="text-sm font-body text-ink">Tips and new flavors by email</span>
        </label>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving..." : "Save preferences"}
        </Button>
      </form>
    </Card>
  );
}
