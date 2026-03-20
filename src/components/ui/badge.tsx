import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-white",
        high: "border-transparent bg-red-500/20 text-red-400 border-red-500/30",
        medium: "border-transparent bg-amber-500/20 text-amber-400 border-amber-500/30",
        low: "border-transparent bg-blue-400/20 text-blue-400 border-blue-400/30",
        none: "border-transparent bg-green-500/20 text-green-400 border-green-500/30",
        resolved: "border-transparent bg-green-500/20 text-green-400 border-green-500/30",
        pending: "border-transparent bg-amber-500/20 text-amber-400 border-amber-500/30",
        escalated: "border-transparent bg-red-500/20 text-red-400 border-red-500/30",
        pii: "border-transparent bg-red-500/15 text-red-400",
        financial: "border-transparent bg-orange-500/15 text-orange-400",
        health: "border-transparent bg-purple-500/15 text-purple-400",
        public: "border-transparent bg-green-500/15 text-green-400",
        confidential: "border-transparent bg-yellow-500/15 text-yellow-400",
        hr: "border-transparent bg-pink-500/15 text-pink-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
