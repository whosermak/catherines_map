import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Link, type LinkProps } from "react-router-dom"

import { cn } from "@/lib/utils"

const ButtonVariants = cva(
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

type ButtonProps = {
    children?: React.ReactNode
} & React.ComponentProps<'button'>
  & VariantProps<typeof ButtonVariants>

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({ className, disabled, variant = "default", children, ...props }, ref) => {
    return (
        <button
            disabled={disabled}
            ref={ref} 
            className={cn(ButtonVariants({ variant }), className)} 
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"




const LinkVariants = cva(
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


type Link_props = {
    children?: React.ReactNode
} & LinkProps
  & React.ComponentProps<'a'>
  & VariantProps<typeof LinkVariants>

export const LinkBtn = forwardRef<
    HTMLAnchorElement,
    Link_props
>(({ children, className, ...props }, ref) => {
    return (
        <Link
            ref={ref}
            className={cn(LinkVariants)}
            {...props}
        >
            {children}
        </Link>
    )
})

Link.displayName = "Link"