export default function AtlasMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="40" cy="40" rx="16" ry="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="72" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="52" x2="72" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="8" x2="40" y2="72" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
