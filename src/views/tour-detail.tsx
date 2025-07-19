import { useAuth } from '@/services'
import { formatToIDR } from '@/utils/helpers/format-number.helper'
import { useTripID } from '@/utils/quries/use-destination.query'
import { Icon } from '@iconify/react'
import { Avatar, Box, Card, CardContent, Container, Divider, Grid, Rating, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const TourDetailPage = () => {
    const imageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { id } = router.query
    const tripId = typeof id === 'string' ? Number(id) : undefined
    const { data: tour } = useTripID(Number(tripId))
    const [isClient, setIsClient] = useState(false)

    const user = useAuth(state => state.value.user)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [imageHeight, setImageHeight] = useState<number>(0)

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.offsetHeight)
        }
    }, [tour?.image])

    if (!isClient) return null

    return (
        <>
            <Head>
                <title>{tour?.title || 'Tour Details'} | Ayo Trip</title>
                <meta name='description' content={tour?.description || 'Tour details'} />
            </Head>
            <Container maxWidth='xl' sx={{ py: 4 }} ref={containerRef}>
                {/* Breadcrumb */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='body2' color='text.secondary'>
                        <span style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
                            Beranda
                        </span>{' '}
                        /<span style={{ cursor: 'pointer' }}> Destinasi</span> /
                        <span style={{ cursor: 'pointer' }}> {tour?.location || 'Lokasi'}</span> /
                        {tour?.title || 'Tour'}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ mb: 4 }}>
                            {/* Gambar Utama */}
                            <Box
                                ref={imageRef}
                                sx={{
                                    position: 'relative',
                                    mb: 2,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: { xs: 300, sm: 400, md: 500 },
                                    width: '100%',
                                }}
                            >
                                {tour?.image && tour.image.length > 0 ? (
                                    <Image
                                        src={tour.image[0]}
                                        alt={tour?.title || 'Tour image'}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'grey.200',
                                        }}
                                    >
                                        <Typography variant='body2' color='text.secondary'>
                                            Gambar tidak tersedia
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Thumbnail Gallery */}
                            {tour?.image && Array.isArray(tour.image) && tour.image.length > 1 && (
                                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 3 }}>
                                    {tour.image.map((img: any, index: number) =>
                                        img ? (
                                            <Box
                                                key={`thumbnail-${tour.id || 'unknown'}-${index}`}
                                                sx={{
                                                    minWidth: 80,
                                                    height: 60,
                                                    borderRadius: 1,
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    border: '2px solid #0ea5e9',
                                                }}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    width={80}
                                                    height={60}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    unoptimized
                                                    onError={e => {
                                                        const target = e.target as HTMLImageElement
                                                        target.style.display = 'none'
                                                    }}
                                                />
                                            </Box>
                                        ) : null
                                    )}
                                </Box>
                            )}

                            {/* Deskripsi Tour */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    Deskripsi
                                </Typography>
                                <Typography variant='body1' paragraph color='text.secondary'>
                                    {tour?.description || 'Deskripsi tour tidak tersedia.'}
                                </Typography>
                            </Box>

                            {/* Highlight Perjalanan (Opsional) */}
                            {tour?.highlights && tour.highlights.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant='h6' gutterBottom>
                                        Highlight Perjalanan
                                    </Typography>
                                    <ul>
                                        {tour.highlights.map((highlight: string, idx: number) => (
                                            <li key={`highlight-${idx}`}>
                                                <Typography variant='body2' color='text.secondary'>
                                                    {highlight}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Box
                            sx={{
                                position: { xs: 'relative', lg: 'absolute' },
                                top: { lg: imageHeight > 0 ? imageRef.current?.offsetTop : 0 },
                                width: { lg: '100%' },
                                maxWidth: { lg: 360 },
                                mt: { xs: 4, lg: 0 },
                                right: { lg: 60 },
                                zIndex: 1,
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#0ea5e9' }}>
                                                {tour?.base_price
                                                    ? formatToIDR(tour.base_price)
                                                    : 'Harga tidak tersedia'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    {/* Tour Info */}
                                    <Box sx={{ mb: 3 }}>
                                        {tour?.duration && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Icon icon='mdi:calendar' width={20} height={20} />
                                                <Typography variant='body2' sx={{ ml: 1 }}>
                                                    Durasi: {tour.duration}
                                                </Typography>
                                            </Box>
                                        )}
                                        {(tour?.min_capacity || tour?.max_capacity) && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Icon icon='mdi:account-group' width={20} height={20} />
                                                <Typography variant='body2' sx={{ ml: 1 }}>
                                                    {tour?.min_capacity || 1}-{tour?.max_capacity || 'Max'} orang
                                                </Typography>
                                            </Box>
                                        )}
                                        {tour?.meetingPoint && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Icon icon='mdi:map-marker' width={20} height={20} />
                                                <Typography variant='body2' sx={{ ml: 1 }}>
                                                    {tour.meetingPoint}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant='subtitle2' sx={{ mb: 1 }}>
                                            Pemandu Wisata
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ mr: 2 }}>T</Avatar>
                                            <Box>
                                                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                                                    Trisno
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Rating value={4.6} size='small' readOnly precision={0.1} />
                                                    <Typography variant='caption' sx={{ ml: 1 }}>
                                                        5 Tahun
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 4 }}>
                                        <button
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                backgroundColor: '#0ea5e9',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                if (user) {
                                                    router.push(`/payment/${tour.id}`)
                                                } else {
                                                    router.push(`/auth/login?returnUrl=/payment/${tour.id}`)
                                                }
                                            }}
                                        >
                                            Lanjutkan Pembayaran
                                        </button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TourDetailPage
