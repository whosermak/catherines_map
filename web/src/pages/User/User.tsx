import { useSt } from "@/app/store";
import { Button } from "@/components/Button";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiderHr } from "@/components/Sider";
import NewPost from "@/components/NewPost/NewPost";
import { useEffect, useState } from "react";
import type { UserT } from "@/types";
import Post from "@/components/Post/Post";
import * as UserApi from "@/services/user"
import PostContainer, { usePostContainer } from "@/components/PostsContainer/PostsContainer";
import BackPanel from "@/components/BackPanel/BackPanel";

export default function User() {
    const { id } = useParams() as any
    const appUser = useSt(s => s.user)
    
    const [user, setUser] = useState<UserT | null>(null)
    const [post_count, setPost_count] = useState(0)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        (async () => {
            setLoading(true)
            reset()
            setPost_count(await UserApi.count_posts(id))
            setUser(await UserApi.getUser(id))
            setLoading(false)
        })()
    }, [id])


    const {
        posts,
        delPost,
        createPost,
        hasMorePosts,
        loadMorePosts,
        reset
    } = usePostContainer(async (cursor: string | null) => await UserApi.getPosts(id, { cursor: cursor || ""}))


    if (loading) return <span>Загрузка...</span>
    if (!user) return <span>Пользователь не найден</span>

    const profile = appUser?.id === user.id
    return (
        <div className="w-full flex flex-col h-full">
            <BackPanel title={user.name} />
            <div className="w-full h-full overflow-y-auto">
                <div className="w-full">
                    <div className="w-full overflow-hidden h-60 flex justify-center items-center">
                        <img src="/banner.jpg" />
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full flex items-center relative justify-between">
                        <img src={user.avatar} className="rounded-full -mt-16 z-2 w-35 ml-10 border-5 border-background " />
                        { !profile && <Button variant="reversed" className="mr-5">Подписаться</Button> }
                        { profile && <span className="text-lg font-bold mr-5">Ваш аккаунт</span>}
                    </div>
                    <div className="w-full mt-4">
                        <span className="text-3xl font-bold ml-12">{user.name}</span>
                    </div>
                    <div className="w-full px-12 mt-2">
                        <span className="break-all whitespace-normal text-lg block">{user.desc}</span>
                    </div>
                    <div className="w-full mt-5 flex gap-5 pl-12 text-lg">
                        <span className="flex gap-2">
                            <span className="font-bold">67</span>
                            <span className="text-muted-foreground">подписчиков</span>
                        </span>
                        <span className="flex gap-2">
                            <span className="font-bold">{post_count}</span>
                            <span className="text-muted-foreground">постс</span>
                        </span>
                    </div>
                </div>
                <div className="w-full">
                    <Tabs defaultValue="posts" className="w-full">
                        <TabsList variant="line" className="mx-11 mt-3 mb-1">
                            <TabsTrigger value="posts" className="text-lg cursor-pointer">Posts</TabsTrigger>
                        </TabsList>
                        <SiderHr  />
                        <TabsContent className="h-full flex flex-col" value="posts">
                            { profile && <NewPost onSend={createPost} /> }
                            <PostContainer hasMore={hasMorePosts} onLoadMore={loadMorePosts}>
                                {posts.map(post => <Post key={post.id} onDel={delPost} post={post} />)}
                            </PostContainer>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}