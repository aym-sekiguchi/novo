import { z } from 'zod'

/**
 * 物件概要編集時のバリデーションスキーマ
 *
 */

const colorSchema = z
	.string({ message: '必須項目です。' })
	.transform((val) => (val.startsWith('#') ? val : `#${val}`)) // `#`がなければ追加
	.refine((val) => /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(val), {
		message: '形式が正しくありません (3, 4, 6, 8のいずれかの桁数にしてください。)',
	})

const fontSizeSchema = z.number().min(10, { message: '10以上の数値を入力してください。' }).max(32, { message: '100以下の数値を入力してください。' })

export const propertyStyleSchema = z.object({
	caption: z.object({
		color: colorSchema,
		fontSize: fontSizeSchema,
	}),
	notice: z.object({
		color: colorSchema,
		fontSize: fontSizeSchema,
		variant: z.enum(['default', 'flex', 'outline', 'fill', 'separator']),
	}),
	separator: z.object({
		color: colorSchema,
		weight: z.number().min(1, { message: '1以上の数値を入力してください。' }).max(10, { message: '10以下の数値を入力してください。' }),
	}),
	table: z.object({
		color: colorSchema,
		fontSize: fontSizeSchema,
		outline: z.boolean(),
		separator: z.boolean(),
		variant: z.enum(['default', 'even', 'odd', 'label', 'value']),
	}),
})

export type PropertyStyleSchemaType = z.infer<typeof propertyStyleSchema>
