import { z } from 'zod'

export const settingApplicationSchema = z.object({
	domains: z.array(
		z
			.string()
			.trim() // 前後のスペースを削除
			.toLowerCase() // 小文字に変換
			.url({ message: '無効なURL形式です（例: https://example.com）' }), // URL形式を検証
	),
	isDraft: z.boolean(),
	isPublic: z.boolean(),
})

export type SettingApplicationSchemaType = z.infer<typeof settingApplicationSchema>
