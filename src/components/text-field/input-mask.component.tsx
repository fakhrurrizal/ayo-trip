import { forwardRef } from 'react'
import { IMask, IMaskInput } from 'react-imask'
import { ReactElement } from 'react-imask/dist/mixin'

interface MaskInputProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

export const PhoneMaskInput = forwardRef<ReactElement, MaskInputProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props

    const maskOptions = {
        lazy: false,
    }

    return (
        <IMaskInput
            {...other}
            {...maskOptions}
            mask='0000-0000-0000'
            definitions={{
                '0': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => {
                onChange({ target: { name, value } })
            }}
            overwrite
        />
    )
})

export const NumberMaskInput = forwardRef<ReactElement, MaskInputProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props

    return (
        <IMaskInput
            {...other}
            mask={IMask.MaskedNumber}
            inputRef={ref}
            thousandsSeparator='.'
            radix='.'
            mapToRadix={['.']}
            onAccept={(value: any) => onChange({ target: { name, value } })}
            overwrite
        />
    )
})

export const NumberMaskInputComma = forwardRef<ReactElement, MaskInputProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props

    return (
        <IMaskInput
            {...other}
            mask={IMask.MaskedNumber}
            inputRef={ref}
            thousandsSeparator=','
            radix='.'
            mapToRadix={['.']}
            onAccept={(value: any) => onChange({ target: { name, value } })}
            overwrite
        />
    )
})
