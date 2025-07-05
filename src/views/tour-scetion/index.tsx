// components/ToursSection.tsx
import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Button,
    Paper
} from '@mui/material';
import { Icon } from '@iconify/react';
import TourCard from './tour-card';

const ToursSection: React.FC = () => {
    const tours = [
        {
            id: '1',
            title: 'Tur Bromo',
            image: '/api/placeholder/400/200',
            price: 375000,
            duration: '3 Hari',
            date: '26 Juni 2025',
            location: 'Jawa Timur',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const,
            isPopular: true
        },
        {
            id: '2',
            title: 'Tur Pulau Tegal Mas',
            image: '/api/placeholder/400/200',
            price: 3300000,
            duration: '2 Hari',
            date: '26 Juni 2025',
            location: 'Lampung',
            rating: 5.0,
            reviewCount: 250,
            type: 'Private Trip' as const
        },
        {
            id: '3',
            title: 'Tur Tana Toraja',
            image: '/api/placeholder/400/200',
            price: 1750000,
            duration: '4 Hari',
            date: '26 Juni 2025',
            location: 'Sulawesi Selatan',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const
        },
        {
            id: '4',
            title: 'Tur Candi Borobudur',
            image: '/api/placeholder/400/200',
            price: 120000,
            duration: '1 Hari',
            date: '26 Juni 2025',
            location: 'Jawa Tengah',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const
        },
        {
            id: '5',
            title: 'Tur Danau Kelimutu',
            image: '/api/placeholder/400/200',
            price: 1050000,
            duration: '3 Hari',
            date: '26 Juni 2025',
            location: 'Nusa Tenggara Timur',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const
        },
        {
            id: '6',
            title: 'Tur Kawah Ijen',
            image: '/api/placeholder/400/200',
            price: 350000,
            duration: '2 Hari',
            date: '26 Juni 2025',
            location: 'Jawa Timur',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const
        },
        {
            id: '7',
            title: 'Tur Pink Beach',
            image: '/api/placeholder/400/200',
            price: 1397000,
            duration: '3 Hari',
            date: '26 Juni 2025',
            location: 'Nusa Tenggara Timur',
            rating: 5.0,
            reviewCount: 250,
            type: 'Private Trip' as const
        },
        {
            id: '8',
            title: 'Tur Nusa Penida',
            image: '/api/placeholder/400/200',
            price: 850000,
            duration: '1 Hari',
            date: '26 Juni 2025',
            location: 'Bali',
            rating: 5.0,
            reviewCount: 250,
            type: 'Open Trip' as const
        }
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: 2,
                                backgroundColor: '#e0f2fe',
                                mr: 3
                            }}
                        >
                            <Icon
                                icon="bi:umbrella"
                                width={24}
                                height={24}
                                color="#0ea5e9"
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    ml: 1,
                                    color: '#0ea5e9',
                                    fontWeight: 'bold'
                                }}
                            >
                                Ayo Trip
                            </Typography>
                        </Paper>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                        <Box>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#1e293b',
                                    mb: 1,
                                    fontSize: { xs: '1.75rem', md: '2.125rem' }
                                }}
                            >
                                Temukan Jadwal liburanmu dengan Ayo Trip
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#64748b',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Nikmati perjalanan tak terlupakan ke destinasi terbaik Indonesia
                            </Typography>
                        </Box>

                        <Button
                            variant="text"
                            endIcon={<Icon icon="mdi:arrow-right" width={20} height={20} />}
                            sx={{
                                color: '#0ea5e9',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(14, 165, 233, 0.04)'
                                }
                            }}
                        >
                            Lihat Semua
                        </Button>
                    </Box>
                </Box>

                {/* Tours Grid */}
                <Grid container spacing={3}>
                    {tours.map((tour) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
                            <TourCard {...tour} />
                        </Grid>
                    ))}
                </Grid>

                {/* Load More Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Icon icon="mdi:refresh" width={20} height={20} />}
                        sx={{
                            borderColor: '#0ea5e9',
                            color: '#0ea5e9',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 'bold',
                            '&:hover': {
                                borderColor: '#0284c7',
                                backgroundColor: 'rgba(14, 165, 233, 0.04)'
                            }
                        }}
                    >
                        Muat Lebih Banyak
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ToursSection;