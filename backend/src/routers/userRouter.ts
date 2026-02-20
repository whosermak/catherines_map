import { Router } from "express";
import * as User from "../controllers/userController.js"

const r = Router()

r.post("/login", User.login)

r.post("/logout", User.logout)

export default r