import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva(
    "base classes",
)

type Props = {
    
} & ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof variants>


export const Button = forwardRef<
    HTMLButtonElement,
    Props
>(({ className, children, ...props }, ref) => {
    return (
        <button ref={ref} className={cn(variants(), className)} {...props}>
            {children}
        </button>
    )
})

Button.displayName = "Button"