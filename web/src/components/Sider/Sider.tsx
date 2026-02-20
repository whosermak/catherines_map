import type { ReactNode } from "react";


type Props = {
    width?: string,
    children?: ReactNode
}

export default function Sidebar({ width = "300px", children }: Props) {
    return (
        <aside style={{ width: width }} className="p-2 gap-2 pt-6 h-full flex flex-col items-center">
            { children }
        </aside>
    )
}