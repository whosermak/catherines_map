import "./Main.css"
import { Sidebar, SiderBtn, SiderLinkBtn, SiderHr } from "@/components/Sider"
import { GoBell, GoBookmark, GoHomeFill, GoKebabHorizontal, GoMail, GoSearch, GoSignIn, GoSignOut } from "react-icons/go";
import { Outlet } from "react-router-dom";
import { useSt } from "@/app/store";
import { UserBar } from "@/components/UserBar/UserBar";
import * as UserApi from "@/services/user"


export default function Main() {
    const user = useSt(s => s.user)

    const logout = async () => {
        await UserApi.logout()
        window.location.reload()
    }
    
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div style={{width:"1500px"}} className="h-full w-full flex justify-center">
                <Sidebar width="300px">
                    { user && <UserBar /> }
                    { !user && 
                        <SiderLinkBtn className="w-full" to="/login">
                            <GoSignIn className="w-6 h-6" />
                            Войти
                        </SiderLinkBtn>
                    }
                    <SiderHr />
                    <SiderLinkBtn to="/feed">
                        <GoHomeFill className="w-6 h-6"/>
                        Главная
                    </SiderLinkBtn>
                    <SiderBtn>
                        <GoSearch className="w-6 h-6" />
                        Поиск
                    </SiderBtn>
                    
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
                    { user && 
                        <SiderBtn onClick={() => logout()}>
                            <GoSignOut className="w-6 h-6" />
                            Выход
                        </SiderBtn>
                    }
                </Sidebar>
                <div style={{width:"700px"}} className="flex flex-col border-border border-l border-r scrollbar-hide scroll-smooth overflow-x-auto whitespace-nowrap">
                    <Outlet />
                </div>
                <Sidebar width="350px" />
            </div>
        </div>
    )
}