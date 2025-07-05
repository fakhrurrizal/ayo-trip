// components/HeroSection.tsx
import React from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { Icon } from '@iconify/react';

const HeroSection: React.FC = () => {
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
                    zIndex: 1
                }
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    py: 8
                }}
            >
                {/* Main Heading */}
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.2
                    }}
                >
                    Temukan Tempat Baru, Buat
                </Typography>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 4,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.2
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
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Cari destinasi impianmu..."
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        sx={{
                                            backgroundColor: '#0ea5e9',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#0284c7'
                                            },
                                            borderRadius: 2,
                                            p: 1.5
                                        }}
                                    >
                                        <Icon icon="mdi:magnify" width={24} height={24} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                                '& .MuiInputBase-input': {
                                    py: 2,
                                    px: 3,
                                    fontSize: '1.1rem'
                                }
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4
                            }
                        }}
                    />
                </Paper>

                {/* Stats or Additional Info */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 4,
                        mt: 6
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            100+
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            Destinasi
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            50+
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            Open Trip
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            1000+
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
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
                    animation: 'bounce 2s infinite'
                }}
            >
                <IconButton
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <Icon icon="mdi:chevron-down" width={32} height={32} />
                </IconButton>
            </Box>

            <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
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
    );
};

export default HeroSection;