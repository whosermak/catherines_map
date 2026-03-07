import { useSt } from "@/app/store"
import PostContainer, { usePostContainer } from "@/components/PostsContainer/PostsContainer"
import Post from "@/components/Post/Post"
import NewPost from "@/components/NewPost/NewPost"
import * as PostApi from "@/services/post"

export default function Feed() {
    const user = useSt(s => s.user)
    
    const { 
        posts, 
        hasMorePosts,
        delPost,
        loadMorePosts,
        createPost
    } = usePostContainer(cursor => {
        return PostApi.getFeed({ cursor: cursor || "" })
    })

    return (
        <PostContainer hasMore={hasMorePosts} onLoadMore={loadMorePosts}>
            { user && <NewPost onSend={createPost} />}
            { posts.map(post => <Post key={post.id} onDel={delPost} post={post} />) }
        </PostContainer>
    )
}