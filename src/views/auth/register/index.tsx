import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Zod schema untuk validasi
const signUpSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    mobilePhone: z
        .string()
        .min(1, 'Mobile phone is required')
        .regex(/^0\d{9,12}$/, 'Please enter a valid Indonesian phone number'),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpComponent: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            mobilePhone: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log('Form submitted:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Handle successful submission
            alert('Registration successful!');
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Right side - Background Image */}
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/register.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: '#B6E8FF' }}>
                <Card
                    className="w-full max-w-sm shadow-none border-0"
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }}
                >
                    <CardContent className="p-0">
                        {/* Logo */}
                        <Box className="flex justify-center items-center mb-3">
                            <Image src="/logos.png" alt="Logo" width={100} height={100} />
                        </Box>

                        {/* Title */}
                        <Typography
                            variant="h3"
                            className="text-center font-bold mb-8"
                            style={{
                                color: '#2E5266',
                                fontSize: '2.5rem',
                                fontWeight: '700'
                            }}
                        >
                            Daftar
                        </Typography>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email Field */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    className="mb-2 font-medium"
                                    style={{
                                        color: '#2E5266',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Email
                                </Typography>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type="email"
                                            placeholder="email@mail.com"
                                            variant="outlined"
                                            error={!!errors.email}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    fontSize: '14px',
                                                    '& fieldset': {
                                                        borderColor: '#E0E0E0',
                                                        borderWidth: '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#BDBDBD',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF6B35',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-error fieldset': {
                                                        borderColor: '#f44336',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '12px 14px',
                                                    fontSize: '14px',
                                                    '&::placeholder': {
                                                        color: '#9E9E9E',
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <FormHelperText error sx={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* Mobile Phone Field */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    className="mb-2 font-medium"
                                    style={{
                                        color: '#2E5266',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Phone
                                </Typography>
                                <Controller
                                    name="mobilePhone"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type="tel"
                                            placeholder="0812xxxxxxx"
                                            variant="outlined"
                                            error={!!errors.mobilePhone}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    fontSize: '14px',
                                                    '& fieldset': {
                                                        borderColor: '#E0E0E0',
                                                        borderWidth: '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#BDBDBD',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF6B35',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-error fieldset': {
                                                        borderColor: '#f44336',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '12px 14px',
                                                    fontSize: '14px',
                                                    '&::placeholder': {
                                                        color: '#9E9E9E',
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.mobilePhone && (
                                    <FormHelperText error sx={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                        {errors.mobilePhone.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* New Password Field */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    className="mb-2 font-medium"
                                    style={{
                                        color: '#2E5266',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    New Password
                                </Typography>
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            variant="outlined"
                                            error={!!errors.newPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            size="small"
                                                            sx={{ marginRight: '4px' }}
                                                        >
                                                            <Icon
                                                                icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                                                className="text-gray-500"
                                                                style={{ fontSize: '20px' }}
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    fontSize: '14px',
                                                    '& fieldset': {
                                                        borderColor: '#E0E0E0',
                                                        borderWidth: '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#BDBDBD',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF6B35',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-error fieldset': {
                                                        borderColor: '#f44336',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '12px 14px',
                                                    fontSize: '14px',
                                                    '&::placeholder': {
                                                        color: '#9E9E9E',
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.newPassword && (
                                    <FormHelperText error sx={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                        {errors.newPassword.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* Confirm Password Field */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    className="mb-2 font-medium"
                                    style={{
                                        color: '#2E5266',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Confirm Password
                                </Typography>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            variant="outlined"
                                            error={!!errors.confirmPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            edge="end"
                                                            size="small"
                                                            sx={{ marginRight: '4px' }}
                                                        >
                                                            <Icon
                                                                icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                                                className="text-gray-500"
                                                                style={{ fontSize: '20px' }}
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    fontSize: '14px',
                                                    '& fieldset': {
                                                        borderColor: '#E0E0E0',
                                                        borderWidth: '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#BDBDBD',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF6B35',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-error fieldset': {
                                                        borderColor: '#f44336',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '12px 14px',
                                                    fontSize: '14px',
                                                    '&::placeholder': {
                                                        color: '#9E9E9E',
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <FormHelperText error sx={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                        {errors.confirmPassword.message}
                                    </FormHelperText>
                                )}
                            </Box>

                            {/* Submit Button */}
                            <Box className="pt-4">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                        backgroundColor: '#FEC106',
                                        '&:hover': {
                                            backgroundColor: '#FEC106',
                                        },
                                        borderRadius: '8px',
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        color: "#0159A3"
                                    }}
                                >
                                    {isSubmitting ? (
                                        <Box className="flex items-center gap-2">
                                            <Icon icon="mdi:loading" className="animate-spin" />
                                            Memproses...
                                        </Box>
                                    ) : (
                                        'Daftar'
                                    )}
                                </Button>
                            </Box>
                        </form>

                        {/* Login Link */}
                        <Box className="text-center mt-6">
                            <Typography
                                variant="body2"
                                style={{
                                    color: '#2E5266',
                                    fontSize: '14px',
                                }}
                            >
                                Sudah punya akun?{' '}
                                <Typography
                                    component="span"
                                    onClick={() => router.push('/auth/login')}
                                    sx={{
                                        color: '#1976D2',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Login Sekarang
                                </Typography>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>


        </div>
    );
};

export default SignUpComponent;