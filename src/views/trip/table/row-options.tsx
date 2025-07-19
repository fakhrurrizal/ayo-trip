import ModalDelete from '@/components/modal-delete'
import { axiosInterceptor } from '@/config'
import { getApi, queryClient } from '@/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Fragment, MouseEvent, useState } from 'react'
import EditTrip from '../modal/edit'
// import DetailContactTypes from '../modal/detail'
// import EditContactTypes from '../modal/edit'

interface Props {
    data: any
}

const RowOptions = ({ data }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const toggleDelete = () => {
        setOpenDelete(!openDelete)
        handleRowOptionsClose()
    }

    const handleDelete = async () => {
        axiosInterceptor
            .delete(`${getApi('trip')}/${data?.id}`)
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
                <MenuItem sx={{ '& svg': { mr: 1 } }} onClick={toggleEdit}>
                    <EditIcon sx={{ fontSize: '17px' }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ '& svg': { mr: 1 } }} onClick={toggleDelete}>
                    <DeleteIcon sx={{ fontSize: '17px' }} />
                    Hapus
                </MenuItem>
            </Menu>
            {openEdit && <EditTrip toggle={toggleEdit} open={openEdit} data={data} />}
            {openDelete && (
                <ModalDelete toggle={toggleDelete} handleDelete={handleDelete} name={data?.name} open={openDelete} />
            )}
        </>
    )
}

export default RowOptions
