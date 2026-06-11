interface PlaceholderProductProps {
  label?: string;
  className?: string;
}

export default function PlaceholderProduct({ label = "Product photo — coming soon", className = "" }: PlaceholderProductProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="20" r="10" fill="#F4C430" opacity="0.4" />
          <rect x="14" y="28" width="20" height="12" rx="6" fill="#7B5EA7" opacity="0.3" />
        </svg>
      </div>
      <span className="text-sm text-muted font-body">{label}</span>
    </div>
  );
}
