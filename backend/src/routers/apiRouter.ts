import { Router } from "express";
import userRouter from "./userRouter.js"
import postRouter from "./postRouter.js"
import { checkAuth, loadUser } from "../middlewares/auth.js";

const r = Router()

r.use("/user", userRouter)
r.use("/post", postRouter)

export default r