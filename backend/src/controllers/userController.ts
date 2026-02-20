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