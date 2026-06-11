"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function DangerZone() {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        toast(data.error || "Failed to delete account.", "error");
        setLoading(false);
        return;
      }
      // Sign out client-side
      const { createClient } = await import("@/lib/supabase/client");
      await createClient().auth.signOut();
      router.push("/");
    } catch {
      toast("Something went wrong.", "error");
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="border-t-2 border-t-danger/30">
        <h2 className="text-lg font-heading font-bold text-danger mb-2">Danger zone</h2>
        <p className="text-sm text-muted font-body mb-4">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
          Delete account
        </Button>
      </Card>

      <Modal open={showModal} onClose={() => { setShowModal(false); setConfirmText(""); }} title="Delete account?">
        <p className="text-muted font-body mb-2">
          This will permanently delete your account, subscription, order history, and all data.
        </p>
        <p className="text-muted font-body mb-4">
          Type <strong className="text-ink">DELETE</strong> to confirm.
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink font-body text-base focus:outline-none focus:ring-2 focus:ring-danger/30 focus:border-danger transition-colors mb-4"
        />
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => { setShowModal(false); setConfirmText(""); }}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            disabled={confirmText !== "DELETE" || loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete my account"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
