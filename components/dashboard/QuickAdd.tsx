"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function QuickAdd() {
  const [showNotify, setShowNotify] = useState(false);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/dashboard/products">
          <Card hover className="h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-ink">Add to your next box</h3>
                <p className="text-sm text-muted font-body">Swap flavors or try something new.</p>
              </div>
            </div>
          </Card>
        </Link>

        <Card hover className="h-full cursor-pointer" onClick={() => setShowNotify(true)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-ink">Refer a family</h3>
              <p className="text-sm text-muted font-body">Referrals are coming soon.</p>
            </div>
          </div>
        </Card>
      </div>

      <Modal open={showNotify} onClose={() => setShowNotify(false)} title="Referrals coming soon">
        <p className="text-muted font-body mb-4">
          We&apos;ll let you know when referrals launch. No spam, promise.
        </p>
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setShowNotify(false)}>Got it</Button>
        </div>
      </Modal>
    </>
  );
}
