import Link from "next/link";

export default function WelcomeBanner() {
  return (
    <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-heading font-bold text-ink">You&apos;re in. Let&apos;s pick your first box.</h2>
        <p className="mt-1 text-muted font-body text-sm">Choose a flavor and start your subscription.</p>
      </div>
      <Link
        href="/dashboard/products"
        className="px-5 py-2.5 rounded-full bg-accent text-white font-heading font-semibold text-sm hover:bg-accent-dark active:scale-95 transition-all whitespace-nowrap"
      >
        Choose your flavor
      </Link>
    </div>
  );
}
