import { Suspense } from 'react'

import { Footer, ThemeSelector } from '@/components'
import { LoginForm } from '@/features'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'ログイン',
}

/**
 * ログインページ
 *
 * @returns
 */
export default function Home(): React.ReactNode {
	return (
		<div className="flex flex-1 flex-col">
			{/* theme */}
			<div className="fixed top-2 right-2">
				<ThemeSelector />
			</div>

			{/* main */}
			<main className="container flex flex-1 flex-col items-center justify-center py-6 md:py-10">
				<Suspense>
					<LoginForm />
				</Suspense>
			</main>

			{/* footer */}
			<Footer />
		</div>
	)
}
