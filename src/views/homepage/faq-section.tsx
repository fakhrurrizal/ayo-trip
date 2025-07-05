import React, { useState, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Paper,
    Chip,
    Button,
    Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';

// Type definitions
interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

interface FAQCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
}

const FAQSection: React.FC = () => {
    const [expandedAccordion, setExpandedAccordion] = useState<number | false>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // FAQ Categories
    const categories: FAQCategory[] = [
        { id: 'all', name: 'Semua', icon: 'mdi:help-circle', color: '#0ea5e9' },
        { id: 'booking', name: 'Pemesanan', icon: 'mdi:calendar-check', color: '#10b981' },
        { id: 'payment', name: 'Pembayaran', icon: 'mdi:credit-card', color: '#f59e0b' },
        { id: 'travel', name: 'Perjalanan', icon: 'mdi:airplane', color: '#8b5cf6' },
        { id: 'policy', name: 'Kebijakan', icon: 'mdi:shield-check', color: '#ef4444' },
    ];

    // FAQ Data
    const faqData: FAQItem[] = [
        {
            id: 1,
            question: "Bagaimana cara melakukan pemesanan paket tour?",
            answer: "Anda dapat melakukan pemesanan dengan mudah melalui website kami. Pilih destinasi yang diinginkan, tentukan tanggal keberangkatan, jumlah peserta, lalu klik 'Pesan Sekarang'. Isi formulir pemesanan dengan lengkap dan lakukan pembayaran sesuai instruksi. Tim kami akan mengkonfirmasi pemesanan Anda dalam 24 jam.",
            category: "booking",
            tags: ["pemesanan", "booking", "cara pesan"]
        },
        {
            id: 2,
            question: "Apa saja metode pembayaran yang tersedia?",
            answer: "Kami menerima berbagai metode pembayaran untuk kemudahan Anda: Transfer Bank (BCA, BNI, BRI, Mandiri), E-Wallet (GoPay, OVO, DANA, ShopeePay), Virtual Account, dan Kartu Kredit/Debit. Pembayaran dapat dilakukan secara penuh atau dengan sistem cicilan untuk paket tertentu.",
            category: "payment",
            tags: ["pembayaran", "transfer", "e-wallet"]
        },
        {
            id: 3,
            question: "Berapa lama sebelum keberangkatan saya harus melakukan pemesanan?",
            answer: "Untuk hasil terbaik, kami merekomendasikan pemesanan minimal 2-3 minggu sebelum keberangkatan. Namun, untuk destinasi populer atau musim liburan, sebaiknya pesan 1-2 bulan sebelumnya. Pemesanan mendadak (kurang dari 1 minggu) tetap dapat diproses tergantung ketersediaan.",
            category: "booking",
            tags: ["jadwal", "booking", "waktu pesan"]
        },
        {
            id: 4,
            question: "Apakah harga sudah termasuk semua fasilitas yang disebutkan?",
            answer: "Ya, harga paket tour sudah termasuk semua fasilitas yang tercantum dalam deskripsi paket seperti transportasi, akomodasi, makan sesuai program, tiket masuk objek wisata, dan guide lokal. Biaya tambahan yang mungkin timbul akan dijelaskan secara transparan di awal pemesanan.",
            category: "payment",
            tags: ["harga", "fasilitas", "include"]
        },
        {
            id: 5,
            question: "Bagaimana jika cuaca buruk saat perjalanan?",
            answer: "Keselamatan adalah prioritas utama kami. Jika terjadi cuaca buruk yang dapat membahayakan perjalanan, kami akan melakukan penyesuaian itinerary atau menunda aktivitas tertentu. Untuk kasus force majeure, kami akan memberikan alternatif aktivitas atau kompensasi sesuai kebijakan yang berlaku.",
            category: "travel",
            tags: ["cuaca", "safety", "force majeure"]
        },
        {
            id: 6,
            question: "Apakah ada kebijakan refund atau reschedule?",
            answer: "Kami memiliki kebijakan refund dan reschedule yang fleksibel. Pembatalan 30 hari sebelum keberangkatan: refund 75%, 14-29 hari: refund 50%, 7-13 hari: refund 25%, kurang dari 7 hari: tidak ada refund. Reschedule dapat dilakukan maksimal 2 kali dengan biaya admin tertentu.",
            category: "policy",
            tags: ["refund", "reschedule", "pembatalan"]
        },
        {
            id: 7,
            question: "Apakah tersedia paket untuk solo traveler?",
            answer: "Tentu! Kami memiliki paket khusus untuk solo traveler dengan harga yang kompetitif. Untuk beberapa destinasi, Anda dapat bergabung dengan grup yang sudah ada atau kami dapat mengatur private tour sesuai kebutuhan. Konsultasikan dengan tim kami untuk mendapatkan rekomendasi terbaik.",
            category: "travel",
            tags: ["solo traveler", "private tour", "grup"]
        },
        {
            id: 8,
            question: "Dokumen apa saja yang diperlukan untuk perjalanan?",
            answer: "Untuk perjalanan domestik, Anda memerlukan KTP/SIM/Paspor yang masih berlaku. Untuk destinasi tertentu mungkin diperlukan surat keterangan kesehatan. Khusus untuk pendakian gunung, diperlukan surat keterangan sehat dari dokter. Kami akan memberikan checklist lengkap setelah pemesanan dikonfirmasi.",
            category: "travel",
            tags: ["dokumen", "persyaratan", "KTP"]
        },
        {
            id: 9,
            question: "Bagaimana jika ada peserta yang berkebutuhan khusus?",
            answer: "Kami berkomitmen untuk memberikan pelayanan inklusif. Informasikan kebutuhan khusus Anda saat pemesanan, seperti aksesibilitas kursi roda, diet khusus, atau kebutuhan medis. Tim kami akan memastikan semua akomodasi dan fasilitas dapat mengakomodasi kebutuhan tersebut.",
            category: "travel",
            tags: ["aksesibilitas", "kebutuhan khusus", "diet"]
        },
        {
            id: 10,
            question: "Bagaimana sistem pembayaran cicilan bekerja?",
            answer: "Sistem cicilan tersedia untuk paket dengan nilai minimal Rp 2.000.000. Anda dapat membayar dengan skema 2x atau 3x cicilan tanpa bunga. Cicilan pertama minimal 50% dari total harga, sisanya dapat dibayar sesuai kesepakatan. Pelunasan harus selesai maksimal 7 hari sebelum keberangkatan.",
            category: "payment",
            tags: ["cicilan", "installment", "pembayaran"]
        }
    ];

    const handleAccordionChange = useCallback((panel: number) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpandedAccordion(isExpanded ? panel : false);
    }, []);

    const handleCategoryChange = useCallback((categoryId: string) => {
        setSelectedCategory(categoryId);
        setExpandedAccordion(false); // Reset expanded accordion when category changes
    }, []);

    const filteredFAQs = selectedCategory === 'all'
        ? faqData
        : faqData.filter(faq => faq.category === selectedCategory);

    const getIconColor = (categoryId: string) => {
        const category = categories.find(cat => cat.id === categoryId);

        return category ? category.color : '#64748b';
    };

    return (
        <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
            <Container maxWidth="lg">
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
                        Pertanyaan yang Sering Diajukan
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
                        Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang layanan kami
                    </Typography>

                    {/* Category Filter */}
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'inline-block',
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden',
                            p: 1,
                            mb: 4
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                flexWrap: 'wrap',
                                gap: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    variant={selectedCategory === category.id ? 'contained' : 'text'}
                                    startIcon={
                                        <Icon
                                            icon={category.icon}
                                            width={18}
                                            height={18}
                                        />
                                    }
                                    sx={{
                                        textTransform: 'none',
                                        minWidth: { xs: 'auto', sm: 120 },
                                        height: 40,
                                        borderRadius: 2,
                                        fontWeight: 'medium',
                                        fontSize: '0.875rem',
                                        px: { xs: 2, sm: 3 },
                                        ...(selectedCategory === category.id
                                            ? {
                                                backgroundColor: category.color,
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: category.color,
                                                    filter: 'brightness(0.9)'
                                                }
                                            }
                                            : {
                                                color: '#64748b',
                                                '&:hover': {
                                                    backgroundColor: '#f1f5f9',
                                                    color: category.color
                                                }
                                            })
                                    }}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </Stack>
                    </Paper>
                </Box>

                {/* FAQ Content */}
                <Grid container spacing={4}>
                    {/* FAQ List */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#1e293b',
                                    fontWeight: 'bold',
                                    mb: 1
                                }}
                            >
                                {selectedCategory === 'all'
                                    ? `${filteredFAQs.length} Pertanyaan`
                                    : `${filteredFAQs.length} Pertanyaan tentang ${categories.find(cat => cat.id === selectedCategory)?.name}`
                                }
                            </Typography>
                            <Box sx={{ height: 2, backgroundColor: '#e2e8f0', borderRadius: 1 }} />
                        </Box>

                        <Stack spacing={2}>
                            {filteredFAQs.map((faq) => (
                                <Accordion
                                    key={faq.id}
                                    expanded={expandedAccordion === faq.id}
                                    onChange={handleAccordionChange(faq.id)}
                                    sx={{
                                        borderRadius: 2,
                                        border: '1px solid #e2e8f0',
                                        boxShadow: 'none',
                                        '&:before': {
                                            display: 'none',
                                        },
                                        '&.Mui-expanded': {
                                            margin: '0 0 8px 0',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <Icon
                                                icon={expandedAccordion === faq.id ? "mdi:minus" : "mdi:plus"}
                                                width={20}
                                                height={20}
                                                color={getIconColor(faq.category)}
                                            />
                                        }
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                margin: '12px 0',
                                                alignItems: 'center'
                                            },
                                            '&.Mui-expanded': {
                                                backgroundColor: '#f8fafc'
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: getIconColor(faq.category),
                                                    mr: 2,
                                                    flexShrink: 0
                                                }}
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#1e293b',
                                                    fontSize: { xs: '0.95rem', md: '1rem' }
                                                }}
                                            >
                                                {faq.question}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{
                                            pt: 0,
                                            pb: 3,
                                            px: 3,
                                            borderTop: '1px solid #f1f5f9'
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                lineHeight: 1.7,
                                                mb: 2,
                                                pl: 4
                                            }}
                                        >
                                            {faq.answer}
                                        </Typography>
                                        <Box sx={{ pl: 4 }}>
                                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                                {faq.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#f1f5f9',
                                                            color: '#64748b',
                                                            fontSize: '0.75rem',
                                                            height: 24,
                                                            '&:hover': {
                                                                backgroundColor: '#e2e8f0'
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={3}>
                            {/* Contact Support Card */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                    color: 'white',
                                    textAlign: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2
                                    }}
                                >
                                    <Icon icon="mdi:headset" width={28} height={28} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Masih Ada Pertanyaan?
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                                    Tim customer service kami siap membantu Anda 24/7
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#0ea5e9',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#f8fafc'
                                        }
                                    }}
                                    startIcon={<Icon icon="mdi:whatsapp" width={20} height={20} />}
                                >
                                    Hubungi Kami
                                </Button>
                            </Paper>

                            {/* Quick Links */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
                                    Link Berguna
                                </Typography>
                                <Stack spacing={2}>
                                    {[
                                        { label: 'Syarat & Ketentuan', icon: 'mdi:file-document' },
                                        { label: 'Kebijakan Privasi', icon: 'mdi:shield-lock' },
                                        { label: 'Cara Pemesanan', icon: 'mdi:help-circle' },
                                        { label: 'Panduan Perjalanan', icon: 'mdi:map' }
                                    ].map((item, index) => (
                                        <Button
                                            key={index}
                                            variant="text"
                                            fullWidth
                                            startIcon={<Icon icon={item.icon} width={18} height={18} />}
                                            sx={{
                                                justifyContent: 'flex-start',
                                                color: '#64748b',
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    color: '#0ea5e9'
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Stack>
                            </Paper>

                            {/* Statistics */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: '#f8fafc'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
                                    Statistik Bantuan
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0ea5e9' }}>
                                                98%
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                Masalah Terselesaikan
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                                                &lt;5m
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                Waktu Respon
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FAQSection;