import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-[0_4px_24px_rgba(123,94,167,0.08)] animate-pulse h-96" />}>
      <LoginForm />
    </Suspense>
  );
}
