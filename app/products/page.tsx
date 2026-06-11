import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ProductsFull from "@/components/marketing/ProductsFull";

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24">
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-ink tracking-tight">
              Three flavors, one job.
            </h1>
            <p className="mt-4 text-lg text-muted font-body max-w-xl mx-auto">
              Every piece delivers 5g prebiotic fiber, chromium, green tea extract, and vitamin D3. Sweetened with allulose and monk fruit.
            </p>
          </div>
        </section>
        <ProductsFull />
      </main>
      <Footer />
    </>
  );
}
