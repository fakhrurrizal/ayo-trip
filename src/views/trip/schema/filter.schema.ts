import { generalOptionSchema } from '@/utils/schemas/generalOptionSchema'
import dayjs from 'dayjs'
import { z } from 'zod'

export const filterSchema = z
    .object({
        created_at_margin_top: z.any().nullable().optional(),
        created_at_margin_bottom: z.any().nullable().optional(),
        is_vendor: z.boolean().optional(),
        is_customer: z.boolean().optional(),
        is_employee: z.boolean().optional(),
        sort: generalOptionSchema.optional(),
        status: generalOptionSchema.optional(),
    })
    .transform(data => {
        const newData: any = data

        if (data.sort) {
            newData.sort = data.sort.id
        }

        if (data.created_at_margin_top) {
            newData.created_at_margin_top = dayjs(data.created_at_margin_top).format('YYYY-MM-DD')
        }

        if (data.created_at_margin_bottom) {
            newData.created_at_margin_bottom = dayjs(data.created_at_margin_bottom).format('YYYY-MM-DD')
        }

        return data
    })

export type filterForm = z.infer<typeof filterSchema>
