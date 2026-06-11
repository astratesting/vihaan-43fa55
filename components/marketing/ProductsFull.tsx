"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { formatMoney } from "@/lib/format";

const details: Record<string, { ingredients: string[]; nutrition: string[]; shipping: string; returns: string }> = {
  "gummy-bears": {
    ingredients: ["Chicory root fiber (prebiotic)", "Allulose", "Monk fruit extract", "Natural fruit punch flavor", "Chromium picolinate", "Green tea extract", "Vitamin D3", "Pectin", "Citric acid", "Coconut oil"],
    nutrition: ["Calories: 25", "Total Carbs: 6g", "Dietary Fiber: 5g", "Total Sugars: 0g", "Added Sugars: 0g", "Vitamin D3: 10mcg", "Chromium: 35mcg"],
    shipping: "Free standard shipping. Orders ship within 1-2 business days. Delivery in 3-5 business days.",
    returns: "30-day money-back guarantee on your first order. If the box comes back more than half full, email us for a full refund.",
  },
  "fruit-chews": {
    ingredients: ["Chicory root fiber (prebiotic)", "Allulose", "Monk fruit extract", "Natural strawberry-watermelon flavor", "Chromium picolinate", "Green tea extract", "Vitamin D3", "Pectin", "Citric acid", "Coconut oil"],
    nutrition: ["Calories: 25", "Total Carbs: 6g", "Dietary Fiber: 5g", "Total Sugars: 0g", "Added Sugars: 0g", "Vitamin D3: 10mcg", "Chromium: 35mcg"],
    shipping: "Free standard shipping. Orders ship within 1-2 business days. Delivery in 3-5 business days.",
    returns: "30-day money-back guarantee on your first order. If the box comes back more than half full, email us for a full refund.",
  },
  "chocolate-bites": {
    ingredients: ["Chicory root fiber (prebiotic)", "Allulose", "Monk fruit extract", "Cocoa powder", "Chromium picolinate", "Green tea extract", "Vitamin D3", "Coconut oil", "Natural vanilla flavor", "Sea salt"],
    nutrition: ["Calories: 30", "Total Carbs: 6g", "Dietary Fiber: 5g", "Total Sugars: 0g", "Added Sugars: 0g", "Vitamin D3: 10mcg", "Chromium: 35mcg"],
    shipping: "Free standard shipping. Orders ship within 1-2 business days. Delivery in 3-5 business days.",
    returns: "30-day money-back guarantee on your first order. If the box comes back more than half full, email us for a full refund.",
  },
};

export default function ProductsFull() {
  const [openAccordions, setOpenAccordions] = useState<Record<string, string | null>>({});

  function toggleAccordion(sku: string, section: string) {
    setOpenAccordions((prev) => ({
      ...prev,
      [sku]: prev[sku] === section ? null : section,
    }));
  }

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const detail = details[product.sku];
            const openSection = openAccordions[product.sku];

            return (
              <div key={product.sku} className="bg-background rounded-2xl p-6 border border-border">
                <div className="w-full aspect-square max-w-[160px] mx-auto rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                  <span className="text-5xl">{product.shape_emoji}</span>
                </div>
                <h2 className="text-xl font-heading font-bold text-ink">{product.name}</h2>
                <p className="text-sm text-muted font-body">{product.flavor}</p>
                <p className="mt-1 text-sm text-muted font-body">
                  5g prebiotic fiber &middot; {product.pieces_per_box} pieces
                </p>
                <p className="text-sm text-muted font-body mt-1">{product.description}</p>
                <p className="mt-3 text-lg font-heading font-bold text-ink">
                  From {formatMoney(product.price_cents)}/mo
                </p>

                {/* Accordion sections */}
                <div className="mt-4 space-y-2">
                  {(["ingredients", "nutrition", "shipping", "returns"] as const).map((section) => (
                    <div key={section} className="border border-border rounded-xl overflow-hidden">
                      <button
                        className="w-full px-4 py-3 text-left text-sm font-heading font-semibold text-ink flex items-center justify-between"
                        onClick={() => toggleAccordion(product.sku, section)}
                        aria-expanded={openSection === section}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className={`text-muted transition-transform ${openSection === section ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {openSection === section && (
                        <div className="px-4 pb-3 animate-fade-in">
                          {section === "ingredients" && (
                            <ul className="text-sm text-muted font-body space-y-1">
                              {detail.ingredients.map((i) => <li key={i}>{i}</li>)}
                            </ul>
                          )}
                          {section === "nutrition" && (
                            <ul className="text-sm text-muted font-body space-y-1">
                              {detail.nutrition.map((n) => <li key={n}>{n}</li>)}
                            </ul>
                          )}
                          {section === "shipping" && (
                            <p className="text-sm text-muted font-body">{detail.shipping}</p>
                          )}
                          {section === "returns" && (
                            <p className="text-sm text-muted font-body">{detail.returns}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/signup?sku=${product.sku}`}
                  className="mt-6 inline-flex items-center justify-center w-full px-5 py-2.5 rounded-full bg-accent text-white font-heading font-semibold text-sm hover:bg-accent-dark active:scale-95 transition-all"
                >
                  Get started
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
