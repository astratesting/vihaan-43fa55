"use client";

import { useActionState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { resetPasswordAction } from "../login/actions";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, {});

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-heading font-bold text-ink">Reset your password</h1>
      <p className="mt-2 text-sm text-muted font-body">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        {state.error && (
          <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-body" role="alert">
            {state.error}
          </div>
        )}
        {state.success ? (
          <div className="p-3 rounded-xl bg-success/10 text-success text-sm font-body" role="status">
            Check your inbox for a reset link.
          </div>
        ) : (
          <>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
            <Button type="submit" fullWidth disabled={isPending}>
              {isPending ? "Sending..." : "Send reset link"}
            </Button>
          </>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-muted font-body">
        <Link href="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">
          Back to log in
        </Link>
      </p>
    </Card>
  );
}
