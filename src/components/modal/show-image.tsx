import { CustomStyledModal } from '@/components/custom-styled-modal'
import { Stack } from '@mui/material'

interface Props {
    open: boolean
    toggle: () => void
    image: string | undefined
}

const ShowImage = ({ open, toggle, image }: Props) => {
    return (
        <CustomStyledModal
            open={open}
            title='Image'
            toggle={toggle}
            onClose={toggle}
            titleColor='text-white'
            maxWidth='md'
            hideButton
            hideTitle={true}
            PaperProps={{
                style: {
                    boxShadow: 'none',
                },
            }}
        >
            <Stack width={600} height={'auto'} sx={{ m: 'auto', pb: 5 }}>
                <img src={image} alt='image' />
            </Stack>
        </CustomStyledModal>
    )
}

export default ShowImage
