"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { loginAction, resetPasswordAction, updatePasswordAction } from "./actions";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, {});
  const [resetState, resetFormAction, resetPending] = useActionState(resetPasswordAction, {});
  const [updateState, updateFormAction, updatePending] = useActionState(updatePasswordAction, {});
  const [showReset, setShowReset] = useState(false);

  const isRecovery = searchParams.get("type") === "recovery";
  const next = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    if (loginState.success) {
      router.push(next);
    }
  }, [loginState, router, next]);

  useEffect(() => {
    if (updateState.success) {
      router.push("/login");
    }
  }, [updateState, router]);

  if (isRecovery) {
    return (
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-heading font-bold text-ink">Set a new password</h1>
        <p className="mt-2 text-sm text-muted font-body">
          Enter your new password below.
        </p>
        <form action={updateFormAction} className="mt-6 space-y-4">
          {updateState.error && (
            <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-body" role="alert">
              {updateState.error}
            </div>
          )}
          {updateState.success && (
            <div className="p-3 rounded-xl bg-success/10 text-success text-sm font-body" role="status">
              Password updated! Redirecting to login...
            </div>
          )}
          <Input
            label="New password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="Type it again"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth disabled={updatePending}>
            {updatePending ? "Updating..." : "Update password"}
          </Button>
        </form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-heading font-bold text-ink">Welcome back.</h1>
      <p className="mt-2 text-sm text-muted font-body">
        Log in to manage your subscription.
      </p>

      {!showReset ? (
        <form action={loginFormAction} className="mt-6 space-y-4">
          {loginState.error && (
            <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-body" role="alert">
              {loginState.error}
            </div>
          )}
          <input type="hidden" name="next" value={next} />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
            required
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth disabled={loginPending}>
            {loginPending ? "Logging in..." : "Log in"}
          </Button>
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="w-full text-center text-sm text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Forgot password?
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <form action={resetFormAction} className="space-y-4">
            {resetState.error && (
              <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-body" role="alert">
                {resetState.error}
              </div>
            )}
            {resetState.success ? (
              <div className="p-3 rounded-xl bg-success/10 text-success text-sm font-body" role="status">
                Check your inbox for a reset link.
              </div>
            ) : (
              <>
                <p className="text-sm text-muted font-body">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                />
                <Button type="submit" fullWidth disabled={resetPending}>
                  {resetPending ? "Sending..." : "Send reset link"}
                </Button>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setShowReset(false);
              }}
              className="w-full text-center text-sm text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Back to log in
            </button>
          </form>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted font-body">
        New to Vihaan?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:text-primary-dark transition-colors">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
