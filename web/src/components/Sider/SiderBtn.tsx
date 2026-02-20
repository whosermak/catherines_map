import type { ButtonHTMLAttributes, ReactNode } from "react"

type Props = {
    children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function SiderBtn({ children, ...props }: Props) {
    return (
        <button {...props} className="w-full gap-3 font-bold rounded-2xl transition active:scale-95 hover:bg-popover duration-300 ease-in-out p-3 cursor-pointer flex items-center pl-4 text-xl">
            {children}
        </button>
    )
}