import { useSt } from "@/app/store"
import { parsePost } from "@/hooks/post"
import { cn } from "@/lib/utils"
import type { PostT, UserT } from "@/types"
import { useEffect, useState } from "react"
import { GoBookmark, GoComment, GoGitCompare, GoHeart, GoTrash } from "react-icons/go"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

type Props = {
    post: PostT,
    onDel?: (id: number) => void
} & React.ComponentProps<'a'>

const format = (d: Date) => {
    const p = d.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        timeZone: 'UTC'
    }).split(' ')

    return `${p[2]} ${p[1][0].toUpperCase() + p[1].slice(1)} ${p[0]}`
}

const Post = ({ className, onDel, post, ...props }: Props) => {
    const nav = useNavigate()
    post = parsePost(post)
    const appUser = useSt(s => s.user)
    const [author, setAuthor] = useState<UserT>()
    
    const toProfile = (id: number) => {
        nav("/user/" + id)
    }

    const deletePost = () => {
        onDel?.(post.id)
    }

    useEffect(() => {
        setAuthor(post.author || null)
    }, [author, post.authorId])

    if (!author) return <div className="h-20" />
    const stopNav = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <Link
            to={"/post/" + post.id}
            className={cn("w-full flex flex-row gap-2 border-b border-border", className)} 
            {...props}
        >
            <div className="p-2 pl-4">
                <img className="w-13 h-13 rounded-full cursor-pointer" onClick={(e) => {stopNav(e); toProfile(author.id)}} src={author.avatar} />
            </div>
            <div className="w-full flex flex-col pt-3 pr-5 pb-3">
                <span className="flex flex-row">
                    <span className="font-bold cursor-pointer" onClick={(e) => {stopNav(e); toProfile(author.id)}}>{author.name}</span>
                    <span className="pl-2 pr-1 font-extrabold text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{format(post.time)}</span>
                    { post.authorId === appUser?.id && 
                        <span className="ml-auto" onClick={(e) => {stopNav(e); deletePost()}}><GoTrash className="w-4 h-4 fill-muted-foreground cursor-pointer" /></span>
                    }
                </span>
                <span className="wrap-normal whitespace-normal mt-1">
                    {post.text}
                </span>
                <div className="w-100 mt-4 flex justify-between">
                    <GoHeart className="w-5 h-5 fill-muted-foreground cursor-pointer" />
                    <GoGitCompare className="w-5 h-5 fill-muted-foreground cursor-pointer" />
                    <GoComment className="w-5 h-5 fill-muted-foreground cursor-pointer" />
                    <GoBookmark className="w-5 h-5 fill-muted-foreground cursor-pointer" />
                </div>
            </div>
        </Link>
    )
}

export default Post