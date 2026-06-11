"use client";

import { useState } from "react";
import { LANDING } from "@/lib/copy";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink text-center tracking-tight">
          For parents
        </h2>
        <p className="mt-3 text-muted font-body text-center text-lg max-w-xl mx-auto">
          Honest answers to the questions you&apos;re actually asking.
        </p>
        <div className="mt-12 max-w-2xl mx-auto space-y-3">
          {LANDING.faq.map((item, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-heading font-semibold text-ink">{item.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`text-muted flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-muted font-body leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted font-body">
          Always talk to your pediatrician before adding new supplements to your child&apos;s routine.
        </p>
      </div>
    </section>
  );
}
