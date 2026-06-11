"use client";

import { useState } from "react";
import Link from "next/link";
import { LANDING } from "@/lib/copy";
import AtlasMark from "@/components/illustrations/AtlasMark";
import { isEmail } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!isEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast("Thanks — we'll be in touch.");
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading font-extrabold text-2xl text-white">
              Vihaan
            </Link>
            <p className="mt-3 text-sm text-white/60 font-body">{LANDING.footer.tagline}</p>
            <AtlasMark className="w-10 h-10 text-white/20 mt-4" />
          </div>

          {Object.entries(LANDING.footer.columns).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-heading font-semibold text-white/80 mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-heading font-semibold text-white/80 mb-3">Newsletter</h3>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 rounded-xl bg-white/10 text-white placeholder:text-white/40 text-sm font-body border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Newsletter email"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-heading font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
              {error && <p className="text-xs text-danger" role="alert">{error}</p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-body">&copy; {new Date().getFullYear()} Vihaan. All rights reserved.</p>
          <p className="text-sm text-white/40 font-body">Made for families.</p>
        </div>
      </div>
    </footer>
  );
}
