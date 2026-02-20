import "./Main.css"
import Sidebar from "@/components/Sider/Sider"
import { GoBell, GoBookmark, GoHomeFill, GoKebabHorizontal, GoMail, GoSearch, GoSignIn, GoX } from "react-icons/go";
import SiderBtn from "@/components/Sider/SiderBtn";
import SiderHr from "@/components/Sider/SiderHr";
import { Link, Outlet } from "react-router-dom";
import { useSt } from "@/app/store";

export default function Main() {
    const user = useSt(s => s.user)
    
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div style={{width:"1500px"}} className="h-full w-full flex justify-center">
                <Sidebar width="300px">
                    <SiderBtn>
                        <GoX strokeWidth={2} className="w-7 h-7" />
                        <span className="text-2xl">Екатерина твитер</span>
                    </SiderBtn>
                    <SiderHr />
                    <SiderBtn>
                        <GoHomeFill className="w-6 h-6"/>
                        Главная
                    </SiderBtn>
                    <SiderBtn>
                        <GoSearch className="w-6 h-6" />
                        Поиск
                    </SiderBtn>
                    
                    { !user &&
                    <Link className="w-full" to="/login">
                        <SiderBtn>
                            <GoSignIn className="w-6 h-6" />
                            Войти
                        </SiderBtn>
                    </Link>
                    }
                    
                    <SiderBtn>
                        <GoBell className="w-6 h-6" />
                        Уведомления
                    </SiderBtn>
                    <SiderBtn>
                        <GoMail className="w-6 h-6" />
                        Почта
                    </SiderBtn>
                    <SiderBtn>
                        <GoBookmark className="w-6 h-6" />
                        Закладки
                    </SiderBtn>
                    <SiderBtn>
                        <GoKebabHorizontal className="w-6 h-6" />
                        Еще
                    </SiderBtn>
                </Sidebar>
                <div style={{width:"700px"}} className="flex pt-2 flex-col border-border border-l border-r scrollbar-hide scroll-smooth overflow-x-auto whitespace-nowrap">
                    <Outlet />
                </div>
                <Sidebar width="350px" />
            </div>
        </div>
    )
}