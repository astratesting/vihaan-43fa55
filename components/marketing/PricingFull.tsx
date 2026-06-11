import Link from "next/link";
import { PLANS } from "@/lib/data";
import { formatMoney } from "@/lib/format";

const comparisonRows = [
  { label: "Pieces", starter: "60", monthly: "60", family: "180" },
  { label: "Flavors", starter: "1", monthly: "1", family: "All 3" },
  { label: "Frequency", starter: "One-time", monthly: "Monthly", family: "Monthly" },
  { label: "Free shipping", starter: "Yes", monthly: "Yes", family: "Yes" },
  { label: "Pause anytime", starter: "N/A", monthly: "Yes", family: "Yes" },
  { label: "Best for", starter: "Trying it out", monthly: "Regular use", family: "Families" },
];

export default function PricingFull() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {PLANS.map((plan) => {
            const isPopular = plan.id === "monthly";
            return (
              <div
                key={plan.id}
                className={`bg-background rounded-2xl p-6 shadow-[0_4px_24px_rgba(123,94,167,0.08)] relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isPopular ? "border-2 border-primary ring-2 ring-primary/10" : "border border-border"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-ink text-xs font-heading font-bold">
                    Most popular
                  </div>
                )}
                <h3 className="text-xl font-heading font-bold text-ink">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted font-body">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-heading font-extrabold text-ink">
                    {formatMoney(plan.price_cents)}
                  </span>
                  {plan.interval === "month" && (
                    <span className="text-muted font-body">/mo</span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-ink">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5BB97A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/signup?plan=${plan.id}`}
                  className={`mt-6 inline-flex items-center justify-center w-full px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all ${
                    isPopular
                      ? "bg-accent text-white hover:bg-accent-dark active:scale-95"
                      : "border-2 border-primary text-primary hover:bg-primary/5 active:scale-95"
                  }`}
                >
                  {plan.id === "starter" ? "Try it" : plan.id === "monthly" ? "Start monthly" : "Start family"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-ink text-center mb-8">Compare plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body border border-border rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-background">
                  <th className="text-left px-6 py-4 font-heading font-semibold text-ink"></th>
                  <th className="text-center px-6 py-4 font-heading font-semibold text-ink">Starter Kit</th>
                  <th className="text-center px-6 py-4 font-heading font-semibold text-primary">Monthly Plan</th>
                  <th className="text-center px-6 py-4 font-heading font-semibold text-ink">Family Bundle</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-surface" : "bg-background"}>
                    <td className="px-6 py-3 text-ink font-medium">{row.label}</td>
                    <td className="px-6 py-3 text-center text-muted">{row.starter}</td>
                    <td className="px-6 py-3 text-center text-ink font-medium">{row.monthly}</td>
                    <td className="px-6 py-3 text-center text-muted">{row.family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
