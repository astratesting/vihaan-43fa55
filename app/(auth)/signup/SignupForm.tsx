"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signupAction } from "./actions";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(signupAction, {});
  const [step] = useState(1);

  useEffect(() => {
    const sku = searchParams.get("sku");
    const plan = searchParams.get("plan");
    if (sku) localStorage.setItem("vihaan_sku", sku);
    if (plan) localStorage.setItem("vihaan_plan", plan);
  }, [searchParams]);

  useEffect(() => {
    if (state.success && !state.needsConfirmation) {
      router.push("/dashboard?welcome=1");
    }
  }, [state, router]);

  if (state.success && state.needsConfirmation) {
    return (
      <div className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-[0_4px_24px_rgba(123,94,167,0.08)] text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-heading font-bold text-ink">Check your email</h1>
        <p className="mt-3 text-muted font-body">
          We sent a confirmation link to your inbox. Click it to activate your account and get started.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-primary font-semibold hover:text-primary-dark transition-colors"
        >
          Go to log in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(123,94,167,0.08)]">
      {/* Left - Info */}
      <div className="bg-primary text-white p-8 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold leading-tight">
          Let&apos;s set up your first box.
        </h1>
        <p className="mt-4 text-white/80 font-body">
          Pick a flavor, choose a plan, and we&apos;ll handle the rest. Cancel or pause anytime.
        </p>
        <div className="mt-8 flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold ${
                  step >= s ? "bg-white text-primary" : "bg-white/20 text-white/60"
                }`}
              >
                {s}
              </div>
              <span className={`text-sm ${step >= s ? "text-white" : "text-white/60"}`}>
                {s === 1 ? "Account" : s === 2 ? "Plan" : "Done"}
              </span>
              {s < 3 && <div className="w-8 h-px bg-white/30" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right - Form */}
      <div className="bg-surface p-8">
        <form action={formAction} className="space-y-4">
          {state.error && (
            <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-body" role="alert">
              {state.error}
            </div>
          )}
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
            placeholder="At least 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Type it again"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted font-body">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
