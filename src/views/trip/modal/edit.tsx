import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { default as DialogActions, default as DialogContent } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { TripForm, tripSchema } from '../schema/trip.schemas'
import FormDataTrip from './form-data'
import { CircularProgress } from '@mui/material'
import { objectClear } from '@/utils/helpers/object-clear.helper'
import { queryClient } from '@/utils'
import { useEditTrip } from '@/utils/mutations/use-trips.mutation'
import { useEffect } from 'react'

interface ModalAdd {
    open: boolean
    toggle: () => void
    data: any
}

const EditTrip = (props: ModalAdd) => {
    const { open, toggle, data } = props

    const { mutateAsync: add_trip, isPending } = useEditTrip(data?.id)

    const addTripForm = useForm<TripForm>({
        defaultValues: {
            name: '',
            description: '',
            status: true,
            trip_category_id: null,
            destination_type_id: null,
            base_price: '',
            max_capacity: '10',
            min_participants: '1',
            duration_days: '1',
            is_active: true,
            image: '',
            location: '',
            latitude: undefined,
            longitude: undefined,
        },
        resolver: zodResolver(tripSchema),
    })

    const { handleSubmit, reset, watch } = addTripForm

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                description: data.description,
                status: data.status,
                trip_category_id:
                    data.trip_category?.id > 0
                        ? {
                              id: data.trip_category?.id,
                              label: data.trip_category?.name,
                          }
                        : null,
                destination_type_id:
                    data.destination_type?.id > 0
                        ? {
                              id: data.destination_type?.id,
                              label: data.destination_type?.name,
                          }
                        : null,
                base_price: data.base_price.toString(),
                max_capacity: data.max_capacity.toString(),
                min_participants: data.min_participants.toString(),
                duration_days: data.duration_days.toString(),
                is_active: data.is_active,
                image: data.image,
                location: data.location,
                latitude: data.latitude ?? '',
                longitude: data.longitude ?? '',
            })
        }
    }, [data, reset, addTripForm])

    console.log('tes', watch())
    console.log('data', data)

    const onSubmit: any = async (data: TripForm) => {
        const tripData = objectClear<TripForm>(data)

        await add_trip({ ...tripData, app_id: 2 })

        queryClient.invalidateQueries({ queryKey: ['LIST_TRIP_ALL'] })

        toggle()
        reset()
    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <>
            <Dialog fullWidth open={open} maxWidth='md'>
                <DialogTitle fontWeight={600} sx={{ position: 'relative' }}>
                    Edit Trip
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={4}>
                        <Box>
                            <FormDataTrip form={addTripForm} />
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button variant='outlined' color='secondary' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant='contained'
                            sx={{ mr: 1 }}
                            disabled={isPending}
                        >
                            {isPending ? <CircularProgress size={18} color='inherit' /> : 'Submit'}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditTrip
