import { Router } from "express";
import userRouter from "./userRouter.js"

const r = Router()

r.use("/user", userRouter)

export default r