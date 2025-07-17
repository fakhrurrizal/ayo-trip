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
            hiddenClose
            maxWidth='xs'
            hideButton
            hideTitle={true}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}
        >
            <Stack width={300} height={'auto'}>
                <img src={image} alt='image' />
            </Stack>
        </CustomStyledModal>
    )
}

export default ShowImage
