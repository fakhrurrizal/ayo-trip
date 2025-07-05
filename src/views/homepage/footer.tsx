import { Icon } from '@iconify/react';
import {
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import React from 'react';

// Type definitions
interface FooterLink {
    label: string;
    href: string;
    icon?: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}


interface ContactInfo {
    type: string;
    value: string;
    icon: string;
    href?: string;
}

const FooterSection: React.FC = () => {

    const footerSections: FooterSection[] = [
        {
            title: 'Destinasi Populer',
            links: [
                { label: 'Raja Ampat', href: '/destinasi/raja-ampat' },
                { label: 'Bromo Tengger', href: '/destinasi/bromo-tengger' },
                { label: 'Labuan Bajo', href: '/destinasi/labuan-bajo' },
                { label: 'Borobudur', href: '/destinasi/borobudur' },
                { label: 'Kawah Ijen', href: '/destinasi/kawah-ijen' },
                { label: 'Lihat Semua', href: '/destinasi' }
            ]
        },
        {
            title: 'Layanan Kami',
            links: [
                { label: 'Paket Wisata', href: '/paket-wisata' },
                { label: 'Private Tour', href: '/private-tour' },
                { label: 'Group Tour', href: '/group-tour' },
                { label: 'Honeymoon Package', href: '/honeymoon' },
                { label: 'Corporate Travel', href: '/corporate' },
                { label: 'Custom Itinerary', href: '/custom-tour' }
            ]
        },
        {
            title: 'Bantuan',
            links: [
                { label: 'Pusat Bantuan', href: '/bantuan' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Cara Pemesanan', href: '/cara-pemesanan' },
                { label: 'Kebijakan Privasi', href: '/privacy-policy' },
                { label: 'Syarat & Ketentuan', href: '/terms-conditions' },
                { label: 'Hubungi Kami', href: '/contact' }
            ]
        },
        {
            title: 'Perusahaan',
            links: [
                { label: 'Tentang Kami', href: '/about' },
                { label: 'Tim Kami', href: '/team' },
                { label: 'Karir', href: '/career' },
                { label: 'Blog', href: '/blog' },
                { label: 'Press Release', href: '/press' },
                { label: 'Mitra', href: '/partnership' }
            ]
        }
    ];


    // Contact information
    const contactInfo: ContactInfo[] = [
        {
            type: 'WhatsApp',
            value: '+62 851-8326-6453',
            icon: 'mdi:whatsapp',
            href: 'https://wa.me/6285183266453'
        },
        {
            type: 'Email',
            value: 'info@ayotrip.com',
            icon: 'mdi:email',
            href: 'mailto:info@ayotrip.com'
        },
        {
            type: 'Alamat',
            value: 'Jl. Sudirman No. 123, Jakarta Pusat',
            icon: 'mdi:map-marker'
        },
        {
            type: 'Jam Operasional',
            value: 'Senin - Sabtu: 08:00 - 20:00',
            icon: 'mdi:clock'
        }
    ];

    // Awards and certifications
    const awards = [
        { name: 'Best Travel Agency 2023', icon: 'mdi:trophy' },
        { name: 'ISO 9001:2015 Certified', icon: 'mdi:certificate' },
        { name: 'TripAdvisor Excellence', icon: 'mdi:star-circle' },
        { name: 'Google Partner', icon: 'mdi:google' }
    ];

    return (
        <Box sx={{ backgroundColor: '#1e293b', color: 'white' }}>
            {/* Main Footer Content */}
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Company Info & Newsletter */}
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={3}>
                            {/* Logo & Company Description */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2
                                        }}
                                    >
                                        <Icon icon="mdi:airplane" width={24} height={24} color="white" />
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        AyoTrip
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#94a3b8',
                                        lineHeight: 1.7,
                                        mb: 2
                                    }}
                                >
                                    Temukan petualangan tak terlupakan di destinasi eksotis Indonesia.
                                    Kami menghadirkan pengalaman wisata terbaik dengan pelayanan profesional
                                    dan harga terjangkau untuk semua kalangan.
                                </Typography>
                            </Box>


                            {/* Awards & Certifications */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Penghargaan & Sertifikasi
                                </Typography>
                                <Grid container spacing={1}>
                                    {awards.map((award, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Chip
                                                icon={<Icon icon={award.icon} width={16} height={16} />}
                                                label={award.name}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderColor: '#475569',
                                                    color: '#94a3b8',
                                                    fontSize: '0.75rem',
                                                    height: 'auto',
                                                    py: 0.5,
                                                    '& .MuiChip-label': {
                                                        px: 1
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Footer Links */}
                    <Grid item xs={12} lg={6}>
                        <Grid container spacing={3}>
                            {footerSections.map((section, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: 2,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {section.title}
                                    </Typography>
                                    <Stack spacing={1}>
                                        {section.links.map((link, linkIndex) => (
                                            <Link
                                                key={linkIndex}
                                                href={link.href}
                                                sx={{
                                                    color: '#94a3b8',
                                                    textDecoration: 'none',
                                                    fontSize: '0.875rem',
                                                    transition: 'color 0.2s',
                                                    '&:hover': {
                                                        color: '#0ea5e9'
                                                    }
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} lg={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                fontSize: '1rem',
                            }}
                        >
                            Hubungi Kami
                        </Typography>

                        <List sx={{ p: 0 }}>
                            {contactInfo.map((contact, index) => {
                                const listItemProps = contact.href
                                    ? {
                                        component: 'a',
                                        href: contact.href,
                                        sx: {
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            mb: 2,
                                            p: 0,
                                            alignItems: 'flex-start',
                                            '&:hover .MuiListItemText-primary': {
                                                color: '#0ea5e9',
                                            },
                                        },
                                    }
                                    : {
                                        sx: {
                                            mb: 2,
                                            p: 0,
                                            alignItems: 'flex-start',
                                        },
                                    };

                                return (
                                    <ListItem key={index} {...listItemProps}>
                                        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                            <Icon icon={contact.icon} width={18} height={18} color="#0ea5e9" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={contact.value}
                                            secondary={contact.type}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                                color: '#e2e8f0',
                                                fontWeight: 'medium',
                                            }}
                                            secondaryTypographyProps={{
                                                fontSize: '0.75rem',
                                                color: '#94a3b8',
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>

                </Grid>

            </Container>

            <Divider sx={{ borderColor: '#475569' }} />

            {/* Footer Bottom */}
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#94a3b8',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        © 2024 AyoTrip. All rights reserved. | Dibuat dengan ❤️ untuk petualangan Anda
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center', md: 'flex-end' },
                        }}
                    >
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            Partner Pembayaran:
                        </Typography>

                        {['mdi:bank', 'mdi:credit-card', 'mdi:wallet', 'mdi:cellphone'].map((icon, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 32,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 1,
                                    backgroundColor: '#334155',
                                    border: '1px solid #475569',
                                }}
                            >
                                <Icon icon={icon} width={16} height={16} color="#94a3b8" />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>

        </Box>
    );
};

export default FooterSection;