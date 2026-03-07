import type { UserT } from "@/types/User"
import { create } from "zustand"

type St = {
    user: UserT | null
    setUser: (u: UserT | null) => void
    clear: () => void
}

export const useSt = create<St>((set) => ({
    user: null,
    setUser: (u: UserT | null) => set({ user: u }),

    
    


    clear: () => {
        set({
            user: null,

        })
    }
}))