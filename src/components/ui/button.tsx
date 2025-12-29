import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-display font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-playful hover:scale-105 hover:shadow-float active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:scale-105 hover:shadow-playful active:scale-95",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Playful variants
        hero: "bg-gradient-primary text-primary-foreground shadow-float hover:scale-110 hover:shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.4)] active:scale-100 text-lg px-8 py-6",
        accent: "bg-accent text-accent-foreground shadow-soft hover:scale-105 hover:shadow-playful active:scale-95",
        mint: "bg-mint text-mint-foreground shadow-soft hover:scale-105 active:scale-95",
        pink: "bg-pink text-pink-foreground shadow-soft hover:scale-105 active:scale-95",
        playful: "bg-gradient-playful text-foreground shadow-card hover:scale-105 hover:shadow-float active:scale-95",
        whatsapp: "bg-[hsl(142,70%,45%)] text-white shadow-soft hover:bg-[hsl(142,70%,40%)] hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-3xl px-12 text-lg",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
