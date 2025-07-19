// components/ToursSection.tsx
import { useTripParams } from '@/utils/quries/use-destination.query'
import { Icon } from '@iconify/react'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TourCard from './tour-card'

const ToursSection: React.FC = () => {
    const { data: { data: TripList = [] } = { data: [] } } = useTripParams({
        pageSize: 8,
        pageIndex: 1,
    })

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8fafc' }} id='explore'>
            <Container maxWidth='xl'>
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
                                mr: 3,
                            }}
                        >
                            <Icon icon='bi:umbrella' width={24} height={24} color='#0ea5e9' />
                            <Typography
                                variant='body2'
                                sx={{
                                    ml: 1,
                                    color: '#0ea5e9',
                                    fontWeight: 'bold',
                                }}
                            >
                                Ayo Trip
                            </Typography>
                        </Paper>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                        <Box>
                            <Typography
                                variant='h4'
                                component='h2'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#1e293b',
                                    mb: 1,
                                    fontSize: { xs: '1.75rem', md: '2.125rem' },
                                }}
                            >
                                Temukan Jadwal liburanmu dengan Ayo Trip
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#64748b',
                                    fontSize: '1.1rem',
                                }}
                            >
                                Nikmati perjalanan tak terlupakan ke destinasi terbaik Indonesia
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Tours Grid */}
                <Grid container spacing={3}>
                    {TripList?.map((tour: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
                            <TourCard tour={tour} />
                        </Grid>
                    ))}
                </Grid>

                {/* Load More Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Button
                        variant='outlined'
                        size='large'
                        startIcon={<Icon icon='mdi:refresh' width={20} height={20} />}
                        sx={{
                            borderColor: '#0ea5e9',
                            color: '#0ea5e9',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 'bold',
                            '&:hover': {
                                borderColor: '#0284c7',
                                backgroundColor: 'rgba(14, 165, 233, 0.04)',
                            },
                        }}
                    >
                        Muat Lebih Banyak
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default ToursSection
