export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-border/40 rounded-xl ${className}`}
      aria-hidden="true"
    />
  );
}
