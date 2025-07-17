import { z } from 'zod'

const filterStatusSchema = z.union([z.literal('all'), z.literal('active'), z.literal('nonactive')])

export default filterStatusSchema
