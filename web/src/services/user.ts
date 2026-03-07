import api from "@/app/api"
import { parsePost } from "@/hooks/post"
import type { PostT } from "@/types"

type Conf = Record<string, string | number>
function parseConf(c: Conf) {
    const p = new URLSearchParams()
    for (const k in c) p.append(k, String(c[k]))
    return "?" + p.toString()
}

export const getUser = async (id: number, conf?: Conf) => {
    const res = await api.get(`/user/${id}` + (conf ? parseConf(conf) : ""))
    if (res.status === 200) return res.data.user
    return null
}

export const me = async (conf?: Conf) => {
    const res = await api.get(`/user/me` + (conf ? parseConf(conf) : ""))
    if (res.status === 200) return res.data.user
    return null
}

export const count_posts = async (id: number, conf?: Conf) => {
    const res = await api.get(`/user/${id}/count_posts` + (conf ? parseConf(conf) : ""))
    if (res.status === 200) return res.data.posts
    return 0
}

type PostsConf = {
    cursor: number | string
} & Conf

export const getPosts = async (id: number, conf?: PostsConf) => {
    const res = await api.get(`/user/${id}/posts` + (conf ? parseConf(conf) : ""))
    console.log(res)
    const posts: PostT[] = []
    let nextCursor: null | number = null

    if (res.status === 200) {
        nextCursor = res.data.nextCursor
        for (const post of res.data.posts) {
            posts.push(parsePost(post))
        }
    }

    return { posts, nextCursor }
}

export const logout = async (conf?: Conf) => {
    return await api.post("/user/logout" + (conf ? parseConf(conf) : ""))
}

export const login = async (data: { login: string, pwd: string }, conf?: Conf) => {
    const res = await api.post("/user/login"  + (conf ? parseConf(conf) : ""), { data })
    if (res.status === 200) return res.data.user
}