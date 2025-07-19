import { z } from 'zod'

/**
 * 物件概要編集時のバリデーションスキーマ
 *
 */

export const propertyBlockSchema = z.object({
	contents: z.string().optional(),
	data: z
		.object({
			caption: z.string().optional(),
			description: z.string().optional(),
			subject: z.string().optional(),
			table: z
				.array(
					z.object({
						label: z.string(),
						value: z.string().optional(),
					}),
				)
				.min(1, { message: '1つ以上の項目が必要です' })
				.transform((table) => {
					if (!table) return table
					const _table = table.filter((item, index) => index === 0 || !(item.label == '' && item.value == ''))
					return _table
				}),
		})
		.optional(),
	isPublic: z.boolean(),
	order: z.number(),
	type: z.enum(['caption', 'notice', 'custom', 'table', 'separator']),
})

export type PropertyBlockSchemaType = z.infer<typeof propertyBlockSchema>
