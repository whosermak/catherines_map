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

export const me = () => {

}