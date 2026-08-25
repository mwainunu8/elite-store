import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        elite: "bg-gradient-to-r from-[hsl(217,91%,20%)] to-[hsl(217,91%,35%)] text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg",
        accent: "bg-gradient-to-r from-[hsl(187,100%,42%)] to-[hsl(187,100%,55%)] text-[hsl(222,47%,11%)] font-semibold hover:opacity-90 shadow-lg",
        gold: "bg-gradient-to-r from-[hsl(45,93%,47%)] to-[hsl(35,91%,55%)] text-[hsl(222,47%,11%)] font-semibold hover:opacity-90 shadow-md",
        whatsapp: "bg-[hsl(142,70%,45%)] text-primary-foreground hover:bg-[hsl(142,70%,40%)] shadow-md",
        hero: "bg-primary text-primary-foreground font-semibold text-base px-8 py-6 hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        heroOutline: "border-2 border-primary-foreground/30 bg-transparent text-primary-foreground font-semibold text-base px-8 py-6 hover:bg-primary-foreground/10 hover:border-primary-foreground/50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
