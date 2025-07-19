'use client'

import { formatToIDR } from '@/utils/helpers/format-number.helper'
import { Icon } from '@iconify/react'
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'

interface TourCardProps {
    tour: any
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    const router = useRouter()

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
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                },
                position: 'relative',
            }}
        >
            {/* Image Section */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component='img'
                    image={tour?.image?.[0]}
                    alt={tour?.name}
                    sx={{
                        height: 200,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                    }}
                >
                    <Chip
                        label={tour?.trip_category?.name}
                        size='small'
                        sx={{
                            backgroundColor: tour?.trip_category?.name === 'Open Trip' ? '#f59e0b' : '#0ea5e9',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                        }}
                    />
                </Box>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                <Typography
                    variant='h6'
                    component='h3'
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {tour?.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Icon icon='mdi:map-marker' color='#6b7280' width={16} height={16} />
                    <Typography variant='body2' sx={{ ml: 0.5, color: '#6b7280' }}>
                        {tour?.location}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon='mdi:calendar' color='#6b7280' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, color: '#6b7280', fontSize: '0.875rem' }}>
                            {dayjs(tour?.start_date).format('DD MMMM YYYY')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon='mdi:clock-outline' color='#6b7280' width={16} height={16} />
                        <Typography variant='body2' sx={{ ml: 0.5, color: '#6b7280', fontSize: '0.875rem' }}>
                            {tour?.duration}
                        </Typography>
                    </Box>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant='h6'
                        sx={{
                            color: '#0ea5e9',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                        }}
                    >
                        {formatToIDR(tour?.base_price)}
                    </Typography>
                </Box>

                {/* Detail Button */}
                <Box sx={{ mt: 'auto' }}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={() => router.push(`/trip-detail/${tour?.id}`)}
                        endIcon={<Icon icon='mdi:arrow-right' width={16} height={16} />}
                        sx={{
                            backgroundColor: '#0ea5e9',
                            '&:hover': {
                                backgroundColor: '#0284c7',
                            },
                            borderRadius: 2,
                            py: 1,
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                        }}
                    >
                        Lihat Detail
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default TourCard
