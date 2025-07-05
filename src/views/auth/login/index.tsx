import { CustomTextField } from '@/components'
import { axiosInterceptor } from '@/config'
import { LoginForm, loginSchema, useLoginMutation } from '@/modules/auth/login'
import { ResponseGetMe } from '@/modules/user'
import { useAuth } from '@/services'
import { getApi, pathnames } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, BoxProps, Button, CircularProgress, Grid, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    borderRadius: 13,
    background: 'linear-gradient(to bottom, #D7F0FF, #E1F3FF, #EDF8FF, #F5FBFF, #FFFFFF)',
    [theme.breakpoints.up('md')]: {
        maxWidth: 550,
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 700,
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 850,
    },
}))

const LoginPageViews = () => {
    const router = useRouter()

    const user = useAuth(state => state.value.user)

    useEffect(() => {
        if (user) {
            router.push(pathnames.dashboard)
        }
    }, [user, router])

    const { mutateAsync: login, isPending: isLoadingLogin } = useLoginMutation()

    const setAuth = useAuth(state => state.setAuth)

    const returnUrlQuery = router.query.returnUrl

    const { refetch: getMe, isLoading: loadingUser } = useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<ResponseGetMe>(getApi('get_me'))

            return res.data
        },
        queryKey: [getApi('get_me')],
        enabled: false,
    })

    const form = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },

        resolver: zodResolver(loginSchema),
    })

    const { handleSubmit } = form

    const onSubmit: SubmitHandler<LoginForm> = async data => {
        try {
            const res = await login(data)

            const accessToken = 'Bearer ' + res?.data?.access_token

            axiosInterceptor.defaults.headers.common['Authorization'] = accessToken

            axios.defaults.headers.common['Authorization'] = accessToken

            const users: any = await getMe()

            const user = users.data?.data

            setAuth({ accessToken, user })

            if (returnUrlQuery) {
                return router.replace(returnUrlQuery as string)
            }

            return router.push(pathnames.dashboard)
        } catch (error) {
            console.error('failed to login', error)
        }
    }

    return (
        <>
            <Head>
                <title>Login - App Dashboard</title>
            </Head>

            <Box
                sx={{
                    backgroundColor: 'white',
                    height: 'auto',
                    display: 'flex',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: '16px',
                        height: '100vh',
                        position: 'relative',
                    }}
                >
                    <img
                        src={'/images/left-wrapper.png'}
                        style={{
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                            borderRadius: '16px',
                        }}
                        alt='image_slider'
                    />
                </Box>
                <RightWrapper>
                    <Box
                        sx={({ breakpoints }) => ({
                            p: [6, 12],
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'none',
                            flexDirection: 'column',
                            position: 'relative',
                            [breakpoints.up('md')]: {
                                overflow: 'hidden',
                            },
                        })}
                    >
                        <Box
                            sx={{
                                width: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                minWidth: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                maxWidth: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                zIndex: 2,
                            }}
                        >
                            <Box
                                component='img'
                                src='/logos.png'
                                sx={() => ({
                                    height: 'auto',
                                    width: {
                                        xs: '120px',
                                        sm: '160px',
                                        md: '200px',
                                        lg: '180px',
                                        xl: '220px',
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    background: 'none',
                                    cursor: 'pointer',
                                    marginBottom: '60px',
                                })}
                            />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            control={form.control}
                                            name='email'
                                            type='email'
                                            size='medium'
                                            label='Email'
                                            placeholder='Masukkan email...'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            control={form.control}
                                            name='password'
                                            type='password'
                                            label='Password'
                                            size='medium'
                                            inputFormat='PASSWORD'
                                            placeholder='Masukkan password...'
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    fullWidth
                                    size='large'
                                    type='submit'
                                    variant='contained'
                                    disabled={isLoadingLogin || loadingUser}
                                    startIcon={isLoadingLogin || (loadingUser && <CircularProgress size={20} />)}
                                    sx={{
                                        mb: 4,
                                        fontSize: { xs: 12, md: 14 },
                                        backgroundColor: '#116487',
                                        mt: 10,
                                        fontWeight: 700,
                                        textTransform: 'capitalize',
                                        ':hover': {
                                            backgroundColor: '#52849e',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {isLoadingLogin || loadingUser ? 'Loading ...' : ' Sign In'}
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </RightWrapper>
            </Box>
        </>
    )
}

export default LoginPageViews
