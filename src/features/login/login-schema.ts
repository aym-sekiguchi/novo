import { z } from 'zod'

export const loginSchema = z.object({
	password: z.string().min(8, { message: 'パスワードは8文字以上で入力してください。' }),
	username: z.string().min(1, { message: 'ユーザー名を入力してください。' }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
