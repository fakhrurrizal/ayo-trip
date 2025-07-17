import { z } from 'zod'

export const generalOptionSchema = z
    .object({
        id: z.number().optional(),
        name: z.string().optional(),
        label: z.string().optional(),
    })
    .nullable()

export const generalOptionTransformSchema = generalOptionSchema.transform(value => value?.id ?? null)
