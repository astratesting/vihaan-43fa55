import { LANDING } from "@/lib/copy";

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink text-center tracking-tight">
          How it works
        </h2>
        <p className="mt-3 text-muted font-body text-center text-lg max-w-xl mx-auto">
          Three steps to a better snack routine.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {LANDING.howItWorks.map((step) => (
            <div
              key={step.step}
              className="bg-surface rounded-2xl p-6 shadow-[0_4px_24px_rgba(123,94,167,0.08)] relative"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg font-heading font-bold text-primary">{step.step}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-muted font-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
