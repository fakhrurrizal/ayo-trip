import { z } from 'zod'

export const homeSchema = z
    .object({
        trip_id: z.object({ label: z.string(), id: z.number() }).nullable(),
    })
    .superRefine((data, context) => {
        if (!data.trip_id) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Kategori Trip tidak boleh kosong',
            })
        }
    })
    .transform(data => {
        const newData: any = { ...data }

        if (data.trip_id) {
            newData.trip_id = data.trip_id.id
        }

        return newData
    })

export type HomeForm = z.infer<typeof homeSchema>
