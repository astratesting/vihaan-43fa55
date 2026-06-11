"use client";

import { useActionState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { updateProfileAction } from "@/app/dashboard/settings/actions";
import { useEffect } from "react";

interface ProfileSectionProps {
  profile: { first_name: string | null; last_name: string | null } | null;
  email: string;
}

export default function ProfileSection({ profile, email }: ProfileSectionProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, {});
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) toast("Profile updated.");
    if (state.error) toast(state.error, "error");
  }, [state, toast]);

  return (
    <Card>
      <h2 className="text-lg font-heading font-bold text-ink mb-4">Profile</h2>
      <form action={formAction} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="First name"
            name="firstName"
            defaultValue={profile?.first_name || ""}
            required
          />
          <Input
            label="Last name"
            name="lastName"
            defaultValue={profile?.last_name || ""}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5 font-body">Email</label>
          <div className="px-4 py-2.5 rounded-xl border border-border bg-background text-muted font-body text-base">
            {email}
          </div>
          <p className="mt-1 text-xs text-muted">Email is tied to your login.</p>
        </div>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}
