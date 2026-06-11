import Nav from "@/components/marketing/Nav";
import Hero from "@/components/marketing/Hero";
import TrustStrip from "@/components/marketing/TrustStrip";
import HowItWorks from "@/components/marketing/HowItWorks";
import ProductsPreview from "@/components/marketing/ProductsPreview";
import IngredientsBlock from "@/components/marketing/IngredientsBlock";
import PricingCards from "@/components/marketing/PricingCards";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";
import Footer from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <ProductsPreview />
        <IngredientsBlock />
        <PricingCards />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
