import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-3xl grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(123,94,167,0.08)] animate-pulse h-96" />}>
      <SignupForm />
    </Suspense>
  );
}
