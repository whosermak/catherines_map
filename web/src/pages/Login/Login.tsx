import { Button } from "@/components/Button/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSt } from "@/app/store"
import * as UserApi from "@/services/user"

export default function Login() {
    const [login, setLogin] = useState("")
    const [pwd, setPwd] = useState("")
    const setUser = useSt(s => s.setUser)

    const nav = useNavigate()

    const sub = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if (!login || !pwd) return

        const user = await UserApi.login({ login, pwd })
        setUser(user)
        
        if (user) nav("/feed", { replace: true })
    }

    const inpClassname = "bg-popover p-2 rounded-xl w-100 focus:outline-0"
    
    return (
        <form onSubmit={sub} className="flex flex-col gap-3 p-5">
            <input className={inpClassname} placeholder="Логин" name="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className={inpClassname} placeholder="Пароль" name="password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            <Button type="submit" className="w-20">Войти</Button>
        </form>
    )
}