import type { PostT } from "@/types"
import React, { useCallback, useEffect, useRef, useState } from "react"
import * as Post from "@/services/post"

type Props = {
    children: React.ReactNode,
    onLoadMore: () => void
    hasMore?: boolean
    loader?: React.ReactNode,
    empty?: React.ReactNode
} & React.ComponentProps<"div">

const emptyDef = <div className="mt-10 w-full flex items-center justify-center text-4xl font-bold text-muted-foreground">Нет постов</div>
const loaderDef = <div>загрузка</div>

export default function PostContainer({ children, onLoadMore, hasMore = true, empty = emptyDef, loader = loaderDef, ...p }: Props) {
    const ref = useRef<HTMLDivElement | null>(null)
    const busy = useRef(false)

    useEffect(() => {
        if (!ref.current || !onLoadMore) return

        const o = new IntersectionObserver(async (e) => {
            if (!e[0].isIntersecting) return
            if (!hasMore) return
            if (busy.current) return

            busy.current = true
            await onLoadMore()
            busy.current = false
        })

        o.observe(ref.current)

        return () => o.disconnect()
    }, [hasMore, onLoadMore])

    const isEmpty = React.Children.count(children) === 0

    return (
        <div {...p}>
            {isEmpty && empty}
            {!isEmpty && children}
            {hasMore && <div ref={ref} />}
            {busy.current && loader}
        </div>
    )
}

export type PostData = { date: string, text: string, parentId?: number, rootId?: number }
type GetPostsFN = (cursor: string | null) => Promise<any>

export function usePostContainer(GetPosts: GetPostsFN ) {
    const [posts, setPosts] = useState<PostT[]>([])
    const [hasMorePosts, setHasMorePosts] = useState(true)
    const [postLoading, setPostLoading] = useState(false)
    const cursor = useRef<string | null>(null)

    const delPost = (id: number) => {
        setPosts(p => p.filter(x => x.id !== id))
        return Post.delPost(id)
    }

    const createPost = async (data: Record<string, any>) => {
        const post = await Post.createPost(data)
        if (post) {
            setPosts(v => [...v, post])
        }
        return post
    }

    const reset = () => {
        setPosts([])
        setHasMorePosts(true)
        cursor.current = null
    }

    const loadMorePosts = useCallback(async () => {
        if (postLoading || !hasMorePosts) return

        setPostLoading(true)

        const res = await GetPosts(cursor.current)
        if (typeof res !== "object" && res) return

        const { posts, nextCursor } = res
        
        setPosts(v => [...v, ...posts])
        cursor.current = nextCursor
        if (!nextCursor) setHasMorePosts(false)
        
        setPostLoading(false)
    }, [postLoading, hasMorePosts])

    return { 
        posts, 
        reset, 
        delPost, 
        createPost, 
        setPosts, 
        hasMorePosts, 
        setHasMorePosts, 
        loadMorePosts, 
        postLoading, 
        setPostLoading 
    }
}