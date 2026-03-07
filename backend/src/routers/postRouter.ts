import { Router } from "express";
import * as Post from "../controllers/postController"
import { checkAuth, loadUser } from "../middlewares/auth";

const r = Router()

r.post("/", checkAuth, loadUser, Post.new_post)

r.get("/feed", Post.feed)

r.get("/:id/replies", Post.replies)

r.get("/:id", Post.get_post)

r.delete("/:id", checkAuth, loadUser, Post.delete_post)

export default r;