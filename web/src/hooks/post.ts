import type { PostT } from "@/types";

export const parsePost = (post: Record<string, any>): PostT => {
    if (typeof post.time === "string") post.time = new Date(post.time)

    return post as PostT
}

