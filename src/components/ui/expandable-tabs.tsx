import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Tab {
  title: string;
  icon: LucideIcon;
  path: string;
  type?: never;
  onClick?: () => void;
}

export interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  path?: never;
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  activeColor?: string;
  className?: string;
}

export function ExpandableTabs({
  tabs,
  activeColor = "text-primary",
  className,
}: ExpandableTabsProps) {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="h-8 w-px bg-border mx-1"
            />
          );
        }

        // Type guard - TypeScript now knows item is a Tab
        const tab = item as Tab;
        const Icon = tab.icon;
        const active = isActive(tab.path);
        const hovered = hoveredIndex === index;

        const handleClick = (e: React.MouseEvent) => {
          if (tab.onClick) {
            e.preventDefault();
            tab.onClick();
          }
        };

        return (
          <Link
            key={tab.path || index}
            to={tab.path}
            onClick={handleClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-muted/50",
              active && "bg-muted",
              active ? activeColor : "text-muted-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                hovered && "scale-110"
              )}
            />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-200",
                (active || hovered) ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
              )}
            >
              {tab.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
