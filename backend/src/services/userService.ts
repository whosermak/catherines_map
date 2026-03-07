import db from "../db.js"
import "dotenv/config"
import jwt from "jsonwebtoken"

export const login = async (login: string, pwd: string) => {
    const user = await db.user.findUnique({where: {login}})
    if (!user) return null
    if (user.pwd !== pwd) return null

    const token = jwt.sign({id: user.id}, process.env.ACCESS_SECRET as string, { expiresIn: '7d' })

    return { user, token }
}

export const find_user = async (id: number) => {
    let user = await db.user.findUnique({ where: { id }}) as any
    
    if (user) {
        delete user.pwd
        return user
    }
    return null
}

export const get_posts_byAuthor = async (authorId: number, limit = 20, cursor?: string) => {
    const posts = await db.post.findMany({
        where: { authorId, parentId: null },
        take: limit,
        orderBy: [
            { time: "desc" }
        ],
        ...(cursor && {
            cursor: { id: Number(cursor) },
            skip: 1
        })
    }) as any

    for (const post of posts) {
        post.author = await db.user.findUnique({ where: { id: post.authorId }})
    }

    const nextCursor = 
        posts.length === limit
            ? posts[posts.length - 1]?.id
            : null

    return { posts, nextCursor }
}

export const count_posts = async (id: number) => {
    const posts = await db.post.count({ where: { authorId: id }})
    return posts
}