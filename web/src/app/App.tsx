import { RouterProvider } from "react-router-dom";
import r from "./router"
import "./App.css"
import { useEffect } from "react";
import { useSt } from "./store";
import * as UserApi from "@/services/user"

export default function App() {
    const setUser = useSt(s => s.setUser)

    useEffect(() => {
        const loadUser = async () => setUser(await UserApi.me())
        loadUser()
    }, [])

    return <RouterProvider router={r}/>
}