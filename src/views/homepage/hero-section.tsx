// components/HeroSection.tsx
import { ServerSideAutoComplete } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { Box, Chip, Container, IconButton, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HomeForm, homeSchema } from './home.schemas'

const HeroSection: React.FC = () => {
    const form = useForm<HomeForm>({
        defaultValues: {
            trip_id: null,
        },
        resolver: zodResolver(homeSchema),
    })
    const router = useRouter()

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/image.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.5))',
                    zIndex: 1,
                },
            }}
        >
            <Container
                maxWidth='lg'
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    py: 8,
                }}
            >
                {/* Main Heading */}
                <Typography
                    variant='h1'
                    component='h1'
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.2,
                    }}
                >
                    Temukan Tempat Baru, Buat
                </Typography>
                <Typography
                    variant='h1'
                    component='h1'
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 4,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.2,
                    }}
                >
                    Kenangan Tak Terlupakan
                </Typography>

                {/* Search Box */}
                <Paper
                    elevation={8}
                    sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <ServerSideAutoComplete<
                        HomeForm,
                        { id: number; label: string; location?: string; category?: { name: string }; image?: string },
                        any
                    >
                        control={form.control}
                        endpoint='trip'
                        name='trip_id'
                        label=''
                        size='medium'
                        placeholder='Cari destinasi impianmu...'
                        formatOptions={response => {
                            const options = response.data
                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.id,
                                label: option.name,
                                location: option.location,
                                category: option.category,
                                image: option.image || option.thumbnail || '/default-trip.jpg', // fallback image
                            }))
                        }}
                        renderOption={(props, option) => (
                            <Box
                                component='li'
                                {...props}
                                sx={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    py: 2,
                                    px: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#f8fafc',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    },
                                }}
                                onClick={() => {
                                    // Close the autocomplete first
                                    const autocompleteElement = document.querySelector(
                                        '[role="combobox"]'
                                    ) as HTMLInputElement
                                    if (autocompleteElement) {
                                        autocompleteElement.blur()
                                    }

                                    // Navigate to trip detail
                                    setTimeout(() => {
                                        router.push(`/trip-detail/${option.id}`)
                                    }, 100)
                                }}
                            >
                                {/* Trip Image */}
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        mr: 2,
                                        flexShrink: 0,
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={option.image}
                                        alt={option.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        onError={e => {
                                            e.currentTarget.src = '/default-trip.jpg' // fallback on error
                                        }}
                                    />
                                </Box>

                                {/* Trip Details */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    {/* Trip Name */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <Icon
                                            icon='mdi:map-marker'
                                            style={{ marginRight: 8, color: '#0ea5e9', fontSize: 16 }}
                                        />
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                fontWeight: 600,
                                                color: '#1f2937',
                                                fontSize: '0.95rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {option.label}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 3 }}>
                                        {option.location && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                                                <Icon
                                                    icon='mdi:map-marker-outline'
                                                    style={{ marginRight: 4, color: '#6b7280', fontSize: 12 }}
                                                />
                                                <Typography
                                                    variant='caption'
                                                    sx={{
                                                        color: '#6b7280',
                                                        fontSize: '0.75rem',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {option.location}
                                                </Typography>
                                            </Box>
                                        )}
                                        {option.category?.name && (
                                            <Chip
                                                label={option.category.name}
                                                size='small'
                                                sx={{
                                                    height: 18,
                                                    fontSize: '0.65rem',
                                                    backgroundColor: '#eff6ff',
                                                    color: '#0ea5e9',
                                                    border: '1px solid #bfdbfe',
                                                    '& .MuiChip-label': {
                                                        px: 0.75,
                                                        py: 0,
                                                    },
                                                    flexShrink: 0,
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>

                                {/* Arrow Icon */}
                                <Box sx={{ ml: 1, color: '#9ca3af' }}>
                                    <Icon icon='mdi:chevron-right' style={{ fontSize: 20 }} />
                                </Box>
                            </Box>
                        )}
                        getOptionLabel={(option: any) => option?.label || ''}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4,
                                backgroundColor: 'white',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiInputBase-input': {
                                py: 2.5,
                                px: 3,
                                fontSize: '1.1rem',
                                '&::placeholder': {
                                    color: '#9ca3af',
                                    opacity: 1,
                                },
                            },
                            '& .MuiAutocomplete-listbox': {
                                maxHeight: 400,
                                padding: 1,
                                '& .MuiAutocomplete-option': {
                                    minHeight: 76,
                                    borderRadius: 2,
                                    marginBottom: 1,
                                    border: '1px solid #f3f4f6',
                                    '&:last-child': {
                                        marginBottom: 0,
                                    },
                                    '&[aria-selected="true"]': {
                                        backgroundColor: '#eff6ff !important',
                                        borderColor: '#bfdbfe',
                                    },
                                },
                            },
                            '& .MuiAutocomplete-paper': {
                                borderRadius: 3,
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                border: '1px solid #e5e7eb',
                            },
                        }}
                    />
                </Paper>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 4,
                        mt: 6,
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            100+
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            Destinasi
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            50+
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            Open Trip
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            1000+
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            Happy Traveler
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Scroll indicator */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    animation: 'bounce 2s infinite',
                }}
            >
                <IconButton
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    <Icon icon='mdi:chevron-down' width={32} height={32} />
                </IconButton>
            </Box>

            <style jsx>{`
                @keyframes bounce {
                    0%,
                    20%,
                    50%,
                    80%,
                    100% {
                        transform: translateY(0) translateX(-50%);
                    }
                    40% {
                        transform: translateY(-10px) translateX(-50%);
                    }
                    60% {
                        transform: translateY(-5px) translateX(-50%);
                    }
                }
            `}</style>
        </Box>
    )
}

export default HeroSection
