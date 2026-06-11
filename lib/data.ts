import type { Product, PlanInfo, Ingredient } from "@/types/domain";

export const PRODUCTS: Product[] = [
  {
    sku: "gummy-bears",
    name: "Gummy Bears",
    flavor: "Fruit Punch",
    shape_emoji: "🍬",
    pieces_per_box: 60,
    price_cents: 3499,
    description:
      "Classic gummy bears with a fruity punch flavor. Each piece packs 5g prebiotic fiber, chromium, green tea extract, and vitamin D3 — sweetened with allulose and monk fruit.",
    sort_order: 0,
  },
  {
    sku: "fruit-chews",
    name: "Fruit Chews",
    flavor: "Strawberry-Watermelon",
    shape_emoji: "🍓",
    pieces_per_box: 60,
    price_cents: 3499,
    description:
      "Soft, chewy strawberry-watermelon bites. 5g prebiotic fiber per piece with chromium, green tea extract, and vitamin D3. Sweetened with allulose and monk fruit.",
    sort_order: 1,
  },
  {
    sku: "chocolate-bites",
    name: "Chocolate Bites",
    flavor: "Creamy Chocolate",
    shape_emoji: "🍫",
    pieces_per_box: 60,
    price_cents: 3499,
    description:
      "Rich, creamy chocolate bites that taste like a real treat. 5g prebiotic fiber per piece, plus chromium, green tea extract, and vitamin D3. Sweetened with allulose and monk fruit.",
    sort_order: 2,
  },
];

export const PLANS: PlanInfo[] = [
  {
    id: "starter",
    name: "Starter Kit",
    price_cents: 3999,
    interval: "one_time",
    description: "Try one flavor before committing. 60 pieces shipped once.",
    features: [
      "60 pieces",
      "1 flavor",
      "One-time purchase",
      "Free shipping",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price_cents: 3499,
    interval: "month",
    description: "Your favorite flavor, delivered every month. Cancel or pause anytime.",
    features: [
      "60 pieces",
      "1 flavor",
      "Delivered monthly",
      "Free shipping",
      "Pause or cancel anytime",
    ],
  },
  {
    id: "family",
    name: "Family Bundle",
    price_cents: 5999,
    interval: "month",
    description: "All three flavors for the whole family. 180 pieces monthly.",
    features: [
      "180 pieces",
      "All 3 flavors",
      "Delivered monthly",
      "Free shipping",
      "Pause or cancel anytime",
      "Best value",
    ],
  },
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: "prebiotic_fiber",
    display_name: "Fiber from chicory root",
    one_line_benefit: "Supports healthy digestion and helps kids feel fuller longer.",
    sort_order: 0,
  },
  {
    id: "chromium",
    display_name: "Chromium picolinate",
    one_line_benefit: "Helps support healthy blood sugar levels already in the normal range.",
    sort_order: 1,
  },
  {
    id: "green_tea",
    display_name: "Green tea extract",
    one_line_benefit: "Provides natural antioxidants that support overall wellness.",
    sort_order: 2,
  },
  {
    id: "vitamin_d3",
    display_name: "Vitamin D3",
    one_line_benefit: "Supports bone health and immune function during growing years.",
    sort_order: 3,
  },
];

export const SKU_LABELS: Record<string, string> = {
  "gummy-bears": "Gummy Bears (Fruit Punch)",
  "fruit-chews": "Fruit Chews (Strawberry-Watermelon)",
  "chocolate-bites": "Chocolate Bites (Creamy Chocolate)",
};

export const PLAN_LABELS: Record<string, string> = {
  starter: "Starter Kit",
  monthly: "Monthly Plan",
  family: "Family Bundle",
};

export function getProductBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function getPlanById(id: string): PlanInfo | undefined {
  return PLANS.find((p) => p.id === id);
}
