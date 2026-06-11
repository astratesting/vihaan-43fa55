import { INGREDIENTS } from "@/lib/data";
import { LANDING } from "@/lib/copy";

export default function IngredientsBlock() {
  return (
    <section className="py-24 md:py-32 bg-secondary/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink text-center tracking-tight">
          What&apos;s inside
        </h2>
        <p className="mt-3 text-muted font-body text-center text-lg max-w-xl mx-auto">
          Every ingredient has a plain-English explanation.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-ink mb-6">What we use</h3>
            <div className="space-y-4">
              {INGREDIENTS.map((ing) => (
                <div key={ing.id} className="bg-surface rounded-xl p-4 border border-border">
                  <h4 className="font-heading font-semibold text-ink">{ing.display_name}</h4>
                  <p className="mt-1 text-sm text-muted font-body">{ing.one_line_benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-ink mb-6">{LANDING.ingredients.rightTitle}</h3>
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <ul className="space-y-3">
                {LANDING.ingredients.dontUse.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink font-body">
                    <span className="w-6 h-6 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D85B5B" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
