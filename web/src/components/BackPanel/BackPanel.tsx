import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

type Props = {
    title: React.ReactNode
    hr?: boolean
}

export default function BackPanel({ title, hr }: Props) {
    const nav = useNavigate()

    let className = "w-full h-auto px-5 py-2 flex items-center"
    if (hr) {
        className += " border-b border-border"
    }
    
    return (
        <div className={className}>
            <button className="cursor-pointer mr-7" onClick={() => nav(-1)}>
                <GoArrowLeft className="w-6 h-6 stroke-1" />
            </button>
            <span className="flex-1 min-w-0 text-2xl truncate font-bold">{title}</span>
        </div>
    )
}