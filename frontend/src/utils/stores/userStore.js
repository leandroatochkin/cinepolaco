import {create} from 'zustand';

export const userStore = create((set) => ({
    loggedIn: false,

    setLoggedIn: (status) => set({
        loggedIn: status
    })
}))