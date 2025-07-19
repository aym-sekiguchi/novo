// TODO ベータ版のため、正規リリース後に改修が必要

import { isDev } from '@/utilities'

import type { NextAuthConfig } from 'next-auth'

const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * NextAuth 設定
 *
 */
export const authConfig = {
	debug: isDev,
	jwt: { maxAge: MAX_AGE },
	pages: { signIn: '/login' },
	providers: [],
	secret: process.env.AUTH_SECRET,
	session: { maxAge: MAX_AGE, strategy: 'jwt' },
	trustHost: true,
} satisfies NextAuthConfig
