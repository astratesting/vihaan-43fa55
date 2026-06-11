interface PillProps {
  variant: "success" | "warning" | "muted";
  children: React.ReactNode;
}

export default function Pill({ variant, children }: PillProps) {
  const variants = {
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    muted: "bg-muted/10 text-muted border-muted/20",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
