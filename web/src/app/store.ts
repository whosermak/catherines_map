import { create } from "zustand"

type User = {

} | null

type St = {
    user: User
}

export const useSt = create<St>((set) => ({
    user: null,
    setUser: (u: User) => set({user: u}),

    
    


    clear: () => {
        set({
            user: null,

        })
    }
}))