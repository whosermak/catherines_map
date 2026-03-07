import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { Link, type LinkProps } from "react-router-dom"


type ButtonProps = {
    children?: ReactNode
} & React.ComponentProps<'button'>


export function SiderBtn({ children, className, ...props }: ButtonProps) {
    return (
        <button {...props} className={cn("w-full gap-3 font-bold rounded-2xl transition active:scale-95 hover:bg-popover duration-300 ease-in-out p-3 cursor-pointer flex items-center pl-4 text-xl", className)}>
            {children}
        </button>
    )
}


type LinkBtnProps = {
    children?: ReactNode
} & React.ComponentProps<'a'>
  & LinkProps

export function SiderLinkBtn({ children, className, to, ...props }: LinkBtnProps) {
    return (
        <Link to={to} {...props} className={cn("w-full gap-3 font-bold rounded-2xl transition active:scale-95 hover:bg-popover duration-300 ease-in-out p-3 cursor-pointer flex items-center pl-4 text-xl", className)}>
            {children}
        </Link>
    )
}