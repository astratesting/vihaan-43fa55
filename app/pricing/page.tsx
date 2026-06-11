import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import PricingFull from "@/components/marketing/PricingFull";

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24">
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-ink tracking-tight">
              Simple plans. No tricks.
            </h1>
            <p className="mt-4 text-lg text-muted font-body max-w-xl mx-auto">
              All plans ship free. Cancel or pause from your dashboard anytime.
            </p>
          </div>
        </section>
        <PricingFull />
      </main>
      <Footer />
    </>
  );
}
