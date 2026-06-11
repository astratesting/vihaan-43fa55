"use client";

import { useActionState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface PwResult {
  error?: string;
  success?: boolean;
}

export default function PasswordSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  async function updatePasswordAction(prev: PwResult, formData: FormData): Promise<PwResult> {
    const password = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmNewPassword") as string;

    if (!password || password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }
    if (password !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) return { error: error.message };
    return { success: true };
  }

  const [state, formAction, isPending] = useActionState(updatePasswordAction, {});

  useEffect(() => {
    if (state.success) {
      toast("Password updated.");
      formRef.current?.reset();
    }
    if (state.error) toast(state.error, "error");
  }, [state, toast]);

  return (
    <Card>
      <h2 className="text-lg font-heading font-bold text-ink mb-4">Password</h2>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Input
          label="New password"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <Input
          label="Confirm new password"
          name="confirmNewPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Updating..." : "Update password"}
        </Button>
      </form>
    </Card>
  );
}
