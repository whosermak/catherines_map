import express from "express"
import cors from "cors"
import apiRouter from "./routers/apiRouter.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api", apiRouter)

export default app