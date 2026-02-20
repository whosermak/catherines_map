import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = cva(
    "h-9 gap-3 font-bold rounded-4xl transition active:scale-95 duration-300 ease-in-out pl-4 pr-4 pt-1 pb-1 cursor-pointer flex items-center disabled:pointer-events-none disabled:opacity-60",
    {
        variants: {
            variant: {
                default: "bg-popover text-foreground",
                reversed: "bg-foreground text-background",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

type Props = {
    children?: React.ReactNode
} & React.ComponentProps<'button'>
  & VariantProps<typeof variants>

export const Button = forwardRef<
    HTMLButtonElement,
    Props
>(({ className, disabled, variant = "default", children, ...props }, ref) => {
    return (
        <button
            disabled={disabled}
            ref={ref} 
            className={cn(variants({ variant }), className)} 
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"