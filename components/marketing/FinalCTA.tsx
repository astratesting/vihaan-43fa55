import Link from "next/link";
import { LANDING } from "@/lib/copy";

export default function FinalCTA() {
  return (
    <section className="bg-accent py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
          {LANDING.finalCta.h2}
        </h2>
        <Link
          href="/signup"
          className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-accent font-heading font-semibold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-sm"
        >
          {LANDING.finalCta.button}
        </Link>
      </div>
    </section>
  );
}
