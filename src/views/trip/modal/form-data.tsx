import { useAuth } from '@/services'
import { getApi } from '@/utils'
import axios from 'axios'

import getEncodedKey from '@/utils/helpers/getEncodedKey'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TripForm } from '../schema/trip.schemas'
import { MUITextField, ServerSideAutoComplete } from '@/components'
import { Button, Grid, InputAdornment } from '@mui/material'
import SwitchComponent from '@/components/switch.component'
import { Tooltip } from '@mui/material'
import { IconButton } from '@mui/material'
import IconifyIcon from '@/components/icon'
import { CircularProgress } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ShowImage from './show-image'
import CustomTextField from '@/components/text-field/custom-text-field'

interface Props {
    form: UseFormReturn<TripForm>
    readOnly?: boolean
    for_edit?: boolean
}

const FormDataTrip = ({ form, readOnly = false }: Props) => {
    const [openImage, setOpenImage] = useState(false)
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    const toggleImage = () => setOpenImage(!openImage)

    const { control, setValue, watch } = form

    const { accessToken } = useAuth().value

    const handleButtonClick = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement | null
        if (fileInput) {
            fileInput.click()
        }
    }

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0]

        if (file) {
            const form = new FormData()
            form.append('file', file)
            setLoadingImage(true)
            try {
                const encodedKey = getEncodedKey()

                const response = await axios.post(getApi('file') + '', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${accessToken}`,
                        'X-API-KEY': encodedKey,
                    },
                })
                setValue('image', [response.data.data.full_url])
                setLoadingImage(false)
            } catch (error) {
                console.log(error)
                setLoadingImage(false)
            }
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomTextField control={control} name='name' label='Nama Trip' placeholder='Masukkan nama trip' />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='base_price'
                        label='Harga Dasar'
                        placeholder='Masukkan harga trip'
                        inputFormat='PRICE'
                        size='medium'
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField control={control} name='location' label='Lokasi' placeholder='Masukkan lokasi' />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='description'
                        label='Deskripsi'
                        placeholder='Masukkan deskripsi'
                        multiline
                        rows={3}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ServerSideAutoComplete<TripForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='category'
                        name='trip_category_id'
                        label='Kategori Trip'
                        size='medium'
                        formatOptions={response => {
                            const options = response.data
                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.id,
                                label: option.name,
                            }))
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ServerSideAutoComplete<TripForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='destination_type'
                        name='destination_type_id'
                        label='Tipe Destinasi'
                        size='medium'
                        formatOptions={response => {
                            const options = response.data
                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.id,
                                label: option.name,
                            }))
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <CustomTextField
                        control={control}
                        name='max_capacity'
                        label='Kapasitas Maksimal'
                        inputFormat='NUMBER'
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <CustomTextField
                        control={control}
                        name='min_participants'
                        label='Minimal Peserta'
                        inputFormat='NUMBER'
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <CustomTextField
                        control={control}
                        name='duration_days'
                        label='Durasi (hari)'
                        inputFormat='NUMBER'
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='latitude'
                        label='Latitude'
                        type='number'
                        placeholder='Latitude'
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        control={control}
                        name='longitude'
                        label='Longitude'
                        type='number'
                        placeholder='Longitude'
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <MUITextField
                        label='Gambar'
                        variant='outlined'
                        fullWidth
                        size='medium'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <input
                                        id='file-input'
                                        type='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    {watch('image')?.[0] ? (
                                        <>
                                            {!readOnly && (
                                                <Tooltip title='Hapus Gambar'>
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={() => setValue('image', null)}>
                                                            <IconifyIcon icon='mdi:close-circle' color='error' />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </Tooltip>
                                            )}
                                            <Tooltip title='Lihat Gambar'>
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={toggleImage}>
                                                        <IconifyIcon icon='quill:eye' color='info' />
                                                    </IconButton>
                                                </InputAdornment>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Button
                                            sx={{ width: '120px' }}
                                            variant='contained'
                                            onClick={handleButtonClick}
                                            endIcon={!loadingImage && <UploadFileIcon />}
                                            disabled={loadingImage}
                                            fullWidth
                                        >
                                            {loadingImage ? <CircularProgress size={20} /> : 'Choose File'}
                                        </Button>
                                    )}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        value={watch('image')?.[0] ? watch('image')?.[0]?.split('/').pop() : ''}
                    />
                </Grid>
                {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('image')?.[0] || ''} />}

                <Grid item xs={12} sx={{ display: 'flex', gap: 3, mt: -2 }}>
                    <SwitchComponent control={control} label='Status' name='status' readOnly={readOnly} />
                </Grid>
            </Grid>

            {/* <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                        <ServerSideAutoComplete<ContactForm, { id: number; label: string }, ResponseCompany>
                            control={control}
                            endpoint='company'
                            name='company_id'
                            label='Perusahaan'
                            readOnly={readOnly}
                            size='medium'
                            formatOptions={response => {
                                const options = response.data

                                if (!options) return []

                                return options.map(option => ({
                                    id: option.id,
                                    label: option.company_name,
                                }))
                            }}
                        />
                    </Grid>
                <Grid item xs={12} >
                    <TextField
                        control={control}
                        name='code'
                        label='Code'
                        placeholder='Masukan Code'
                        InputProps={{ readOnly: true }}
                        isReadOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={12}  sx={{ display: 'flex', gap: 3, mt: -2 }}>
                    <SwitchComponent control={control} label='Status' name='status' readOnly={readOnly} />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        control={control}
                        name='name'
                        label='Nama *'
                        placeholder='Masukan Nama'
                        isReadOnly={readOnly}
                        InputProps={{ readOnly }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        control={control}
                        name='email'
                        label='Email'
                        placeholder='Masukan Email'
                        isReadOnly={readOnly}
                        InputProps={{ readOnly }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        control={control}
                        name='phone'
                        label='No Telp'
                        placeholder='Masukan No Telp'
                        isReadOnly={readOnly}
                        InputProps={{ readOnly, startAdornment: '+62\u00A0' }}
                        type='number'
                    />
                </Grid>
                <Grid item xs={12} >
                    <ServerSideAutoComplete<ContactForm, { id: number; label: string }, ResponseBranch>
                        control={control}
                        endpoint='branch'
                        readOnly={readOnly}
                        name='branch_id'
                        label={isEmployee ? 'Branch' : 'Branch (optional)'}
                        queryEndpoint={{
                            company_id: user?.is_admin ? Number(watch('company_id')?.id) : Number(user?.company.id),
                        }}
                        formatOptions={response => {
                            const options = response?.data

                            if (!options) return []

                            return options.map(option => ({
                                id: option.id,
                                label: option.name,
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        control={control}
                        name='address'
                        label='Alamat'
                        placeholder='Masukan Alamat'
                        isReadOnly={readOnly}
                        InputProps={{ readOnly }}
                    />
                </Grid>

                {isCustomer || (
                    <>
                        <Grid item xs={12} md={isCustomerSelected ? 6 : 12}>
                            <Typography variant='subtitle1' gutterBottom mt={-1}>
                                Kontak sebagai * :
                            </Typography>
                            <Box display='flex' flexDirection='row' gap={1} alignItems='center' marginTop={-1}>
                                <Controller
                                    name='is_customer'
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    sx={{}}
                                                    disabled={readOnly || isCustomer}
                                                    checked={field?.value}
                                                />
                                            }
                                            label='Pelanggan'
                                        />
                                    )}
                                />
                                <Controller
                                    name='is_vendor'
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} disabled={readOnly} checked={field?.value} />}
                                            label='Pemasok'
                                        />
                                    )}
                                />
                                <Controller
                                    name='is_employee'
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} disabled={readOnly} checked={field?.value} />}
                                            label='Karyawan'
                                        />
                                    )}
                                />
                              
                            </Box>
                            {errors.is_customer && <p className='text-red-500'>{errors.is_customer.message}</p>}
                        </Grid>
                        {(isCustomerSelected && !readOnly) || (readOnly && form.formState.defaultValues?.post_paid) ? <Grid item xs={12} >
                            <StaticAutoComplete
                                options={postPaidSchema}
                                name='post_paid'
                                fullWidth
                                readOnly={readOnly}
                                control={control}
                                label='Skema Post Paid'
                            />
                        </Grid> : null}
                    </>
                )}

                {(isEmployee && businessTypeCode == "laundry") && (
                    <>
                        <Grid item xs={12} >
                            <TextField
                                control={control}
                                name='account_name'
                                label='Nama Rekening'
                                placeholder='Masukan Nama Rekening'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                control={control}
                                name='account_number'
                                label='Nomor Rekening'
                                placeholder='Masukan Nomor Rekening'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                control={control}
                                name='npwp'
                                label='NPWP'
                                placeholder='Masukan NPWP'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomTextField
                                control={control}
                                name='salary'
                                label='Gaji'
                                placeholder='Masukan Gaji'
                                inputFormat='PRICE'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomTextField
                                control={control}
                                name='employee_id'
                                label='ID Karyawan'
                                placeholder='Masukan ID Karyawan'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <DatePicker
                                readOnly={readOnly}
                                sx={{ backgroundColor: 'white', borderRadius: 1 }}
                                label='Tanggal Recruitment'
                                value={watch('hire_date') ? dayjs(watch('hire_date')) : null}
                                format='DD MMMM YYYY'
                                onChange={newValue => {
                                    form.setValue('hire_date', newValue ? dayjs(newValue).format('YYYY-MM-DD') : '')
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'medium',

                                        error: form.formState.errors.hasOwnProperty(''),
                                        InputProps: {
                                            readOnly: readOnly,
                                        },
                                    },
                                }}
                            />
                        </Grid>
                       
                        <Grid item xs={12} >
                            <TextField
                                control={control}
                                name='position'
                                label='Posisi'
                                placeholder='Masukan Posisi'
                                isReadOnly={readOnly}
                                InputProps={{ readOnly }}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <StaticAutoComplete
                                options={salary_type}
                                name='salary_type'
                                fullWidth
                                readOnly={readOnly}
                                control={control}
                                label='Jenis Gaji'
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <MUITextField
                                label='Foto Karyawan'
                                variant='outlined'

                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <input
                                                id='file-input'
                                                type='file'
                                                accept='image/*'
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            {watch('image') ? (
                                                <>
                                                    {!readOnly && (
                                                        <Tooltip title='Hapus Gambar'>
                                                            <InputAdornment position='end'>
                                                                <IconButton onClick={() => setValue('image', null)}>
                                                                    <IconifyIcon
                                                                        icon='mdi:close-circle'
                                                                        color='error'
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        </Tooltip>
                                                    )}
                                                    <Tooltip title='Lihat Gambar'>
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={toggleImage}>
                                                                <IconifyIcon icon='quill:eye' color='info' />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    </Tooltip>

                                                </>
                                            ) : (
                                                <Button
                                                    sx={{ width: '120px' }}
                                                    variant='contained'
                                                    onClick={handleButtonClick}
                                                    endIcon={!loadingImage && <UploadFileIcon />}
                                                    disabled={loadingImage}
                                                    fullWidth
                                                >
                                                    {loadingImage ? <CircularProgress size={20} /> : 'Choose File'}
                                                </Button>
                                            )}
                                        </InputAdornment>
                                    ),
                                    readOnly: true,
                                }}
                                value={watch('image') ? watch('image')?.split('/').pop() : ''}
                            />
                        </Grid>
                        {openImage && <ShowImage open={openImage} toggle={toggleImage} image={watch('image') || ''} />}
                    </>
                )}
            </Grid> */}
        </>
    )
}

export default FormDataTrip
