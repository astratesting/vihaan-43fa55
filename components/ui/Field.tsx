import { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  hint?: string;
}

export default function Field({ label, htmlFor, error, children, hint }: FieldProps) {
  return (
    <div className="w-full">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink mb-1.5 font-body">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
