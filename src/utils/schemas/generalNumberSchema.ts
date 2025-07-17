import { z } from 'zod'

export const generalNumberSchema = z.string().nullish()

export const generalNumberTransformSchema = z
    .string()
    .nullish()
    .transform(value => (value ? Number(value) : null))
