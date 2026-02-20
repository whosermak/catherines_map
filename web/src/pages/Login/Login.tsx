import "./Login.css"
import api from "@/app/api"
import { Button } from "@/components/Button/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [login, setLogin] = useState("")
    const [pwd, setPwd] = useState("")
    const nav = useNavigate()

    const sub = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (!login || !pwd) return

        const res = await api.post("/user/login", { data: {login, pwd} })

        if (res.status === 200) {
            nav("/feed", { replace: true })
        }
        console.log(res)
    }

    const inpClassname = "bg-popover p-2 rounded-xl w-100 focus:outline-0"
    
    return (
        <div>
            <form onSubmit={sub} className="flex flex-col gap-3 p-5">
                <input className={inpClassname} placeholder="Логин" name="login" value={login} onChange={e => setLogin(e.target.value)} />
                <input className={inpClassname} placeholder="Пароль" name="password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
                <Button type="submit" className="w-20">Войти</Button>
            </form>
        </div>
    )
}