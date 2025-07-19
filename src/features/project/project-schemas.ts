import { z } from 'zod'

/**
 * プロジェクトの新規作成時のバリデーションスキーマ
 */
export const createProjectSchema = z
	.object({
		'confirm-password': z.string().min(8, 'パスワードは8文字以上入力してください。').max(64, 'パスワードは64文字以内で入力してください。'),
		name: z.string().min(1, 'プロジェクト名は1文字以上入力してください。').max(64, 'プロジェクト名は64文字以内で入力してください。'),
		'new-password': z.string().min(8, 'パスワードは8文字以上入力してください。').max(64, 'パスワードは64文字以内で入力してください。'),
		tags: z.array(z.string()).optional(),
		username: z
			.string()
			.min(1, 'ユーザー名は1文字以上入力してください。')
			.max(64, 'ユーザー名は64文字以内で入力してください。')
			.regex(/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{}|;':",.<>?/]+$/, {
				message: 'アルファベットと記号のみを入力してください。',
			}),
	})
	.refine((data) => data['new-password'] === data['confirm-password'], {
		message: 'パスワードが一致しません。',
		path: ['confirm-password'],
	})

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>

/**
 * プロジェクトの更新時のバリデーションスキーマ
 */
export const updateProjectSchema = z.object({
	isPublic: z.boolean(),
	name: z.string().min(1, 'タイトルは1文字以上入力してください。').max(255, 'タイトルは255文字以内で入力してください。'),
	tags: z.array(z.string()).optional(),
})

export type UpdateProjectSchemaType = z.infer<typeof updateProjectSchema>

/**
 * プロジェクトの削除時のバリデーションスキーマ
 */
