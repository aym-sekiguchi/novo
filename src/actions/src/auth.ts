// TODO ベータ版のため、正規リリース後に改修が必要

import Credentials from '@auth/core/providers/credentials'
import NextAuth from 'next-auth'
import * as z from 'zod'

import { authConfig } from '@/configs/auth'

/**
 * next-auth の設定
 *
 */
export const { auth, signIn, signOut } = NextAuth({
	...authConfig,

	callbacks: {
		jwt({ token, user }) {
			if (user) Object.assign(token, user) // サインイン時にトークンにユーザー情報を追加

			/* === return === */
			return token
		},
		session({ session, token }) {
			if (token) Object.assign(session.user, token) // セッションにトークンにユーザー情報を追加

			/* === return === */
			return session
		},
	},

	providers: [
		Credentials({
			authorize(credentials) {
				// スキーマ設定
				const signInSchema = z.object({
					role: z.string().min(1, { message: '権限がありません' }),
					username: z.string().min(1, { message: 'ユーザーネームがありません' }),
				})

				// パース
				const parsedCredentials = signInSchema.safeParse(credentials)

				// ログイン処理
				if (parsedCredentials.success) {
					/* === return === */
					return { ...parsedCredentials.data, email: '' }
				}

				/* === return === */
				return null
			},
		}),
	],
})
