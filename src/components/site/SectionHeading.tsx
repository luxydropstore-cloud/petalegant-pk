import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LeafDivider } from "./Leaf";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="mt-3 text-4xl text-primary-deep md:text-5xl">{title}</Tag>
      {align === "center" && <LeafDivider className="mt-5" />}
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}
