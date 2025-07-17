// pages/tour/[id].tsx
import { Icon } from '@iconify/react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Rating,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'

interface TourDetail {
    id: string
    title: string
    images: string[]
    price: number
    originalPrice?: number
    duration: string
    date: string
    location: string
    rating: number
    reviewCount: number
    type: 'Open Trip' | 'Private Trip'
    isPopular: boolean
    description: string
    highlights: string[]
    included: string[]
    excluded: string[]
    itinerary: {
        day: number
        title: string
        activities: string[]
        meals: string[]
        accommodation?: string
    }[]
    meetingPoint: string
    minParticipants: number
    maxParticipants: number
    availableSlots: number
    guide: {
        name: string
        avatar: string
        rating: number
        experience: string
    }
    reviews: {
        id: string
        userName: string
        userAvatar: string
        rating: number
        comment: string
        date: string
        images?: string[]
    }[]
}

interface TourDetailPageProps {
    tour: TourDetail
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour }) => {
    const [activeTab, setActiveTab] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)
    const [participants, setParticipants] = useState(1)
    const [selectedDate, setSelectedDate] = useState(tour.date)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const availableDates = ['26 Juni 2025', '3 Juli 2025', '10 Juli 2025', '17 Juli 2025']

    return (
        <>
            <Head>
                <title>{tour.title} | Ayo Trip</title>
                <meta name='description' content={tour.description} />
            </Head>

            <Container maxWidth='xl' sx={{ py: 4 }}>
                {/* Breadcrumb */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='body2' color='text.secondary'>
                        <span style={{ cursor: 'pointer' }}>Beranda</span> /
                        <span style={{ cursor: 'pointer' }}> Destinasi</span> /
                        <span style={{ cursor: 'pointer' }}> {tour.location}</span> /{tour.title}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Content */}
                    <Grid item xs={12} lg={8}>
                        {/* Header */}
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {tour.isPopular && <Chip label='Populer' color='error' size='small' sx={{ mr: 1 }} />}
                                <Chip
                                    label={tour.type}
                                    color={tour.type === 'Open Trip' ? 'primary' : 'secondary'}
                                    size='small'
                                />
                            </Box>

                            <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', mb: 2 }}>
                                {tour.title}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating value={tour.rating} readOnly size='small' />
                                <Typography variant='body2' sx={{ ml: 1 }}>
                                    {tour.rating} ({tour.reviewCount} ulasan)
                                </Typography>
                                <Box sx={{ mx: 1 }}>•</Box>
                                <Icon icon='mdi:map-marker' width={16} height={16} />
                                <Typography variant='body2' sx={{ ml: 0.5 }}>
                                    {tour.location}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Image Gallery */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                                <Image
                                    src={tour.images[selectedImage]}
                                    alt={tour.title}
                                    width={800}
                                    height={400}
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                                {tour.images.map((image, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            minWidth: 80,
                                            height: 60,
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid #0ea5e9' : 'none',
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${tour.title} ${index + 1}`}
                                            width={80}
                                            height={60}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Tabs */}
                        <Box sx={{ mb: 4 }}>
                            <Tabs value={activeTab} onChange={handleTabChange} variant='scrollable'>
                                <Tab label='Deskripsi' />
                                <Tab label='Itinerary' />
                                <Tab label='Termasuk/Tidak' />
                                <Tab label='Ulasan' />
                            </Tabs>

                            <Box sx={{ mt: 3 }}>
                                {/* Description Tab */}
                                {activeTab === 0 && (
                                    <Box>
                                        <Typography variant='body1' paragraph>
                                            {tour.description}
                                        </Typography>

                                        <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                                            Highlight Perjalanan
                                        </Typography>
                                        <List>
                                            {tour.highlights.map((highlight, index) => (
                                                <ListItem key={index} sx={{ py: 0.5 }}>
                                                    <ListItemIcon>
                                                        <Icon icon='mdi:check-circle' color='#10b981' />
                                                    </ListItemIcon>
                                                    <ListItemText primary={highlight} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {/* Itinerary Tab */}
                                {activeTab === 1 && (
                                    <Box>
                                        {tour.itinerary.map((day, index) => (
                                            <Card key={index} sx={{ mb: 2 }}>
                                                <CardContent>
                                                    <Typography variant='h6' sx={{ mb: 1 }}>
                                                        Hari {day.day}: {day.title}
                                                    </Typography>

                                                    <Typography variant='subtitle2' sx={{ mb: 1 }}>
                                                        Aktivitas:
                                                    </Typography>
                                                    <List dense>
                                                        {day.activities.map((activity, i) => (
                                                            <ListItem key={i}>
                                                                <ListItemIcon>
                                                                    <Icon icon='mdi:clock-outline' />
                                                                </ListItemIcon>
                                                                <ListItemText primary={activity} />
                                                            </ListItem>
                                                        ))}
                                                    </List>

                                                    {day.meals.length > 0 && (
                                                        <>
                                                            <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                                                                Makan:
                                                            </Typography>
                                                            <Typography variant='body2'>
                                                                {day.meals.join(', ')}
                                                            </Typography>
                                                        </>
                                                    )}

                                                    {day.accommodation && (
                                                        <>
                                                            <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                                                                Akomodasi:
                                                            </Typography>
                                                            <Typography variant='body2'>{day.accommodation}</Typography>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                )}

                                {/* Included/Excluded Tab */}
                                {activeTab === 2 && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='h6' sx={{ mb: 2, color: '#10b981' }}>
                                                Termasuk
                                            </Typography>
                                            <List>
                                                {tour.included.map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                                        <ListItemIcon>
                                                            <Icon icon='mdi:check-circle' color='#10b981' />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Typography variant='h6' sx={{ mb: 2, color: '#ef4444' }}>
                                                Tidak Termasuk
                                            </Typography>
                                            <List>
                                                {tour.excluded.map((item, index) => (
                                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                                        <ListItemIcon>
                                                            <Icon icon='mdi:close-circle' color='#ef4444' />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                )}

                                {/* Reviews Tab */}
                                {activeTab === 3 && (
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <Typography variant='h6' sx={{ mr: 2 }}>
                                                Ulasan Pelanggan
                                            </Typography>
                                            <Rating value={tour.rating} readOnly />
                                            <Typography variant='body2' sx={{ ml: 1 }}>
                                                {tour.rating} dari {tour.reviewCount} ulasan
                                            </Typography>
                                        </Box>

                                        {tour.reviews.map(review => (
                                            <Card key={review.id} sx={{ mb: 2 }}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Avatar src={review.userAvatar} sx={{ mr: 2 }}>
                                                            {review.userName[0]}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant='subtitle2'>
                                                                {review.userName}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Rating value={review.rating} size='small' readOnly />
                                                                <Typography variant='caption' sx={{ ml: 1 }}>
                                                                    {review.date}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant='body2'>{review.comment}</Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Sidebar - Booking */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ position: 'sticky', top: 20 }}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            {tour.originalPrice && (
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        textDecoration: 'line-through',
                                                        color: 'text.secondary',
                                                        mr: 1,
                                                    }}
                                                >
                                                    {formatPrice(tour.originalPrice)}
                                                </Typography>
                                            )}
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#0ea5e9' }}>
                                                {formatPrice(tour.price)}
                                            </Typography>
                                        </Box>
                                        <Typography variant='body2' color='text.secondary'>
                                            per orang
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Tour Info */}
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Icon icon='mdi:calendar' width={20} height={20} />
                                            <Typography variant='body2' sx={{ ml: 1 }}>
                                                Durasi: {tour.duration}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Icon icon='mdi:account-group' width={20} height={20} />
                                            <Typography variant='body2' sx={{ ml: 1 }}>
                                                {tour.minParticipants}-{tour.maxParticipants} orang
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Icon icon='mdi:map-marker' width={20} height={20} />
                                            <Typography variant='body2' sx={{ ml: 1 }}>
                                                {tour.meetingPoint}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Guide Info */}
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant='subtitle2' sx={{ mb: 1 }}>
                                            Pemandu Wisata
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar src={tour.guide.avatar} sx={{ mr: 2 }}>
                                                {tour.guide.name[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                                                    {tour.guide.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Rating value={tour.guide.rating} size='small' readOnly />
                                                    <Typography variant='caption' sx={{ ml: 1 }}>
                                                        {tour.guide.experience}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Booking Form */}
                                    <Box>
                                        <TextField
                                            select
                                            label='Pilih Tanggal'
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        >
                                            {availableDates.map(date => (
                                                <MenuItem key={date} value={date}>
                                                    {date}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField
                                            select
                                            label='Jumlah Peserta'
                                            value={participants}
                                            onChange={e => setParticipants(Number(e.target.value))}
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        >
                                            {Array.from({ length: tour.maxParticipants }, (_, i) => i + 1).map(num => (
                                                <MenuItem key={num} value={num}>
                                                    {num} orang
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography variant='body2'>Total Pembayaran:</Typography>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                                {formatPrice(tour.price * participants)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Icon icon='mdi:account-check' color='#10b981' width={16} height={16} />
                                            <Typography variant='caption' sx={{ ml: 1, color: '#10b981' }}>
                                                Tersisa {tour.availableSlots} slot
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant='contained'
                                            fullWidth
                                            size='large'
                                            sx={{
                                                backgroundColor: '#0ea5e9',
                                                '&:hover': { backgroundColor: '#0284c7' },
                                                mb: 1,
                                            }}
                                        >
                                            Pesan Sekarang
                                        </Button>

                                        <Button
                                            variant='outlined'
                                            fullWidth
                                            startIcon={<Icon icon='mdi:heart-outline' />}
                                            sx={{
                                                borderColor: '#0ea5e9',
                                                color: '#0ea5e9',
                                            }}
                                        >
                                            Simpan ke Wishlist
                                        </Button>
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

// Sample data - in real app, this would come from API
export const getServerSideProps: GetServerSideProps = async context => {
    const { id } = context.params!

    // Mock data - replace with actual API call
    const tour: TourDetail = {
        id: id as string,
        title: 'Tur Bromo',
        images: [
            '/api/placeholder/800/400',
            '/api/placeholder/800/400',
            '/api/placeholder/800/400',
            '/api/placeholder/800/400',
        ],
        price: 375000,
        originalPrice: 450000,
        duration: '3 Hari',
        date: '26 Juni 2025',
        location: 'Jawa Timur',
        rating: 5.0,
        reviewCount: 250,
        type: 'Open Trip',
        isPopular: true,
        description:
            'Nikmati keindahan matahari terbit di Gunung Bromo yang spektakuler. Perjalanan ini akan membawa Anda menjelajahi keajaiban alam Jawa Timur dengan pemandangan yang tak terlupakan.',
        highlights: [
            'Menyaksikan sunrise terbaik di Penanjakan 1',
            'Eksplorasi kawah Gunung Bromo',
            'Berkuda di lautan pasir',
            'Kunjungi Air Terjun Madakaripura',
            'Pemandu lokal berpengalaman',
        ],
        included: [
            'Transportasi AC selama tour',
            'Makan sesuai program',
            'Tiket masuk objek wisata',
            'Pemandu wisata profesional',
            'Asuransi perjalanan',
            'Jeep 4WD ke Bromo',
        ],
        excluded: [
            'Makan di luar program',
            'Pengeluaran pribadi',
            'Tips untuk guide dan driver',
            'Biaya dokumen perjalanan',
        ],
        itinerary: [
            {
                day: 1,
                title: 'Perjalanan Menuju Bromo',
                activities: [
                    'Penjemputan di meeting point',
                    'Perjalanan menuju Malang',
                    'Makan siang di restoran lokal',
                    'Check-in hotel',
                    'Istirahat dan persiapan untuk esok hari',
                ],
                meals: ['Makan Siang', 'Makan Malam'],
                accommodation: 'Hotel Bromo View (atau setara)',
            },
            {
                day: 2,
                title: 'Sunrise dan Eksplorasi Bromo',
                activities: [
                    'Berangkat dini hari menuju Penanjakan 1',
                    'Menyaksikan sunrise spektakuler',
                    'Eksplorasi kawah Gunung Bromo',
                    'Berkuda di lautan pasir',
                    'Kunjungi Pura Luhur Poten',
                ],
                meals: ['Sarapan', 'Makan Siang'],
                accommodation: 'Hotel Bromo View (atau setara)',
            },
            {
                day: 3,
                title: 'Air Terjun Madakaripura',
                activities: [
                    'Check-out hotel',
                    'Perjalanan ke Air Terjun Madakaripura',
                    'Trekking menuju air terjun',
                    'Makan siang',
                    'Perjalanan kembali ke kota asal',
                ],
                meals: ['Sarapan', 'Makan Siang'],
            },
        ],
        meetingPoint: 'Stasiun Malang',
        minParticipants: 2,
        maxParticipants: 15,
        availableSlots: 8,
        guide: {
            name: 'Budi Santoso',
            avatar: '/api/placeholder/40/40',
            rating: 4.9,
            experience: '5 tahun pengalaman',
        },
        reviews: [
            {
                id: '1',
                userName: 'Sarah Wijaya',
                userAvatar: '/api/placeholder/40/40',
                rating: 5,
                comment:
                    'Pengalaman yang luar biasa! Pemandangan sunrise di Bromo benar-benar memukau. Guide sangat ramah dan profesional.',
                date: '2 minggu yang lalu',
            },
            {
                id: '2',
                userName: 'Andi Pratama',
                userAvatar: '/api/placeholder/40/40',
                rating: 5,
                comment:
                    'Trip yang sangat terorganisir dengan baik. Semua fasilitas sesuai dengan yang dijanjikan. Recommended!',
                date: '1 bulan yang lalu',
            },
        ],
    }

    return {
        props: {
            tour,
        },
    }
}

export default TourDetailPage
