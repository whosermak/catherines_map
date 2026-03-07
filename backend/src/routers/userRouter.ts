import { Router } from "express";
import * as User from "../controllers/userController.js"
import { checkAuth, loadUser } from "../middlewares/auth.js";

const r = Router()

r.post("/login", User.login)

r.post("/logout", User.logout)

r.get("/me", checkAuth, loadUser, User.me)

r.get("/:id/posts", User.get_posts)

r.get("/:id/count_posts", User.count_posts)

r.get("/:id", User.find_user)

export default r