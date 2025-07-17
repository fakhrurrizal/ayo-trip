import { Fragment, useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward' // Ascending icon
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward' // Descending icon
import { useRouter } from 'next/router'
import { Checkbox } from '@mui/material'

export type headerTypes = {
    label: string
    alignCenter?: boolean
    width?: string
    fontSize?: string
    hide?: boolean
    sortable?: boolean
    field?: string
}

interface Props {
    data: headerTypes[]
    py?: string
    onSort?: (field: string, direction: 'asc' | 'desc' | null) => void // Add null for "off" state
    rowCount?: number
    numSelected?: number
    onSelectAllClick?: any
    containerClass?: string
}

const TableHeaderCustomTable = ({
    data,
    py,
    onSort,
    rowCount = 0,
    numSelected = 0,
    onSelectAllClick,
    containerClass,
}: Props) => {
    const [sortConfig, setSortConfig] = useState<{ field: string; direction: 'asc' | 'desc' | null } | null>(null)
    const route = useRouter()

    const handleSort = (field: string) => {
        let direction: 'asc' | 'desc' | null = 'asc'
        if (sortConfig && sortConfig.field === field) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc'
            } else if (sortConfig.direction === 'desc') {
                direction = null // Set to "off" (remove sorting) after desc
            } else {
                direction = 'asc' // Reset back to "asc" after "off"
            }
        }
        setSortConfig(direction ? { field, direction } : null)
        if (onSort) {
            onSort(field, direction)
        }
    }
    useEffect(() => {
        if (!sortConfig) {
            route.push(route.asPath.split('?')[0], undefined, {
                shallow: false,
            })

            return
        }

        const queryParams = [
            { key: 'sort', value: sortConfig?.direction },
            { key: 'order', value: sortConfig?.field },
        ]
            .reduce((acc: any, curr: any) => {
                if (curr.value) {
                    acc.push(`${curr?.key}=${curr.value}`)
                }

                return acc
            }, [])
            .join('&')

        route.push(`${route.asPath.split('?')[0]}?${queryParams}`, undefined, {
            shallow: false,
        })
    }, [sortConfig, route])

    return (
        <thead
            className={`text-xs text-gray-700 capitalize bg-gray-100 border-b-[1px] border-slate-300 ${containerClass}`}
        >
            <tr>
                {data?.map((item: headerTypes, index: number) => (
                    <Fragment key={item?.label}>
                        {item && item?.label !== 'checkbox' && !item.hide ? (
                            <th
                                className={`px-6 ${py !== undefined ? `py-[${py}]` : 'py-6'}`}
                                style={{
                                    textAlign: item?.alignCenter ? 'center' : 'left',
                                    fontSize: item.fontSize,
                                    width: item.width,
                                }}
                                onClick={() => item.sortable && item.field && handleSort(item.field)}
                            >
                                <div
                                    className={`${
                                        item.sortable && 'cursor-pointer py-1 hover:px-2 hover:bg-slate-300 rounded-md'
                                    }`}
                                >
                                    {item?.label?.toUpperCase()}
                                    {item.sortable && sortConfig?.field === item.field && sortConfig?.direction && (
                                        <span className='ml-2'>
                                            {sortConfig.direction === 'asc' ? (
                                                <ArrowUpwardIcon fontSize='small' />
                                            ) : sortConfig.direction === 'desc' ? (
                                                <ArrowDownwardIcon fontSize='small' />
                                            ) : null}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ) : null}

                        {item?.label === 'checkbox' && (
                            <th key={index} className='text-center w-[10px]'>
                                <Checkbox
                                    onChange={onSelectAllClick}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    disabled={rowCount === 0}
                                />
                            </th>
                        )}
                    </Fragment>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeaderCustomTable
