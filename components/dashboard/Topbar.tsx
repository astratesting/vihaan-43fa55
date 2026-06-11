"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/(auth)/login/actions";
import { initials } from "@/lib/format";

interface TopbarProps {
  firstName?: string | null;
  lastName?: string | null;
  onMenuClick: () => void;
}

export default function Topbar({ firstName, lastName, onMenuClick }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const userInitials = initials(firstName, lastName);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOutAction();
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-border z-50 flex items-center px-4 lg:pl-64">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-ink hover:text-primary transition-colors mr-2"
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link href="/dashboard" className="font-heading font-extrabold text-lg text-primary lg:hidden">
        Vihaan
      </Link>

      <div className="flex-1" />

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-heading font-bold hover:bg-primary-dark transition-colors"
          aria-label="User menu"
          aria-expanded={menuOpen}
        >
          {userInitials}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-surface rounded-xl shadow-lg border border-border py-1 animate-fade-in">
            <Link
              href="/dashboard/settings"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-body text-ink hover:bg-background transition-colors"
            >
              Account settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2.5 text-sm font-body text-ink hover:bg-background transition-colors"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
