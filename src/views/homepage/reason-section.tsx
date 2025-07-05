import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Avatar,
    Stack
} from '@mui/material';
import { Icon } from '@iconify/react';

const WhyChooseSection = () => {
    const features = [
        {
            id: 1,
            icon: "mdi:map-marker-multiple",
            title: "100+ Destinasi",
            description: "Jelajahi lebih dari 100 destinasi wisata terbaik di seluruh Indonesia",
            color: "#10b981"
        },
        {
            id: 2,
            icon: "mdi:account-group",
            title: "50+ Open Trip",
            description: "Bergabung dengan traveler lain dalam perjalanan yang seru dan berkesan",
            color: "#f59e0b"
        },
        {
            id: 3,
            icon: "mdi:heart",
            title: "1000+ Happy Traveler",
            description: "Ribuan pelanggan yang puas dengan layanan dan pengalaman kami",
            color: "#ef4444"
        },
        {
            id: 4,
            icon: "mdi:shield-check",
            title: "Terpercaya & Aman",
            description: "Perjalanan yang aman dengan panduan profesional dan asuransi perjalanan",
            color: "#8b5cf6"
        },
        {
            id: 5,
            icon: "mdi:currency-usd",
            title: "Harga Terjangkau",
            description: "Paket wisata dengan harga bersaing dan tanpa biaya tersembunyi",
            color: "#06b6d4"
        },
        {
            id: 6,
            icon: "mdi:headset",
            title: "24/7 Support",
            description: "Tim customer service siap membantu Anda kapan saja dibutuhkan",
            color: "#84cc16"
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Fitria",
            location: "Jakarta",
            avatar: "https://i.pravatar.cc/150?img=1",
            rating: 5,
            comment: "Perjalanan ke Bromo sangat memuaskan! Guide profesional dan pemandangan luar biasa."
        },
        {
            id: 2,
            name: "Ahmad Rizki",
            location: "Bandung",
            avatar: "https://i.pravatar.cc/150?img=2",
            rating: 5,
            comment: "Open trip ke Raja Ampat menjadi pengalaman tak terlupakan. Highly recommended!"
        },
        {
            id: 3,
            name: "Putri Ayu",
            location: "Surabaya",
            avatar: "https://i.pravatar.cc/150?img=3",
            rating: 5,
            comment: "Pelayanan excellent, harga reasonable. Pasti akan trip lagi dengan Ayo Trip!"
        }
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e293b',
                            mb: 2,
                            fontSize: { xs: '1.875rem', md: '2.5rem' }
                        }}
                    >
                        Mengapa Memilih Ayo Trip?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Kami berkomitmen memberikan pengalaman perjalanan terbaik dengan layanan profesional dan harga terjangkau
                    </Typography>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={4} key={feature.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 56,
                                            height: 56,
                                            borderRadius: 2,
                                            backgroundColor: `${feature.color}15`,
                                            mr: 2
                                        }}
                                    >
                                        <Icon
                                            icon={feature.icon}
                                            width={28}
                                            height={28}
                                            color={feature.color}
                                        />
                                    </Paper>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#1e293b',
                                                mb: 1
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Testimonials Section */}
                <Box sx={{ backgroundColor: '#f8fafc', borderRadius: 4, p: 6 }}>
                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e293b',
                            mb: 1,
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                    >
                        Apa Kata Mereka?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            textAlign: 'center',
                            mb: 4
                        }}
                    >
                        Testimoni dari traveler yang telah merasakan pengalaman bersama kami
                    </Typography>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial) => (
                            <Grid item xs={12} md={4} key={testimonial.id}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            sx={{ width: 50, height: 50, mr: 2 }}
                                        />
                                        <Box>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 'bold', color: '#1e293b' }}
                                            >
                                                {testimonial.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#64748b' }}
                                            >
                                                {testimonial.location}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                                        {[...Array(testimonial.rating)].map((_, index) => (
                                            <Icon
                                                key={index}
                                                icon="mdi:star"
                                                width={18}
                                                height={18}
                                                color="#fbbf24"
                                            />
                                        ))}
                                    </Stack>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#475569',
                                            fontStyle: 'italic',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        "{testimonial.comment}"
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e293b',
                            mb: 2
                        }}
                    >
                        Siap Memulai Petualangan Anda?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            mb: 4
                        }}
                    >
                        Jelajahi destinasi impian Anda bersama ribuan traveler lainnya
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ justifyContent: 'center' }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Icon icon="mdi:calendar-check" width={20} height={20} />}
                            sx={{
                                backgroundColor: '#0ea5e9',
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#0284c7'
                                }
                            }}
                        >
                            Lihat Jadwal Open Trip
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<Icon icon="mdi:account-group" width={20} height={20} />}
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
                            Buat Private Trip
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default WhyChooseSection;