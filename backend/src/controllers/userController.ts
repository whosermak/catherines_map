import type { Request, Response } from "express";
import "dotenv/config"
import * as User from "../services/userService.js"

const isProd = process.env.NODE_ENV === "production"

export const login = async (req: Request, res: Response) => {
    try {
        const {login, pwd} = req.body.data
        const result = await User.login(login, pwd)

        if (result) {
            const { user, token } = result
            res.cookie("accessToken", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "lax",
                secure: isProd
            })
            return res.status(200).json({user})
        } else {
            return res.status(400).json()
        }
    } catch(e) {
        console.log(e)
        res.status(500).json()
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd
    })

    res.status(200).json({})
}

export const me = (req: Request, res: Response) => {
    const user = { ...req.user }
    delete user.pwd;
    res.status(200).json({ user })
}

export const find_user = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({})
        const user = await User.find_user(Number(id))
        if (!user) return res.status(404).json({})
        res.status(200).json({ user })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}

export const get_posts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { cursor } = req.query as Record<string, string>
        
        const { posts, nextCursor } = await User.get_posts_byAuthor(Number(id), 20, cursor)
        return res.status(200).json({ posts, nextCursor })
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}

export const count_posts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await User.count_posts(Number(id))
        res.status(200).json({posts: result})
    } catch(e) {
        console.log(e)
        res.status(500).json({})
    }
}