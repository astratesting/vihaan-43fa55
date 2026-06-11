import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl p-6 shadow-[0_4px_24px_rgba(123,94,167,0.08)] ${
        hover ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
