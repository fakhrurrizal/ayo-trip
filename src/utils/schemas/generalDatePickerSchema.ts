import dayjs from 'dayjs'
import { z } from 'zod'

export const generalDatePickerSchema = z.any().nullish()

export const generalDatePickerTransformSchema = generalDatePickerSchema.transform(value =>
    dayjs(value).format('yyyy-MM-dd HH:mm:ss')
)
