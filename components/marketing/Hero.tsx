import Link from "next/link";
import { LANDING } from "@/lib/copy";
import AtlasMark from "@/components/illustrations/AtlasMark";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <AtlasMark className="absolute -bottom-10 -right-10 w-64 h-64 text-secondary/10" />
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-ink tracking-tight leading-tight">
              {LANDING.hero.h1}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted font-body max-w-lg leading-relaxed">
              {LANDING.hero.sub}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent text-white font-heading font-semibold text-base hover:bg-accent-dark active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                {LANDING.hero.ctaPrimary}
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-heading font-semibold text-base hover:bg-primary/5 active:scale-95 transition-all"
              >
                {LANDING.hero.ctaSecondary}
              </a>
            </div>
            <p className="mt-4 text-sm text-muted font-body">{LANDING.hero.trust}</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="20" r="10" fill="#F4C430" opacity="0.5" />
                  <rect x="14" y="28" width="20" height="12" rx="6" fill="#7B5EA7" opacity="0.4" />
                </svg>
              </div>
              <span className="text-sm text-muted font-body text-center">Product photo — coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
