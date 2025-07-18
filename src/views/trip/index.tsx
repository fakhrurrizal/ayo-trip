import HeaderSectionTableCustom from '@/components/custom-table/header'
import PaginationSectionTableCustom from '@/components/custom-table/pagination'
import ActiveInactiveRendererTableCustom from '@/components/custom-table/table/active-inactive-status-renderer'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import ShowImage from '@/components/modal/show-image'
import { Order } from '@/interfaces'
import { useTripParams } from '@/utils/quries/use-destination.query'
import { SelectChangeEvent, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import AddTrip from './modal/add'
import RowOptions from './table/row-options'

const HeaderItems = [
    {
        label: 'Nama Trip',
        alignCenter: false,
    },
    {
        label: 'Kategori Trip',
        alignCenter: false,
    },
    {
        label: 'Tipe Destinasi',
        alignCenter: false,
    },
    {
        label: 'Keterangan',
        alignCenter: false,
    },
    {
        label: 'Gambar',
        alignCenter: false,
    },
    {
        label: 'Status',
        alignCenter: true,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]

const ImageThumbnail = styled('img')({
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 8,
    cursor: 'pointer',
    border: '1px solid #ddd',
})

const TripListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [openImage, setOpenImage] = useState(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, status } = router.query

    const toggleImage = () => setOpenImage(!openImage)

    const { data: { data: TripList = [], recordsFiltered = 0, recordsTotal = 0 } = { data: [] }, isLoading } =
        useTripParams({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            status,
            sort: sort ? (sort as Order) : undefined,
        })

    const handleLimitChange = useCallback((e: SelectChangeEvent) => {
        setPageSize(parseInt(e.target.value, 10))
    }, [])

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    const toggleAdd = () => setAddOpen(!addOpen)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchValue])

    return (
        <>
            <div className='custom__styled__container'>
                {/* header section */}
                <HeaderSectionTableCustom title={'Daftar Trip'} recordsTotal={recordsTotal} />
                {/* header section */}

                {/* toolbar section */}
                <ToolbarSectionTableCustom
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    toggleAdd={toggleAdd}
                    addButtonLabel={'Tambah baru'}
                    isLoading={isLoading}
                />
                <CustomStyledTableContainer isLoading={isLoading} recordsFiltered={recordsFiltered}>
                    <CustomStyledTable>
                        <TableHeaderCustomTable data={HeaderItems} />

                        <tbody className='text-xs'>
                            {!isLoading &&
                                Array.isArray(TripList) &&
                                TripList?.map(item => {
                                    return (
                                        <Fragment key={item?.id}>
                                            <CustomStyledTableRow>
                                                <CustomStyledTableHead>{item?.name}</CustomStyledTableHead>

                                                <CustomStyledTableData>
                                                    {item?.trip_category?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.destination_type?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData>{item?.description}</CustomStyledTableData>
                                                <CustomStyledTableData>
                                                    {item?.image?.[0] && (
                                                        <ImageThumbnail
                                                            src={item.image[0]}
                                                            alt='Thumbnail'
                                                            onClick={toggleImage}
                                                        />
                                                    )}
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='text-center'>
                                                    <ActiveInactiveRendererTableCustom value={item?.status} />
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='text-center'>
                                                    <RowOptions data={item} />
                                                </CustomStyledTableData>
                                            </CustomStyledTableRow>
                                            {openImage && (
                                                <ShowImage
                                                    open={openImage}
                                                    toggle={toggleImage}
                                                    image={item.image?.[0] || ''}
                                                />
                                            )}
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </CustomStyledTable>
                </CustomStyledTableContainer>

                {/* Paginasi */}
                <PaginationSectionTableCustom
                    page={page}
                    pageSize={pageSize}
                    recordsFiltered={recordsFiltered}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                />
                {/* Paginasi */}
            </div>

            {addOpen && <AddTrip open={addOpen} toggle={toggleAdd} />}
        </>
    )
}

export default TripListPageViews
