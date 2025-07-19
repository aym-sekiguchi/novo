'use server'

import { signOut } from '@/actions'
import { sleep } from '@/utilities'

/**
 * ログアウト処理
 *
 */
export async function logoutAction(): Promise<{ status: number }> {
	await sleep(1000)
	await signOut({ redirect: false })

	return { status: 200 }
}
