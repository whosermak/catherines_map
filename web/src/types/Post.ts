import type { UserT } from "./User"

export type PostT = {
    id: number,
    text: string,
    authorId: number,
    time: Date,
    author: UserT,
    parentId?: number,
    rootId?: number
}