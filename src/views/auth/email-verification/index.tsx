import IconifyIcon from '@/components/icon'
import { axiosInterceptor } from '@/config'
import { getApi } from '@/utils'
import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EmailVerificationPageViews = () => {
    const router = useRouter()
    const { token } = router.query
    const [showVerificationDialog, setShowVerificationDialog] = useState(true)
    const [verificationComplete, setVerificationComplete] = useState(false)
    const [verificationSuccess, setVerificationSuccess] = useState(false)
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axiosInterceptor.post(getApi('email_verification'), {
                    token,
                })

                setVerificationSuccess(true)
                setVerificationComplete(true)

                setShowVerificationDialog(false)
            } catch (error) {
                console.error('Email verification failed:', error)
                setVerificationSuccess(false)
                setVerificationComplete(true)

                setTimeout(() => {
                    setShowVerificationDialog(false)
                }, 1000)
            }
        }

        if (token && typeof token === 'string' && token.trim() !== '') {
            verifyEmail()
        } else {
            setVerificationSuccess(false)
            setVerificationComplete(true)
            setShowVerificationDialog(false)
        }
    }, [token])

    const handleGoToLogin = () => {
        router.push('/auth/login')
    }

    const handleResendVerification = () => {
        console.log('Resending verification email...')
    }

    return (
        <>
            {showVerificationDialog && (
                <Dialog
                    open={showVerificationDialog}
                    disableEscapeKeyDown
                    sx={{
                        '& .MuiDialog-paper': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '16px',
                            padding: '20px',
                            minWidth: '320px',
                            textAlign: 'center',
                        },
                    }}
                >
                    <DialogContent>
                        <Box className='flex flex-col items-center gap-4'>
                            {!verificationComplete ? (
                                <>
                                    <CircularProgress size={60} sx={{ color: '#0ea5e9' }} />
                                    <Typography variant='h6' className='font-semibold text-gray-800'>
                                        Mohon Tunggu
                                    </Typography>
                                    <Typography variant='body2' className='text-gray-600'>
                                        Sedang memverifikasi email Anda...
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Box
                                        className='w-16 h-16 rounded-full flex items-center justify-center'
                                        style={{ backgroundColor: verificationSuccess ? '#10b981' : '#ef4444' }}
                                    >
                                        <IconifyIcon
                                            icon={verificationSuccess ? 'mdi:check' : 'mdi:close'}
                                            className='text-white text-3xl'
                                        />
                                    </Box>
                                    <Typography variant='h6' className='font-semibold text-gray-800'>
                                        {verificationSuccess ? 'Verifikasi Berhasil!' : 'Verifikasi Gagal'}
                                    </Typography>
                                    <Typography variant='body2' className='text-gray-600'>
                                        {verificationSuccess
                                            ? 'Email Anda berhasil diverifikasi'
                                            : 'Terjadi kesalahan saat verifikasi'}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </DialogContent>
                </Dialog>
            )}

            <div className='min-h-screen flex'>
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
                    style={{ backgroundColor: '#0ea5e9' }}
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
                        className='w-full max-w-md shadow-none border-0 relative z-10'
                        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                    >
                        <CardContent className='p-0'>
                            {/* Logo */}
                            <Box className='flex justify-center items-center mb-6'>
                                <Image src='/logos.png' alt='Logo' width={100} height={100} />
                            </Box>

                            {/* Success Icon */}
                            <Box className='flex justify-center items-center mb-6'>
                                <Box
                                    className='w-20 h-20 rounded-full flex items-center justify-center'
                                    style={{ backgroundColor: verificationSuccess ? '#10b981' : '#ef4444' }}
                                >
                                    <IconifyIcon
                                        icon={verificationSuccess ? 'mdi:check-circle' : 'mdi:close-circle'}
                                        className='text-white text-4xl'
                                    />
                                </Box>
                            </Box>

                            {/* Title */}
                            <Typography
                                variant='h4'
                                className='text-center font-bold mb-4'
                                style={{ color: 'white', fontSize: '2rem', fontWeight: '700' }}
                            >
                                {verificationSuccess ? 'Email Terverifikasi!' : 'Verifikasi Gagal'}
                            </Typography>

                            {/* Description */}
                            <Typography
                                variant='body1'
                                className='text-center mb-8'
                                style={{ color: 'white', fontSize: '16px', lineHeight: '1.6' }}
                            >
                                {verificationSuccess
                                    ? 'Selamat! Email Anda telah berhasil diverifikasi. Anda sekarang dapat masuk ke akun Anda dan menikmati semua fitur yang tersedia.'
                                    : 'Maaf, terjadi kesalahan saat memverifikasi email Anda. Link verifikasi mungkin sudah kedaluwarsa atau tidak valid.'}
                            </Typography>

                            {/* Buttons */}
                            <Box className='space-y-4'>
                                {verificationSuccess ? (
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        onClick={handleGoToLogin}
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
                                        Masuk Sekarang
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            fullWidth
                                            variant='contained'
                                            onClick={handleResendVerification}
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
                                            Kirim Ulang Verifikasi
                                        </Button>

                                        <Button
                                            fullWidth
                                            variant='outlined'
                                            onClick={handleGoToLogin}
                                            sx={{
                                                borderColor: 'white',
                                                color: 'white',
                                                borderRadius: '8px',
                                                height: '48px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    borderColor: '#f3f4f6',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                },
                                            }}
                                        >
                                            Kembali ke Login
                                        </Button>
                                    </>
                                )}
                            </Box>

                            {/* Footer Text */}
                            <Box className='text-center mt-8'>
                                <Typography
                                    variant='body2'
                                    style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}
                                >
                                    Butuh bantuan?{' '}
                                    <Typography
                                        component='span'
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
                                        Hubungi Support
                                    </Typography>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default EmailVerificationPageViews
