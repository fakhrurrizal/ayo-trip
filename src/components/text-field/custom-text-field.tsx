import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useState, useMemo } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import Typography from '@mui/material/Typography'
import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { Select } from '@mui/material'
import { NumberMaskInput, NumberMaskInputComma, PhoneMaskInput } from './input-mask.component'

export type TextFieldProps<T extends FieldValues = Record<string, any>> = Omit<MuiTextFieldProps, 'name'> & {
    inputFormat?: 'NORMAL' | 'NUMBER' | 'DECIMAL' | 'PRICE' | 'PASSWORD' | 'PHONE' | 'PPN' | 'PERCENT' | 'EMAIL'
    name: Path<T>
    control: Control<T>
    onValueChange?: (value: string) => void
    isReadOnly?: boolean
    variant?: 'standard' | 'outlined' | 'filled'
    placeholder?: string
    textUppercase?: boolean
    textLowercase?: boolean
    disabled?: boolean
    textSlug?: boolean
    setPercentage?: (value: string) => void
    percentage?: string
    disablePercentage?: boolean
    // label?: string
}

export default function CustomTextField<T extends FieldValues = Record<string, any>>(props: TextFieldProps<T>) {
    const {
        control,
        inputFormat = 'NORMAL',
        onValueChange,
        isReadOnly = false,
        variant,
        placeholder = '',
        textUppercase = false,
        textLowercase = false,
        textSlug = false,
        disabled = false,
        percentage,
        setPercentage,
        disablePercentage,
        // label,
        ...moreProps
    } = props

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isPasswordType = inputFormat === 'PASSWORD'

    const inputComponent: any = useMemo(() => {
        switch (inputFormat) {
            case 'PERCENT':
                return percentage == 'percent' ? NumberMaskInputComma : NumberMaskInput
            case 'PRICE':
            case 'PPN':
            case 'NUMBER':
                return NumberMaskInput
            case 'DECIMAL':
                return NumberMaskInputComma
            case 'PHONE':
                return PhoneMaskInput

            default:
                return undefined
        }
    }, [inputFormat, percentage])

    const endAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PASSWORD':
                return (
                    <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <VisibilityOffRoundedIcon fontSize='small' />
                            ) : (
                                <VisibilityRoundedIcon fontSize='small' />
                            )}
                        </IconButton>
                    </InputAdornment>
                )
            case 'PERCENT':
                return (
                    <InputAdornment position={disablePercentage ? 'start' : 'end'}>
                        {disablePercentage ? (
                            <>{percentage == 'percent' ? '%' : 'Rp'}</>
                        ) : (
                            <PercentSelect percentage={percentage ?? 'percent'} setPercentage={setPercentage} />
                        )}
                    </InputAdornment>
                )
            case 'PPN':
                return <InputAdornment position='start'>%</InputAdornment>

            default:
                return moreProps.InputProps?.endAdornment
        }
    }, [inputFormat, showPassword, moreProps.InputProps?.endAdornment, percentage, setPercentage, disablePercentage])

    const startAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PHONE':
                return (
                    <InputAdornment position='start'>
                        <Typography sx={{ mt: '1px' }}>+62</Typography>
                    </InputAdornment>
                )

            case 'PRICE':
                return <InputAdornment position='start'>Rp</InputAdornment>

            default:
                return moreProps.InputProps?.startAdornment
        }
    }, [inputFormat, moreProps.InputProps?.startAdornment])

    return (
        <Controller
            render={({ field, fieldState, formState: { isSubmitSuccessful } }) => {
                const error = !isSubmitSuccessful && Boolean(fieldState?.error)

                const helperText = !isSubmitSuccessful && fieldState?.error?.message

                const { onChange, ...moreField } = field

                return (
                    <MuiTextField
                        {...moreProps}
                        {...moreField}
                        error={error}
                        onBlur={e => {
                            if (moreProps.onBlur) {
                                moreProps.onBlur(e) // Panggil onBlur dari props
                            }
                            field.onBlur() // Pastikan onBlur dari Controller tetap dipanggil
                        }}
                        fullWidth
                        onChange={(e: any) => {
                            if (textUppercase) {
                                if (onValueChange) {
                                    onValueChange(e.target.value.toUpperCase())
                                }
                                onChange(e.target.value.toUpperCase())
                            } else if (textLowercase) {
                                const modifiedValue = e.target.value.toLowerCase().replace(/\s+/g, '_')
                                if (onValueChange) {
                                    onValueChange(modifiedValue)
                                }
                                onChange(modifiedValue)
                            } else if (textSlug) {
                                const modifiedValue = e.target.value.toLowerCase().replace(/\s+/g, '-')
                                if (onValueChange) {
                                    onValueChange(modifiedValue)
                                }
                                onChange(modifiedValue)
                            } else {
                                if (onValueChange) {
                                    onValueChange(e.target.value)
                                }
                                onChange(e.target.value)
                            }
                        }}
                        helperText={helperText}
                        type={!isPasswordType ? moreProps.type : showPassword ? 'text' : 'password'}
                        size='small'
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                        placeholder={isReadOnly ? undefined : placeholder ? placeholder : `${props?.label || ''}...`}
                        InputProps={{
                            ...moreProps.InputProps,
                            sx: { pr: 0.5 },
                            inputComponent,
                            endAdornment,
                            startAdornment,
                            autoComplete: 'off',
                            readOnly: isReadOnly,
                        }}
                        variant={variant}
                        sx={{
                            pl: variant === 'standard' ? 1 : 0,
                            '& .MuiInputBase-input:hover': {
                                cursor: isReadOnly ? 'default' : '',
                            },
                            // backgroundColor: disabled ? 'grey' : '',
                        }}
                    />
                )
            }}
            name={props.name}
            control={control}
            rules={{
                ...(inputFormat === 'EMAIL' && {
                    required: 'Email wajib diisi',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Format email tidak valid',
                    },
                }),
            }}
        />
    )
}

interface Props {
    percentage: string
    setPercentage?: (value: string) => void
}
function PercentSelect({ percentage, setPercentage }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        if (setPercentage) {
            setPercentage(event.target.value as string)
        }
    }

    return (
        <FormControl fullWidth>
            <Select
                variant='standard'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={percentage}
                sx={{ width: '35px' }}
                onChange={handleChange}
            >
                <MenuItem value={'percent'}>%</MenuItem>
                <MenuItem value={'rupiah'}>Rp</MenuItem>
            </Select>
        </FormControl>
    )
}
