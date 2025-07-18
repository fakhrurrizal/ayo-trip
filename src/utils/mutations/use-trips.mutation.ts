import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { useMutation } from '@tanstack/react-query'
import { axiosInterceptor } from '@/config'

export const useAddTrip = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('trip'), data),
        mutationKey: ['ADD_TRIP'],
    })
}

export const useEditTrip = (id: number) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('trip') + '/' + id, data),
        mutationKey: ['ADD_TRIP'],
    })
}
