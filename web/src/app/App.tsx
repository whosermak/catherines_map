import { RouterProvider } from "react-router-dom";
import r from "./router"
import "./App.css"

export default function App() {
    return <RouterProvider router={r}/>
}