import NewPost from "@/components/NewPost/NewPost"
import "./Feed.css"
import { useSt } from "@/app/store"

export default function Feed() {
    const user = useSt(s => s.user)

    return (
        <div>
            { !user && <NewPost />}
        </div>
    )
}