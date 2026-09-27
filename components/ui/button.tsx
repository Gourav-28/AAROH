import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary: "bg-emerald text-white hover:bg-emerald-dark",
  secondary: "bg-amber text-white hover:bg-amber-dark",
  outline: "border-2 border-ink/15 text-ink hover:border-ink/30 bg-transparent",
  ghost: "text-ink hover:bg-ink/5",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-xl",
  md: "text-base px-5 py-2.5 rounded-2xl",
  lg: "text-lg px-7 py-3.5 rounded-2xl",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
