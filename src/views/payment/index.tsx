import { useState } from 'react'
import { Icon } from '@iconify/react'
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Button,
    Alert,
    Chip,
} from '@mui/material'
import { toast } from 'react-toastify'
import { formatToIDR } from '@/utils/helpers/format-number.helper'
import { useRouter } from 'next/router'
import { useTripID } from '@/utils/quries/use-destination.query'

interface PaymentMethod {
    id: string
    bankName: string
    accountNumber: string
    accountHolder: string
    bankCode: string
    icon: string
}

const PaymentMethodPage = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [showAccountDetails, setShowAccountDetails] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const tripId = typeof id === 'string' ? Number(id) : undefined

    const { data: tour } = useTripID(Number(tripId))
    const paymentMethods: PaymentMethod[] = [
        {
            id: 'bca',
            bankName: 'Bank Central Asia (BCA)',
            accountNumber: '1234567890',
            accountHolder: 'PT. AYO TRIP INDONESIA',
            bankCode: 'BCA',
            icon: 'simple-icons:bca',
        },
        {
            id: 'mandiri',
            bankName: 'Bank Mandiri',
            accountNumber: '9876543210',
            accountHolder: 'PT. AYO TRIP INDONESIA',
            bankCode: 'MANDIRI',
            icon: 'simple-icons:mandiri',
        },
        {
            id: 'bni',
            bankName: 'Bank Negara Indonesia (BNI)',
            accountNumber: '5555666677',
            accountHolder: 'PT. AYO TRIP INDONESIA',
            bankCode: 'BNI',
            icon: 'simple-icons:bni',
        },
        {
            id: 'bri',
            bankName: 'Bank Rakyat Indonesia (BRI)',
            accountNumber: '4444333322',
            accountHolder: 'PT. AYO TRIP INDONESIA',
            bankCode: 'BRI',
            icon: 'simple-icons:bri',
        },
        {
            id: 'permata',
            bankName: 'Bank Permata',
            accountNumber: '7777888899',
            accountHolder: 'PT. AYO TRIP INDONESIA',
            bankCode: 'PERMATA',
            icon: 'mdi:bank',
        },
    ]

    const selectedMethod = paymentMethods.find(method => method.id === selectedPayment)
    const generateWhatsAppLink = () => {
        const phoneNumber = '6285183266453'
        const tourName = encodeURIComponent(tour?.title || 'Tour')
        const price = tour?.base_price ? formatToIDR(tour.base_price) : 'Harga tidak tersedia'
        const duration = tour?.duration_days + ' Hari' || 'Durasi tidak tersedia'
        const participants = tour?.min_participants
            ? `${tour.min_participants}-${tour?.max_capacity || 'Max'} orang`
            : '1-Max orang'

        const message = `
        Halo, saya ingin melakukan pembayaran untuk tour berikut:

        - Nama Tour: ${tourName}
        - Harga: ${price}
        - Durasi: ${duration}
        - Jumlah Peserta: ${participants}
        - Metode Pembayaran: ${selectedMethod?.bankCode}

        Silakan konfirmasi detail pembayaran dan sertakan bukti pembayaran.
        Terima kasih!`.trim()

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    }

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPayment(event.target.value)
        setShowAccountDetails(true)
    }

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Nomor rekening berhasil disalin!')
    }

    const handleConfirmPayment = () => {
        if (!selectedPayment) {
            toast.error('Silakan pilih metode pembayaran terlebih dahulu!')

            return
        } else {
            const whatsappUrl = generateWhatsAppLink()
            window.open(whatsappUrl, '_blank')
        }
    }

    return (
        <Container maxWidth='md' sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
                    Pilih Metode Pembayaran
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Pilih salah satu metode pembayaran di bawah ini dan lakukan transfer sesuai dengan detail rekening
                    yang tersedia.
                </Typography>
            </Box>

            {/* Payment Methods */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant='h6' gutterBottom sx={{ mb: 3 }}>
                        Metode Pembayaran Manual
                    </Typography>

                    <RadioGroup value={selectedPayment} onChange={handlePaymentChange}>
                        {paymentMethods.map((method, index) => (
                            <Box key={method.id}>
                                <FormControlLabel
                                    value={method.id}
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                                            <Icon
                                                icon={method.icon}
                                                width={32}
                                                height={32}
                                                style={{ marginRight: 12 }}
                                            />
                                            <Box>
                                                <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                                                    {method.bankName}
                                                </Typography>
                                                <Typography variant='caption' color='text.secondary'>
                                                    Transfer Bank
                                                </Typography>
                                            </Box>
                                        </Box>
                                    }
                                    sx={{
                                        width: '100%',
                                        m: 0,
                                        p: 2,
                                        border:
                                            selectedPayment === method.id ? '2px solid #0ea5e9' : '1px solid #e0e0e0',
                                        borderRadius: 2,
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                />
                                {index < paymentMethods.length - 1 && <Box sx={{ mb: 1 }} />}
                            </Box>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Account Details */}
            {showAccountDetails && selectedMethod && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Icon icon={selectedMethod.icon} width={40} height={40} style={{ marginRight: 12 }} />
                            <Box>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                    {selectedMethod.bankName}
                                </Typography>
                                <Chip label='Transfer Bank' size='small' color='primary' variant='outlined' />
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{ mb: 3 }}>
                            <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                                Nomor Rekening
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontFamily: 'monospace',
                                        letterSpacing: 1,
                                    }}
                                >
                                    {selectedMethod.accountNumber}
                                </Typography>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    startIcon={<Icon icon='mdi:content-copy' />}
                                    onClick={() => handleCopyToClipboard(selectedMethod.accountNumber)}
                                >
                                    Salin
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                                Nama Penerima
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='h6' sx={{ fontWeight: 'medium' }}>
                                    {selectedMethod.accountHolder}
                                </Typography>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    startIcon={<Icon icon='mdi:content-copy' />}
                                    onClick={() => handleCopyToClipboard(selectedMethod.accountHolder)}
                                >
                                    Salin
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                                Kode Bank
                            </Typography>
                            <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                                {selectedMethod.bankCode}
                            </Typography>
                        </Box>

                        <Alert severity='info' sx={{ mb: 3 }}>
                            <Typography variant='body2'>
                                <strong>Petunjuk Transfer:</strong>
                                <br />
                                1. Lakukan transfer sesuai dengan total pembayaran yang tertera
                                <br />
                                2. Simpan bukti transfer Anda
                                <br />
                                3. Upload bukti transfer pada halaman konfirmasi
                                <br />
                                4. Pembayaran akan dikonfirmasi dalam 1x24 jam
                            </Typography>
                        </Alert>
                    </CardContent>
                </Card>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Button
                    variant='outlined'
                    size='large'
                    startIcon={<Icon icon='mdi:arrow-left' />}
                    onClick={() => router.back()}
                >
                    Kembali
                </Button>

                <Button
                    variant='contained'
                    size='large'
                    endIcon={<Icon icon='mdi:arrow-right' />}
                    onClick={handleConfirmPayment}
                    disabled={!selectedPayment}
                    sx={{
                        backgroundColor: '#0ea5e9',
                        '&:hover': {
                            backgroundColor: '#0284c7',
                        },
                    }}
                >
                    Konfirmasi Pembayaran
                </Button>
            </Box>
        </Container>
    )
}

export default PaymentMethodPage
