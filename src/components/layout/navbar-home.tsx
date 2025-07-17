import React, { useState, useEffect, ReactNode } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/services'
import { UserMenuLanding } from './user-menu-landing'

const NavbarHome = ({ children }: { children: ReactNode }) => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const isLogin = useAuth(state => state.value?.user)

    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50
            setScrolled(isScrolled)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const navItems = [
        { label: 'Explore', icon: 'mdi:compass-outline' },
        { label: 'Destinasi', icon: 'mdi:map-marker-outline' },
    ]

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ my: 2, color: '#0ea5e9' }}>
                Ayo Trip
            </Typography>
            <List>
                {navItems.map(item => (
                    <ListItem key={item.label} disablePadding>
                        <Button
                            fullWidth
                            startIcon={<Icon icon={item.icon} />}
                            sx={{
                                justifyContent: 'flex-start',
                                px: 3,
                                py: 1.5,
                                color: '#64748b',
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ px: 2, mt: 2 }}>
                <Button
                    onClick={() => router.push('/auth/register')}
                    variant='outlined'
                    fullWidth
                    sx={{
                        mb: 1,
                        borderColor: '#0ea5e9',
                        color: '#0ea5e9',
                        '&:hover': {
                            borderColor: '#0284c7',
                            backgroundColor: 'rgba(14, 165, 233, 0.04)',
                        },
                    }}
                >
                    Sign Up
                </Button>
                {isLogin ? (
                    <div className=' max-[900px]:block'>
                        <UserMenuLanding />
                    </div>
                ) : (
                    <Button
                        onClick={() => router.push('/auth/login')}
                        variant='contained'
                        fullWidth
                        sx={{
                            backgroundColor: '#f59e0b',
                            '&:hover': {
                                backgroundColor: '#d97706',
                            },
                        }}
                    >
                        Login
                    </Button>
                )}
            </Box>
        </Box>
    )

    return (
        <>
            <AppBar
                position='fixed'
                elevation={scrolled ? 4 : 0}
                sx={{
                    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    transition: 'all 0.3s ease-in-out',
                    borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                }}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mr: 4 }}>
                            <Image src='/logos.png' alt='Logo' width={60} height={60} />
                        </Box>

                        {!isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                {navItems.map(item => (
                                    <Button
                                        key={item.label}
                                        startIcon={<Icon icon={item.icon} />}
                                        sx={{
                                            mx: 1,
                                            color: scrolled ? '#64748b' : 'white',
                                            fontWeight: 500,
                                            '&:hover': {
                                                backgroundColor: scrolled
                                                    ? 'rgba(14, 165, 233, 0.08)'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                                color: scrolled ? '#0ea5e9' : 'white',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {/* Desktop Auth Buttons */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                {isLogin ? (
                                    <UserMenuLanding />
                                ) : (
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            onClick={() => router.push('/auth/register')}
                                            variant='outlined'
                                            sx={{
                                                borderColor: scrolled ? '#0ea5e9' : 'white',
                                                color: scrolled ? '#0ea5e9' : 'white',
                                                '&:hover': {
                                                    borderColor: scrolled ? '#0284c7' : 'rgba(255, 255, 255, 0.8)',
                                                    backgroundColor: scrolled
                                                        ? 'rgba(14, 165, 233, 0.04)'
                                                        : 'rgba(255, 255, 255, 0.1)',
                                                },
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            onClick={() => router.push('/auth/login')}
                                            variant='contained'
                                            sx={{
                                                backgroundColor: '#f59e0b',
                                                '&:hover': {
                                                    backgroundColor: '#d97706',
                                                },
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Mobile menu button */}
                        {isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton
                                    color='inherit'
                                    aria-label='open drawer'
                                    edge='start'
                                    onClick={handleDrawerToggle}
                                    sx={{ color: scrolled ? '#64748b' : 'white' }}
                                >
                                    <Icon icon='mdi:menu' width={24} height={24} />
                                </IconButton>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
            {children}
        </>
    )
}

export default NavbarHome
