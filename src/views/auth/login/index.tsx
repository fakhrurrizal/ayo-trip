import IconifyIcon from '@/components/icon'
import CustomTextField from '@/components/text-field/custom-text-field'
import { axiosInterceptor } from '@/config'
import { LoginForm, loginSchema, useLoginMutation } from '@/modules/auth/login'
import { ResponseGetMe } from '@/modules/user'
import { useAuth } from '@/services'
import { getApi, pathnames } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

    const { refetch: getMe } = useQuery({
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

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = form

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
            if (user.role.id === 1) {
                router.push(pathnames.dashboard)
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error('failed to login', error)
        }
    }

    return (
        <div className='min-h-screen flex'>
            {/* Background Image */}
            <div
                className='hidden lg:block lg:w-1/2 bg-cover bg-center'
                style={{
                    backgroundImage: `url('/images/register.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div
                className='w-full lg:w-1/2 flex items-center justify-center p-8 relative'
                style={{ backgroundColor: '#B6E8FF' }}
            >
                <div className='absolute top-0 right-0'>
                    <Image
                        src='/decorative-lines-top.png'
                        alt='Decorative Lines Top'
                        width={400}
                        height={400}
                        className='opacity-60'
                    />
                </div>

                <div className='absolute bottom-0 left-0'>
                    <Image
                        src='/decorative-lines-bottom.png'
                        alt='Decorative Lines Bottom'
                        width={400}
                        height={400}
                        className='opacity-60'
                    />
                </div>

                <Card
                    className='w-full max-w-sm shadow-none border-0 relative z-10'
                    sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                >
                    <CardContent className='p-0'>
                        {/* Logo */}
                        <Box className='flex justify-center items-center mb-3'>
                            <Image src='/logos.png' alt='Logo' width={100} height={100} />
                        </Box>

                        {/* Title */}
                        <Typography
                            variant='h3'
                            className='text-center font-bold mb-8'
                            style={{ color: '#116487', fontSize: '2.5rem', fontWeight: '700' }}
                        >
                            Login
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        size='medium'
                                        error={!!errors.email}
                                        name='email'
                                        label='Email*'
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        inputFormat='PASSWORD'
                                        size='medium'
                                        error={!!errors.password}
                                        placeholder='••••••••'
                                        name='password'
                                        label='Password*'
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Button */}
                            <Box className='pt-4'>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={isLoadingLogin}
                                    sx={{
                                        backgroundColor: '#f59e0b',
                                        '&:hover': {
                                            backgroundColor: '#d97706',
                                        },
                                        borderRadius: '8px',
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        color: 'white',
                                    }}
                                >
                                    {isLoadingLogin ? (
                                        <Box className='flex items-center gap-2'>
                                            <IconifyIcon icon='mdi:loading' className='animate-spin' />
                                            Memproses...
                                        </Box>
                                    ) : (
                                        'Masuk'
                                    )}
                                </Button>
                            </Box>
                        </form>

                        {/* Link ke Register */}
                        <Box className='text-center mt-6'>
                            <Typography variant='body2' style={{ color: '#116487', fontSize: '14px' }}>
                                Belum punya akun?{' '}
                                <Typography
                                    component='span'
                                    onClick={() => router.push('/auth/register')}
                                    sx={{
                                        color: '#116487',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Daftar sekarang
                                </Typography>
                            </Typography>
                        </Box>
                        <Box className='text-center mt-6'>
                            <Typography
                                component='span'
                                onClick={() => router.push('/')}
                                sx={{
                                    color: '#116487',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Kembali
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LoginPageViews
