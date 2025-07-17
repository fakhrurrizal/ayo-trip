import CustomTextField from '@/components/text-field/custom-text-field'
import { useUserProfile } from '@/utils/mutations/use-register'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
    .object({
        email: z.string().min(1, 'Email wajib diisi').email('Silakan masukkan alamat email yang valid'),

        fullname: z.string().min(1, 'Nama lengkap wajib diisi'),

        phone: z
            .string()
            .min(1, 'Nomor telepon wajib diisi')
            .regex(/^0\d{9,12}$/, 'Masukkan nomor telepon Indonesia yang valid (diawali 0, 10–13 digit)'),

        password: z
            .string()
            .min(8, 'Kata sandi minimal terdiri dari 8 karakter')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka'
            ),

        confirm_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'Kata sandi dan konfirmasi tidak cocok',
        path: ['confirm_password'],
    })

type SignUpFormData = z.infer<typeof signUpSchema>

const SignUpComponent: React.FC = () => {
    const router = useRouter()

    const { mutateAsync: register, isPending: isLoadingRegister } = useUserProfile()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            phone: '',
            fullname: '',
            password: '',
            confirm_password: '',
        },
    })

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await register({ ...data, role_id: 3 })
            router.push('/auth/login')
        } catch (error) {
            console.error('Submission error:', error)
        }
    }

    return (
        <div className='min-h-screen flex'>
            <div
                className='hidden lg:block lg:w-1/2 bg-cover bg-center'
                style={{
                    backgroundImage: `url('/images/register.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Left side - Form */}
            <div
                className='w-full lg:w-1/2 flex items-center justify-center p-8 relative'
                style={{ backgroundColor: '#0ea5e9' }}
            >
                {/* Decorative Image - Top Right */}
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
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <CardContent className='p-0'>
                        {/* Logo */}
                        <Box className='flex justify-center items-center mb-2'>
                            <Image src='/logos.png' alt='Logo' width={90} height={90} />
                        </Box>

                        {/* Title */}
                        <Typography
                            variant='h3'
                            className='text-center font-bold mb-8'
                            style={{
                                color: 'white',
                                fontSize: '2.2rem',
                                fontWeight: '700',
                            }}
                        >
                            Daftar
                        </Typography>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        size='medium'
                                        error={!!errors.fullname}
                                        name='fullname'
                                        label='Nama Lengkap*'
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
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
                                        inputFormat='PHONE'
                                        size='medium'
                                        error={!!errors.phone}
                                        placeholder='0812xxxxxxx'
                                        name='phone'
                                        label='Phone*'
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

                                <Grid item xs={12}>
                                    <CustomTextField
                                        control={control}
                                        inputFormat='PASSWORD'
                                        size='medium'
                                        error={!!errors.confirm_password}
                                        placeholder='••••••••'
                                        name='confirm_password'
                                        label='Konfirmasi Password*'
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit Button */}
                            <Box className='pt-4'>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={isLoadingRegister}
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
                                        boxShadow: 'none',
                                        color: 'white',
                                    }}
                                >
                                    {isLoadingRegister ? (
                                        <Box className='flex items-center gap-2'>
                                            <Icon icon='mdi:loading' className='animate-spin' />
                                            Memproses...
                                        </Box>
                                    ) : (
                                        'Daftar'
                                    )}
                                </Button>
                            </Box>
                        </form>

                        {/* Login Link */}
                        <Box className='text-center mt-6'>
                            <Typography
                                variant='body2'
                                style={{
                                    color: 'white',
                                    fontSize: '14px',
                                }}
                            >
                                Sudah punya akun?{' '}
                                <Typography
                                    component='span'
                                    onClick={() => router.push('/auth/login')}
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Masuk Sekarang
                                </Typography>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignUpComponent
