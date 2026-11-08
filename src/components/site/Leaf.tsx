import { cn } from "@/lib/utils";

/** Tiny botanical accent — the only place green appears in the UI. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("inline-block h-4 w-4 text-leaf", className)}
      fill="currentColor"
    >
      <path d="M20.5 3.5c-7.8.2-13.6 3.3-15.4 9.1-.7 2.2-.5 4.3.3 6.1-.9.8-1.6 1.6-2.1 2.4l1.2.9c.5-.7 1.1-1.4 1.8-2.1 1.6 1 3.7 1.3 5.9.6 5.8-1.8 8.6-7.6 8.3-17Zm-3.4 4.1c-3.2 2.1-6.2 4.9-8.8 8.1l-1-.8c2.7-3.3 5.8-6.2 9.1-8.4l.7 1.1Z" />
    </svg>
  );
}

export function LeafDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-10 bg-primary/30" />
      <Leaf className="h-3.5 w-3.5" />
      <span className="h-px w-10 bg-primary/30" />
    </div>
  );
}
