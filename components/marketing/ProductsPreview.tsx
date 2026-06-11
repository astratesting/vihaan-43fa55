import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { formatMoney } from "@/lib/format";

export default function ProductsPreview() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink text-center tracking-tight">
          Three flavors, one job
        </h2>
        <p className="mt-3 text-muted font-body text-center text-lg max-w-xl mx-auto">
          Every piece delivers 5g prebiotic fiber, chromium, green tea extract, and vitamin D3.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.sku}
              className="bg-background rounded-2xl p-6 shadow-[0_4px_24px_rgba(123,94,167,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                <span className="text-5xl">{product.shape_emoji}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-ink">{product.name}</h3>
              <p className="text-sm text-muted font-body">{product.flavor}</p>
              <p className="mt-2 text-sm text-muted font-body">
                5g prebiotic fiber &middot; {product.pieces_per_box} pieces
              </p>
              <p className="mt-2 text-lg font-heading font-bold text-ink">
                From {formatMoney(product.price_cents)}/mo
              </p>
              <Link
                href={`/signup?sku=${product.sku}`}
                className="mt-4 inline-flex items-center justify-center w-full px-5 py-2.5 rounded-full bg-accent text-white font-heading font-semibold text-sm hover:bg-accent-dark active:scale-95 transition-all"
              >
                Add to plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
