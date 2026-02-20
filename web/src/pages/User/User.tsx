import "./User.css"
import { useParams } from "react-router-dom"

export default function User() {
    const { id } = useParams()
    return (
        <h1>юзер {id}</h1>
    )
}