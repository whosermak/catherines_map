import db from "../db"

const toDate = (d: string) => {
    const [y, m, day] = d.split("-").map(Number) as [number, number, number]
    return new Date(Date.UTC(y, m - 1, day))
}

export const new_post = async (data: { authorId: number, date: string, text: string, parentId: number | null }) => {
    const res = await db.post.create({
        data: {
            text: data.text,
            time: toDate(data.date),
            authorId: data.authorId,
            parentId: data.parentId,
        }
    })

    return res
}

export const get_post = async (id: number) => {
    const post = await db.post.findUnique({ where: { id }})
    if (!post) return null

    const author = await db.user.findUnique({ where: { id: post.authorId }})
    return { ...post, author }
}

export const replies = async (rootId: number, cursor?: number, limit = 20) => {
    const posts = await db.post.findMany({
        take: limit,
        where: {
            parentId: rootId
        },
        orderBy: [
            { time: 'desc' },
            { id: 'desc' }
        ],
        ...(cursor && {
            cursor: { id: cursor },
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

export const feed_posts = async (cursor?: number, limit = 20) => {
    const posts = await db.post.findMany({
        take: limit,
        where: { parentId: null },
        orderBy: [
            { time: "desc" },
            { id: "desc" }
        ],
        ...(cursor && {
            cursor: { id: cursor },
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

export const delete_post = async (id: number, authorId: number) => {
    const post = await get_post(id)
    if (!post) return null
    if (post.authorId !== authorId) return null
    await db.post.delete({ where: { id }})
    return post
}