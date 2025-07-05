import { ResponseGetMe } from '@/modules/user'

export interface ResponseLogin {
    data?: {
        access_token: string
        expiration: string
        host: string
        user: ResponseGetMe['data']
    } & ResponseGetMe['data']
    user: ResponseGetMe['data']
    status: number
    message: string
    expiration: string
    access_token: string
}
