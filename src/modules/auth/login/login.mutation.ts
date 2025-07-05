import { AxiosError } from 'axios'
import { getApi } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'
import { ResponseLogin } from './login.response'
import { LoginForm } from './login.schemas'

const endpointLogin = getApi('login')

export const useLoginMutation = () =>
    useMutation<ResponseLogin, AxiosError<ResponseLogin>, LoginForm>({
        mutationFn: async data => {
            const res = await axiosInterceptor.post<ResponseLogin>(endpointLogin, data)

            return res.data
        },
        mutationKey: ['LOGIN'],
    })


    