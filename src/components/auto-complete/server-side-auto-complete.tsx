import { useEffect, useState } from 'react'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import qs from 'query-string'
import { Control, Controller, FieldValues, Path, PathValue, useWatch } from 'react-hook-form'
import { Button } from '@mui/material'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import { ApiEndpoint, getApi, getModalId, modalIdsType } from '@/utils'
import { GeneralOption, GeneralOptionsResponse } from '@/interfaces'
import { axiosInterceptor } from '@/config'
import { useDebounce, useModalStore } from '@/services'
import { MUITextField } from '@/components'

interface ServerSideAutoCompleteProps<Form extends FieldValues, Option, Response>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    formatOptions?: (options: Response) => Option[]
    endpoint: ApiEndpoint
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    queryEndpoint?: Record<string, number | string | boolean>
    idEndpoint?: string | number
    label?: string
    disabled?: boolean
    variant?: 'outlined' | 'standard' | 'filled'
    readOnly?: boolean
    defaultValue?: any
    placeholder?: string
    setTextSearch?: (searchValue: any) => void
    excludeId?: number
    selectedOptions?: any
    handleToggleFormAdd?: any
    titleAddNewFreeSolo?: any
    titleAddNewNoOption?: any
    handleToggleFormAddFreeSolo?: any
    filterSelectedOptions?: boolean
    modalLookupId?: modalIdsType
}

export function ServerSideAutoComplete<
    Form extends FieldValues,
    Option = GeneralOption,
    Response = GeneralOptionsResponse,
>(props: ServerSideAutoCompleteProps<Form, Option, Response>) {
    const {
        control,
        name,
        endpoint,
        idEndpoint,
        disabled,
        queryEndpoint = {},
        formatOptions = res => (res as GeneralOptionsResponse).data,
        onValueChange,
        variant = 'outlined',
        label = '',
        readOnly = false,
        defaultValue = null,
        placeholder = `Pilih ${label}...`,
        setTextSearch,
        excludeId,
        handleToggleFormAdd,
        titleAddNewNoOption = '',
        handleToggleFormAddFreeSolo,
        filterSelectedOptions = true,
        modalLookupId,
        ...muiAutoCompleteProps
    } = props

    const { openExclusiveModal, setFormValues, setRequestedFieldFormName } = useModalStore()

    const [open, setOpen] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>('')

    const searchValue = useDebounce<string>(inputValue)

    const [showLookup, setShowLookup] = useState(false)

    const {
        data,
        refetch: getData,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<Response & GeneralOptionsResponse>({
        queryFn: async ({ pageParam }) => {
            const apiEndpoint = qs.stringifyUrl({
                url: idEndpoint ? `${getApi(endpoint)}/${idEndpoint}` : getApi(endpoint),
                query: {
                    page: pageParam as number,
                    status: true,
                    ...queryEndpoint,
                    ...(searchValue ? { search: searchValue, limit: 20 } : { limit: 20 }),
                },
            })
            const res = await axiosInterceptor.get(apiEndpoint)

            if (!res.data.data) {
                res.data.data = []
            }

            return res.data
        },
        refetchOnWindowFocus: false,
        getNextPageParam: lastGroup => (lastGroup.next ? lastGroup.current_page + 1 : undefined),
        queryKey: [name, excludeId, queryEndpoint, searchValue, endpoint],
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        enabled: open,
    })

    const handleScroll = (event: any) => {
        const listboxNode = event.currentTarget

        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight && hasNextPage) {
            fetchNextPage()
        }
    }

    useEffect(() => {
        if (setTextSearch) {
            setTextSearch(searchValue)
        }
        if (open) getData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, searchValue, getData])

    const DataList = data?.pages.flatMap(page => (formatOptions(page) as Option[]) ?? [], [data]) ?? []

    const formValues = useWatch({ control })

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, ...moreField } = field

                const error = Boolean(fieldState?.error)
                const helperText = fieldState?.error?.message

                console.log(field.value)

                return (
                    <MuiAutocomplete<Option, boolean, boolean, boolean>
                        {...muiAutoCompleteProps}
                        {...moreField}
                        value={field.value}
                        readOnly={readOnly}
                        defaultValue={defaultValue}
                        ListboxProps={{
                            onScroll: handleScroll,
                            className: ' scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full  scrollbar-thumb-pr-10',
                        }}
                        onChange={(e, value: any, ...restEvent) => {
                            console.log('autocomplete', value)
                            const valueType = value ? typeof value?.[value?.length - 1 || 0] : null

                            if (valueType == 'string') {
                                handleToggleFormAddFreeSolo()

                                return
                            }

                            if (onValueChange) {
                                onValueChange(e, value, ...restEvent)
                            }
                            setInputValue('')

                            onChange(value as unknown as React.ChangeEvent<Element> | PathValue<Form, Path<Form>>)
                        }}
                        componentsProps={{
                            popper: {
                                sx: {
                                    zIndex: 10000,
                                },
                            },
                        }}
                        noOptionsText={
                            handleToggleFormAdd && inputValue !== '' ? (
                                <Button
                                    color='primary'
                                    fullWidth
                                    sx={{ justifyContent: 'flex-start', pl: 2, py: 0 }}
                                    onMouseDown={event => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        // setInputValue('')
                                        handleToggleFormAdd()
                                    }}
                                    startIcon={<Icon icon='zondicons:add-solid' />}
                                >
                                    {titleAddNewNoOption == '' ? `Tambah data ${inputValue}` : titleAddNewNoOption}
                                </Button>
                            ) : (
                                'Tidak ada Data'
                            )
                        }
                        options={DataList}
                        filterSelectedOptions={filterSelectedOptions}
                        disabled={disabled}
                        onOpen={() => {
                            setOpen(true)
                            setShowLookup(true)
                        }}
                        onClose={() => {
                            setInputValue('')
                            setShowLookup(false)
                            setOpen(false)
                        }}
                        onMouseEnter={() => setShowLookup(true)}
                        onMouseLeave={() => {
                            if (!open) {
                                setShowLookup(false)
                            }
                        }}
                        loading={isLoading}
                        forcePopupIcon={!readOnly}
                        renderInput={params => (
                            <MUITextField
                                variant={variant}
                                sx={{
                                    fontSize: 12,
                                    '& .MuiInputBase-input:hover': {
                                        cursor: readOnly ? 'default' : '',
                                    },
                                }}
                                {...params}
                                label={label}
                                error={error}
                                size='small'
                                onChange={event => {
                                    setInputValue(event.target.value)
                                }}
                                helperText={helperText}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {showLookup && modalLookupId && (
                                                <div
                                                    onClick={() => {
                                                        setShowLookup(false)
                                                        if (formValues && modalLookupId) {
                                                            setRequestedFieldFormName(name)
                                                            setFormValues(formValues)
                                                        }
                                                        openExclusiveModal(getModalId(modalLookupId))
                                                    }}
                                                    className={`flex absolute top-[10px] ${field.value && !muiAutoCompleteProps.disableClearable ? 'right-[50px]' : 'right-[30px]'}  items-center hover:cursor-pointer`}
                                                >
                                                    <Icon icon='material-symbols:search' className='text-[17px]' />
                                                </div>
                                            )}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                                placeholder={readOnly ? undefined : placeholder}
                            />
                        )}
                    />
                )
            }}
        />
    )
}
