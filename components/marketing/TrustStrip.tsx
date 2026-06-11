import { LANDING } from "@/lib/copy";

export default function TrustStrip() {
  return (
    <section className="bg-secondary/10 border-y border-secondary/20">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {LANDING.trustStrip.map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 rounded-full bg-secondary/15 text-ink text-sm font-heading font-semibold border border-secondary/20"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
