import Main from "@/layouts/Main/Main";
import Feed from "@/pages/Feed/Feed";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Post from "@/pages/Post/Post";
import User from "@/pages/User/User";
import { createBrowserRouter, redirect } from "react-router-dom";

const r = createBrowserRouter([
    {
        element: <Main />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                loader: () => redirect("/feed")
            },
            {
                path: "/feed",
                element: <Feed />
            },
            {
                path: "/user/:id",
                element: <User />
            },
            {
                path: "/post/:id",
                element: <Post />
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    }
])

export default r;