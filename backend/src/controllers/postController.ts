import type { Request, Response } from "express";
import * as Post from "../services/postService"

export const new_post = async (req: Request, res: Response) => {
    try {
        const user = req.user
        const data = req.body.data
        if (!data || !user) return res.status(400).json({})
        
        data.authorId = user.id
        const result = await Post.new_post(data)
        if (!result) return res.status(400)
        res.status(200).json({ post: { ...result, author: user } })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}

export const get_post = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        
        const post = await Post.get_post(Number(id))
        if (!post) return res.status(404).json({})
        return res.status(200).json({ post })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}

export const replies = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as any
        let { cursor } = req.query as any
        if (cursor) cursor = Number(cursor)
        else cursor = null
        
        const { posts, nextCursor } = await Post.replies(Number(id), cursor)
        return res.status(200).json({ posts, nextCursor })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}

export const feed = async (req: Request, res: Response) => {
    try {
        let { cursor } = req.query as any
        if (cursor) cursor = Number(cursor) || null
        else cursor = null

        const { posts, nextCursor } = await Post.feed_posts(cursor)
        return res.status(200).json({ posts, nextCursor })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}


export const delete_post = async (req: Request, res: Response) => {
    try {
        let { id } = req.params as any
        id = Number(id)
        if (Number.isNaN(id)) return res.status(400).json({})
        
        const result = await Post.delete_post(id, req.user?.id as number)
        if (result) return res.status(200).json({ post: result })
        else return res.status(400).json({})
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}