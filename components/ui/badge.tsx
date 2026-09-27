import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "emerald" | "amber" | "slate" | "neutral";

const toneStyles: Record<Tone, string> = {
  emerald: "bg-emerald-light text-emerald-dark",
  amber: "bg-amber-light text-amber-dark",
  slate: "bg-slateblue-light text-slateblue-dark",
  neutral: "bg-ink/5 text-ink/70",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
