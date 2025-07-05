import axios from 'axios'
import { create } from 'zustand'
import { axiosInterceptor } from '@/config'
import { ResponseGetMe } from '@/modules/user'
import { localKey } from '@/utils'

export interface Auth {
    accessToken?: string
    user?: ResponseGetMe['data'] & { isDemo?: boolean }
}

const emptyUser: Auth = {
    user: undefined,
    accessToken: undefined,
}

const getInitialState: () => Auth = () => {
let storedData

try {
    storedData = localStorage.getItem(localKey.auth)
} catch (error) {
    storedData = null
    console.log(error)
}

if (!storedData) {
    return emptyUser
}

    const parseStoredData: Auth = JSON.parse(atob(storedData))

    if (parseStoredData.accessToken) {
        axios.defaults.headers.common['Authorization'] = parseStoredData.accessToken

        axiosInterceptor.defaults.headers.common['Authorization'] = parseStoredData.accessToken
    }

    return parseStoredData
}

const initialState: Auth = getInitialState()

export interface AuthState {
    value: Auth

    setAuth: (auth: Auth) => void

    setUser: (auth: Auth['user']) => void

    isLogin: () => boolean

    logout: () => void
}

export const useAuth = create<AuthState>()((set, getState) => ({
    value: initialState,

    setAuth: auth => {
        localStorage.setItem(localKey.auth, btoa(JSON.stringify(auth)))

        return set(state => ({
            ...state,
            value: { ...state.value, accessToken: auth.accessToken, user: auth.user },
        }))
    },

    isLogin: () => {
        const state = getState()
        const user = state.value.user
        const token = state.value.accessToken

        return Boolean(user) && Boolean(token)
    },

    setUser: (user: any) => {
        localStorage.setItem(localKey.auth, btoa(JSON.stringify({ ...getState().value, user })))

        return set(state => ({
            value: { ...state.value, user },
        }))
    },

    isReset: () => {
        const state = getState()
        const token = state.value.accessToken

        return Boolean(token)
    },

    logout: async () => {
        try {
            // await axiosInterceptor.post(getApi('logout'))

            localStorage.clear()

            return set(state => ({
                ...state,
                value: emptyUser,
            }))
        } catch (error) {
            console.error(error)
        }
    },
}))
