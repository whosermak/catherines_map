import "dotenv/config"
import type { NextFunction, Request, Response } from "express"
import type { JWTPayload } from "../types"
import jwt from "jsonwebtoken"
import db from "../db"

function verifyToken(token: string, secret: string): JWTPayload | null {
    try {
        const d = jwt.verify(token, secret)
        if (typeof d === "string") return null
        return d as JWTPayload
    } catch(e) {
        return null
    }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
    const secret = process.env.ACCESS_SECRET
    if (!token || !secret) return next()
    
    req.auth = verifyToken(token, secret)
    next()
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) return res.status(401).json({})
    return next()
}

export const loadUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id = req.auth?.id
        if (!id) return res.status(401).json({})
        
        const user = await db.user.findUnique({ where: { id }})
        if (!user) return res.status(401).json({})
        req.user = user
        next()
    } catch(e) {
        res.status(401).json({})
    }
}