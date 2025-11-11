import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="relative inline-block">
    <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] p-[2px]">
      <div className="h-full w-full bg-background rounded-sm" />
    </div>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer relative h-5 w-5 shrink-0 rounded-sm bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-10",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-3 w-3 text-primary" strokeWidth={5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
