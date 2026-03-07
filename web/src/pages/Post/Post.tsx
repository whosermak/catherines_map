import { useParams } from "react-router-dom"
import Post from "@/components/Post/Post"
import { useEffect, useState } from "react"
import type { PostT } from "@/types"
import BackPanel from "@/components/BackPanel/BackPanel"
import NewPost from "@/components/NewPost/NewPost"
import PostContainer, { usePostContainer } from "@/components/PostsContainer/PostsContainer"
import * as PostApi from "@/services/post"

export default function PostPage() {
    const { id } = useParams() as any
    const [post, setPost] = useState<PostT | null>(null)

    useEffect(() => {
        const load = async () => setPost(await PostApi.getPost(id))
        load()
        reset()
    }, [id])

    const {
        loadMorePosts,
        hasMorePosts,
        posts,
        delPost,
        createPost,
        reset
    } = usePostContainer(cursor => PostApi.getReplies(id, { cursor: cursor || ""}))

    if (!post) return <div>загрузка</div>

    const sendPost = (data: Record<string, any>) => {
        createPost({ ...data, parentId: post.id, rootId: post.rootId })
    }

    return (
        <div>
            <BackPanel title="Пост" hr />
            <Post post={post} />
            <NewPost defaultDate={post.time} onSend={sendPost} placeholder="Комментарий" />
            <PostContainer onLoadMore={loadMorePosts} hasMore={hasMorePosts} >
                {posts.map(post => <Post key={post.id} post={post} onDel={delPost} />)}
            </PostContainer>
        </div>
    )
}