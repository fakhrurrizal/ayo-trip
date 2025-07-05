// components/TourCard.tsx
import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    IconButton,
    Button
} from '@mui/material';
import { Icon } from '@iconify/react';

interface TourCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    duration: string;
    date: string;
    location: string;
    rating: number;
    reviewCount: number;
    type: 'Open Trip' | 'Private Trip';
    isPopular?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({
    title,
    image,
    price,
    originalPrice,
    duration,
    date,
    location,
    rating,
    reviewCount,
    type,
    isPopular = false
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                },
                position: 'relative'
            }}
        >
            {/* Image Section */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={title}
                    sx={{
                        objectFit: 'cover'
                    }}
                />

                {/* Badges */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        right: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}
                >
                    <Chip
                        label={type}
                        size="small"
                        sx={{
                            backgroundColor: type === 'Open Trip' ? '#f59e0b' : '#0ea5e9',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem'
                        }}
                    />
                    {isPopular && (
                        <Chip
                            label="Popular"
                            size="small"
                            sx={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                </Box>

                {/* Favorite Button */}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <Icon icon="mdi:heart-outline" width={20} height={20} />
                </IconButton>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {title}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Icon icon="mdi:star" color="#f59e0b" width={16} height={16} />
                    <Typography
                        variant="body2"
                        sx={{ ml: 0.5, fontWeight: 'bold', color: '#374151' }}
                    >
                        {rating}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ ml: 0.5, color: '#6b7280' }}
                    >
                        ({reviewCount} ulasan)
                    </Typography>
                </Box>

                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Icon icon="mdi:map-marker" color="#6b7280" width={16} height={16} />
                    <Typography
                        variant="body2"
                        sx={{ ml: 0.5, color: '#6b7280' }}
                    >
                        {location}
                    </Typography>
                </Box>

                {/* Date and Duration */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon="mdi:calendar" color="#6b7280" width={16} height={16} />
                        <Typography
                            variant="body2"
                            sx={{ ml: 0.5, color: '#6b7280', fontSize: '0.875rem' }}
                        >
                            {date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon="mdi:clock-outline" color="#6b7280" width={16} height={16} />
                        <Typography
                            variant="body2"
                            sx={{ ml: 0.5, color: '#6b7280', fontSize: '0.875rem' }}
                        >
                            {duration}
                        </Typography>
                    </Box>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 2 }}>
                    {originalPrice && (
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: 'line-through',
                                color: '#9ca3af',
                                fontSize: '0.875rem'
                            }}
                        >
                            {formatPrice(originalPrice)}
                        </Typography>
                    )}
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#0ea5e9',
                            fontWeight: 'bold',
                            fontSize: '1.25rem'
                        }}
                    >
                        {formatPrice(price)}
                    </Typography>
                </Box>

                {/* Action Button */}
                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<Icon icon="mdi:arrow-right" width={16} height={16} />}
                    sx={{
                        backgroundColor: '#0ea5e9',
                        '&:hover': {
                            backgroundColor: '#0284c7'
                        },
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 'bold'
                    }}
                >
                    Lihat Detail
                </Button>
            </CardContent>
        </Card>
    );
};

export default TourCard;