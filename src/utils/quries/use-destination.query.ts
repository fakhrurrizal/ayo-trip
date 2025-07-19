import { axiosInterceptor } from '@/config'
import { PaginationArgs } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { getApi } from '../helpers'

export const useDestinationID = (id: number) => {
    const endpoint = queryString.stringifyUrl({
        url: getApi('destination') + '/' + id,
    })

    return useQuery({
        queryFn: async () => {
            if (id) {
                const res = await axiosInterceptor.get<any>(endpoint)

                return res.data?.data
            }
        },
        refetchOnWindowFocus: false,
        queryKey: [' DESTINATION_ID', id],
    })
}

export const useDestinationType = (company_id: any) => {
    const endpoint = queryString.stringifyUrl({
        url: getApi('destination_type'),
        query: {
            limit: 100,
            company_id: company_id,
        },
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DESTINATION_TYPE', company_id],
        enabled: false,
    })
}

export const useTripParams = (args: PaginationArgs<any>) => {
    const { status, pageIndex, pageSize, sort, searchValue, order } = args

    const query: Record<string, string | number> = {
        limit: Number(pageSize),
        page: Number(pageIndex),
        app_id: 2,
    }

    if (order) {
        query['order'] = order as any
    }

    if (status) {
        query['status'] = status
    }

    if (searchValue) {
        query['search'] = searchValue
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('trip'),
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_TRIP_ALL', query, args],
    })
}

export const useTripID = (id: number) => {
    const endpoint = queryString.stringifyUrl({
        url: getApi('trip') + '/' + id,
    })

    return useQuery({
        queryFn: async () => {
            if (id) {
                const res = await axiosInterceptor.get<any>(endpoint)

                return res.data?.data
            }
        },
        refetchOnWindowFocus: true,
        queryKey: [' TRIP_ID', id],
    })
}
