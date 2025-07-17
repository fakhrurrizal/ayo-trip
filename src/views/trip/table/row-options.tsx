import ModalDelete from '@/components/modal-delete'
import { axiosInterceptor } from '@/config'
import { getApi, queryClient } from '@/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Fragment, MouseEvent, useState } from 'react'
// import DetailContactTypes from '../modal/detail'
// import EditContactTypes from '../modal/edit'

interface IContact {
    id: number
    created_at: string
    updated_at: string
    code: string
    name: string
    description: string
    status: boolean
    email: string
    phone: string
    is_default: boolean
    is_customer: boolean
    is_vendor: boolean
    address: string
    contact_type: {
        id: number
        code: string
        name: string
    }

    account_number: string
    account_name: string
}

interface Props {
    data: IContact
}

const RowOptions = (data: Props) => {
    const DataContact = data?.data

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const [openDetail, setOpenDetail] = useState(false)

    const [openEdit, setOpenEdit] = useState<boolean>(false)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }

    const toggleEdit = () => {
        setOpenEdit(!openEdit)
        handleRowOptionsClose()
    }

    const toggleDetail = () => {
        setOpenDetail(!openDetail)
        handleRowOptionsClose()
    }

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const toggleDelete = () => {
        setOpenDelete(!openDelete)
        handleRowOptionsClose()
    }

    const handleDelete = async () => {
        axiosInterceptor
            .delete(`${getApi('trip')}/${DataContact?.id}`)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['LIST_TRIP_ALL'] })
                toggleDelete()
            })
            .catch((error: any) => {
                console.error(error)
            })
    }

    return (
        <>
            <IconButton size='small' onClick={handleRowOptionsClick}>
                <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={rowOptionsOpen}
                onClose={handleRowOptionsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{ style: { minWidth: '8rem' } }}
            >
                <MenuItem sx={{ '& svg': { mr: 1 } }} onClick={toggleDetail}>
                    <VisibilityIcon sx={{ fontSize: '17px' }} />
                    Detail
                </MenuItem>

                <Fragment>
                    <MenuItem sx={{ '& svg': { mr: 1 } }} onClick={toggleEdit}>
                        <EditIcon sx={{ fontSize: '17px' }} />
                        Edit
                    </MenuItem>

                    <MenuItem sx={{ '& svg': { mr: 1 } }} onClick={toggleDelete}>
                        <DeleteIcon sx={{ fontSize: '17px' }} />
                        Hapus
                    </MenuItem>
                </Fragment>
            </Menu>
            {openDelete && (
                <ModalDelete
                    toggle={toggleDelete}
                    handleDelete={handleDelete}
                    name={DataContact?.name}
                    open={openDelete}
                />
            )}
        </>
    )
}

export default RowOptions
