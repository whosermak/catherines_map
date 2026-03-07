import api from "@/app/api";
import { parsePost } from "@/hooks/post";
import type { PostT } from "@/types";

type Conf = Record<string, string | number>

function parseConf(c: Conf) {
    const p = new URLSearchParams()
    for (const k in c) p.append(k, String(c[k]))
    return "?" + p.toString()
}

export const getPost = async (id: number, conf?: Conf) => {
    const res = await api.get(`/post/${id}` + (conf ? parseConf(conf) : ""))
    if (res.status !== 200) return null
    return parsePost(res.data.post)
}

export const delPost = async (id: number, conf?: Conf) => {
    const res = await api.delete(`/post/${id}` + (conf ? parseConf(conf) : ""))
    if (res.status === 200) return parsePost(res.data.post)
}

export const createPost = async (data: Record<string, any>, conf?: Conf) => {
    const res = await api.post(`/post` + (conf ? parseConf(conf) : ""), { data })
    if (res.status === 200) return parsePost(res.data.post)
}

type RepliesConf = {
    cursor: number | string
} & Conf

export const getReplies = async (id: number, conf?: RepliesConf) => {
    const res = await api.get(`/post/${id}/replies` + (conf ? parseConf(conf) : ""))
    const posts = []
    let nextCursor = null

    if (res.status === 200) {
        nextCursor = res.data.nextCursor
        for (const post of res.data.posts) {
            posts.push(parsePost(post))
        }
    }

    return { posts, nextCursor }
}


type FeedConf = {
    cursor: number | string
} & Conf

export const getFeed = async (conf: FeedConf) => {
    const res = await api.get(`/post/feed` + (conf ? parseConf(conf) : ""))
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