import { cn } from "@/lib/utils"
import { SiderLinkBtn } from "../Sider"
import { useSt } from "@/app/store"


type Props = {
    className?: string
}

export const UserBar = ({ className, ...props }: Props) => {
    const user = useSt(s => s.user)
    if (!user) return null

    return (
        <SiderLinkBtn
            to={`/user/${user.id}`}
            className={cn("flex-row", className)} 
            {...props}
        >
            <img className="w-10 h-10 rounded-md" src={user.avatar} />
            <span className="truncate">{user.name}</span>
        </SiderLinkBtn>
    )
}


