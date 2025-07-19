'use server'

import { auth } from '@/actions'

import type { Session } from 'next-auth'

export async function getSession(): Promise<Session['user']> {
	const session = await auth()

	// Check if the user is signed in
	if (!session || !session.user) throw new Error('セッションが見つかりません。')

	/* === return ===  */
	return session.user
}
