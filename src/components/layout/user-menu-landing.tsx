import { useAuth } from '@/services'
// import { pathnames } from '@/utils'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import { pathnames } from '@/utils'
import UserDropdown from '../user-menu/user-dropdown'

export const UserMenuLanding = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const { push } = useRouter()

    const user = useAuth(state => state.value.user)

    // const setAuth = useAuth(state => state.setAuth)

    const logout = useAuth(state => state.logout)

    const handleLogout = () => {
        logout()
        // push(pathnames.base)
    }

    const open = Boolean(anchorEl)

    const handleDashboard = () => {
        push(pathnames.dashboard)
    }

    return (
        <>
            <Chip
                onClick={handleClick}
                size='small'
                className='!ml-3 hover:!opacity-90 !transition-all !duration-300'
                sx={({ palette, breakpoints }) => ({
                    '& .MuiChip-avatar': {
                        width: '28px',
                        height: '28px',
                        backgroundColor: 'white',
                        marginRight: '2px',
                        color: palette.primary.main,
                    },

                    '& .MuiChip-label': {
                        color: 'white',
                        fontSize: '12px',
                        fontFamily: '"Poppins", sans-serif',
                    },

                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: palette.primary.main,
                    [breakpoints.down('sm')]: {
                        backgroundColor: palette.primary.main,
                        paddingX: 0,
                    },
                    // marginTop: 1,
                    paddingY: 2.5,
                    paddingX: 1,
                    ':hover': {
                        backgroundColor: palette.primary.main,

                        '& .MuiChip-label': {
                            color: 'white',
                        },
                    },
                })}
                avatar={
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                }
                variant='filled'
                label={
                    <Box
                        sx={({ breakpoints }) => ({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            [breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        })}
                    >
                        Hai, {user?.fullname}
                    </Box>
                }
            />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        padding: 1,
                        minWidth: '8rem',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,

                        '& .MuiAvatar-root': {
                            width: 26,
                            height: 26,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                disableScrollLock
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <ListItem disablePadding className='!pb-[8px] mx-[10px] flex items-center'>
                    <UserDropdown
                        email={user?.email ? user?.email : ''}
                        fullname={user?.fullname ? user?.fullname : ''}
                    />
                </ListItem>
                <Divider className='!my-[5px]' />
                {user?.role?.id === 1 && (
                    <ListItem disablePadding sx={{ marginBottom: 1 }}>
                        {/* <ListItemButton onClick={handleProfile}> */}
                        <ListItemButton onClick={handleDashboard}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItemButton>
                    </ListItem>
                )}

                <Divider sx={{ marginY: 1 }} />

                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </Menu>
        </>
    )
}
