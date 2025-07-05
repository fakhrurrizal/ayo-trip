import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

// interface LogoForAppBarProps {
//   trigger?: boolean
// }

export const LogoForAppBar = () => {
    // const { trigger } = props

    const { push } = useRouter()

    // let filterTrigger = ''

    // if (trigger !== null && trigger !== undefined) {
    //   if (trigger == false) {
    //     filterTrigger = 'brightness(0) invert(1)'
    //   } else {
    //     filterTrigger = ''
    //   }
    // }

    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                gap: 1,
                alignItems: 'center',
            }}
            onClick={() => push('/')}
        >
            <Box>
                <Image
                    src='/logos.png'
                    width={45}
                    alt='Tanya Dokter'
                    height={30}
                    // style={{ filter: filterTrigger }}
                />
            </Box>
            <Box
                marginTop={0.2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    justifyContent: 'center',
                    width: 180,
                    // [breakpoints.down('sm')]: {
                    //     display: 'none',
                    // },
                }}
            >
                <ColoredText text='Tanya Dokter' />
                
            </Box>
        </Box>
    )
}



interface Props {
    text: string
    fontSize?: number
}

export const ColoredText: FC<Props> = ({ text, fontSize = 18 }) => {
    const coloredText = text.split(' ').map((word, index) => {
        const firstLetter = word.charAt(0)
        const restOfWord = word.slice(1)

        return (
            <span key={index}>
                <span style={{ color: '#df4e0f' }}>{firstLetter}</span>
                {restOfWord}{' '}
            </span>
        )
    })

    return (
        <Typography fontSize={fontSize} fontWeight={600} sx={() => ({ color: '#2563EB' })}>
            {coloredText}
        </Typography>
    )
}
