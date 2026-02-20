import type { JWTPayload } from "."
import type { User } from "@prisma/client"

declare global {
    namespace Express {
        interface Request {
            auth?: JWTPayload | null
            user?: User
        }
    }
}