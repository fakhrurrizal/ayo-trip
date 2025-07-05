export interface PaginationArgs<T = any> {
    pageIndex?: number
    searchValue?: string
    pageSize?: number
    sort?: Order
    order?: keyof T
    status?: any
}

export type Order = 'desc' | 'asc'
