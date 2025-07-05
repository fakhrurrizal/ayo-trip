import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    Stack,
    Paper,
    IconButton,
    Backdrop,
} from '@mui/material';
import { Icon } from '@iconify/react';

// Type definitions
interface Category {
    id: number;
    name: string;
    icon: string;
}

interface Destination {
    id: number;
    name: string;
    location: string;
    category: string;
    image: string;
    description: string;
    rating: number;
    tours: number;
    startingPrice: string;
    tags: string[];
}

const PopularDestinationsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [isClient, setIsClient] = useState(false);

    const categories: Category[] = [
        { id: 0, name: 'Semua', icon: 'mdi:earth' },
        { id: 1, name: 'Pantai', icon: 'mdi:beach' },
        { id: 2, name: 'Gunung', icon: 'mdi:mountain' },
        { id: 3, name: 'Budaya', icon: 'mdi:temple-buddhist' },
        { id: 4, name: 'Kuliner', icon: 'mdi:food' }
    ];

    const destinations: Destination[] = [
        {
            id: 1,
            name: 'Raja Ampat',
            location: 'Papua Barat',
            category: 'Pantai',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Surga bawah laut dengan keanekaragaman hayati terbesar di dunia',
            rating: 4.9,
            tours: 15,
            startingPrice: 'Rp 2.500.000',
            tags: ['Diving', 'Snorkeling', 'Island Hopping']
        },
        {
            id: 2,
            name: 'Bromo Tengger',
            location: 'Jawa Timur',
            category: 'Gunung',
            image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Pemandangan sunrise spektakuler di atas lautan pasir',
            rating: 4.8,
            tours: 25,
            startingPrice: 'Rp 375.000',
            tags: ['Sunrise', 'Trekking', 'Photography']
        },
        {
            id: 3,
            name: 'Borobudur',
            location: 'Jawa Tengah',
            category: 'Budaya',
            image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Candi Buddha terbesar di dunia dengan arsitektur yang megah',
            rating: 4.7,
            tours: 18,
            startingPrice: 'Rp 450.000',
            tags: ['Heritage', 'Sunrise', 'Culture']
        },
        {
            id: 4,
            name: 'Labuan Bajo',
            location: 'Nusa Tenggara Timur',
            category: 'Pantai',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Gerbang menuju Taman Nasional Komodo dengan pemandangan memukau',
            rating: 4.9,
            tours: 22,
            startingPrice: 'Rp 1.750.000',
            tags: ['Komodo', 'Island Hopping', 'Sunset']
        },
        {
            id: 5,
            name: 'Kawah Ijen',
            location: 'Jawa Timur',
            category: 'Gunung',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Fenomena blue fire yang langka dan danau kawah belerang',
            rating: 4.6,
            tours: 12,
            startingPrice: 'Rp 350.000',
            tags: ['Blue Fire', 'Hiking', 'Adventure']
        },
        {
            id: 6,
            name: 'Yogyakarta',
            location: 'Daerah Istimewa Yogyakarta',
            category: 'Kuliner',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Kota budaya dengan kuliner tradisional dan modern yang menggugah selera',
            rating: 4.8,
            tours: 30,
            startingPrice: 'Rp 280.000',
            tags: ['Culinary', 'Culture', 'Heritage']
        },
        {
            id: 7,
            name: 'Nusa Penida',
            location: 'Bali',
            category: 'Pantai',
            image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Pulau eksotis dengan tebing-tebing dramatis dan pantai tersembunyi',
            rating: 4.7,
            tours: 20,
            startingPrice: 'Rp 850.000',
            tags: ['Instagram Worthy', 'Snorkeling', 'Adventure']
        },
        {
            id: 8,
            name: 'Tana Toraja',
            location: 'Sulawesi Selatan',
            category: 'Budaya',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Budaya unik dengan rumah tradisional Tongkonan yang ikonik',
            rating: 4.5,
            tours: 8,
            startingPrice: 'Rp 1.200.000',
            tags: ['Traditional', 'Culture', 'Architecture']
        }
    ];

    // Client-side only rendering untuk menghindari hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCategoryChange = useCallback((categoryId: number) => {
        setSelectedCategory(categoryId);
    }, []);

    const filteredDestinations: Destination[] = selectedCategory === 0
        ? destinations
        : destinations.filter(dest => dest.category === categories[selectedCategory]?.name);

    const handleDestinationClick = useCallback((destination: Destination) => {
        setSelectedDestination(destination);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedDestination(null);
    }, []);

    const handleModalContentClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    // Render loading state untuk SSR
    if (!isClient) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
                <Container maxWidth="xl">
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
                            Destinasi Populer
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#64748b',
                                fontSize: '1.1rem',
                                maxWidth: '600px',
                                mx: 'auto',
                                mb: 4
                            }}
                        >
                            Jelajahi destinasi wisata terfavorit di Indonesia yang wajib dikunjungi
                        </Typography>

                        {/* Loading skeleton */}
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'inline-block',
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden',
                                p: 2
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {[...Array(5)].map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 100,
                                            height: 32,
                                            backgroundColor: '#f1f5f9',
                                            borderRadius: 2,
                                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
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
                        Destinasi Populer
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto',
                            mb: 4
                        }}
                    >
                        Jelajahi destinasi wisata terfavorit di Indonesia yang wajib dikunjungi
                    </Typography>

                    {/* Category Buttons - Mengganti Tabs dengan ButtonGroup */}
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'inline-block',
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden',
                            p: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {categories.map((category: Category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    variant={selectedCategory === category.id ? 'contained' : 'text'}
                                    startIcon={<Icon icon={category.icon} width={20} height={20} />}
                                    sx={{
                                        textTransform: 'none',
                                        minWidth: 120,
                                        height: 40,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        ...(selectedCategory === category.id
                                            ? {
                                                backgroundColor: '#0ea5e9',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#0284c7'
                                                }
                                            }
                                            : {
                                                color: '#64748b',
                                                '&:hover': {
                                                    backgroundColor: '#f1f5f9'
                                                }
                                            })
                                    }}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                </Box>

                {/* Destinations Grid */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {filteredDestinations.map((destination: Destination) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={destination.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                    }
                                }}
                                onClick={() => handleDestinationClick(destination)}
                            >
                                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={destination.image}
                                        alt={destination.name}
                                        sx={{
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            borderRadius: 2,
                                            px: 1,
                                            py: 0.5
                                        }}
                                    >
                                        <Icon icon="mdi:star" width={16} height={16} color="#fbbf24" />
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'white', ml: 0.5, fontWeight: 'bold' }}
                                        >
                                            {destination.rating}
                                        </Typography>
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}
                                            >
                                                {destination.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Icon icon="mdi:map-marker" width={16} height={16} color="#64748b" />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: '#64748b', ml: 0.5 }}
                                                >
                                                    {destination.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={destination.category}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#e0f2fe',
                                                color: '#0ea5e9',
                                                fontWeight: 'bold',
                                                border: 'none'
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#64748b',
                                            mb: 2,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {destination.description}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                                        {destination.tags.slice(0, 2).map((tag: string, index: number) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#cbd5e1',
                                                    color: '#475569',
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        ))}
                                    </Stack>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#64748b', fontSize: '0.875rem' }}
                                            >
                                                Mulai dari
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', color: '#0ea5e9' }}
                                            >
                                                {destination.startingPrice}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#64748b' }}
                                        >
                                            {destination.tours} paket
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* CTA Section */}
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon icon="mdi:compass" width={20} height={20} />}
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
                        Jelajahi Semua Destinasi
                    </Button>
                </Box>
            </Container>

            {/* Modal for Destination Detail */}
            {selectedDestination && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backdropFilter: 'blur(4px)'
                    }}
                    open={Boolean(selectedDestination)}
                    onClick={handleCloseModal}
                >
                    <Paper
                        sx={{
                            maxWidth: 600,
                            width: '90%',
                            maxHeight: '80vh',
                            overflow: 'auto',
                            borderRadius: 3,
                            p: 0,
                            m: 2
                        }}
                        onClick={handleModalContentClick}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={selectedDestination.image}
                                alt={selectedDestination.name}
                            />
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)'
                                    }
                                }}
                            >
                                <Icon icon="mdi:close" width={24} height={24} />
                            </IconButton>
                        </Box>

                        <Box sx={{ p: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {selectedDestination.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Icon icon="mdi:map-marker" width={20} height={20} color="#64748b" />
                                <Typography variant="body1" sx={{ color: '#64748b', ml: 1 }}>
                                    {selectedDestination.location}
                                </Typography>
                            </Box>

                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                {selectedDestination.description}
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                                {selectedDestination.tags.map((tag: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        sx={{
                                            backgroundColor: '#e0f2fe',
                                            color: '#0ea5e9',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon icon="mdi:star" width={20} height={20} color="#fbbf24" />
                                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                                        {selectedDestination.rating}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ color: '#64748b' }}>
                                    {selectedDestination.tours} paket tersedia
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#0ea5e9',
                                        py: 1.5,
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#0284c7'
                                        }
                                    }}
                                >
                                    Lihat Paket Tour
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        borderColor: '#0ea5e9',
                                        color: '#0ea5e9',
                                        py: 1.5,
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            borderColor: '#0284c7',
                                            backgroundColor: 'rgba(14, 165, 233, 0.04)'
                                        }
                                    }}
                                >
                                    Konsultasi
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Backdrop>
            )}
        </Box>
    );
};

export default PopularDestinationsSection;