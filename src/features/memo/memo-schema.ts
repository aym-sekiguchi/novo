import { z } from 'zod'

export const memoSchema = z.object({
	memo: z.string(),
})

export type MemoSchemaType = z.infer<typeof memoSchema>
