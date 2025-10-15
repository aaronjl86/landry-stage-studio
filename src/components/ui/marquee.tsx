import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 2,
}: MarqueeProps) {
  return (
    	<div
        className={cn(
          "group flex overflow-hidden [--duration:40s] [--gap:1rem]",
          className
        )}
      >
        <div
          className={cn(
            "flex w-max items-center gap-[var(--gap)] animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <div key={i} className="flex items-center gap-[var(--gap)]" aria-hidden={i > 0 ? true : undefined}>
              {children}
            </div>
          ))}
        </div>
      </div>
  );
}
