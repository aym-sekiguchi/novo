import { ThemeProvider } from 'next-themes'

import { Toast } from '@/components'

import type { Metadata } from 'next'

import '@/styles/app.css'

export const metadata: Metadata = {
	applicationName: 'Novo',
	creator: 'スタンドアローン株式会社',
	description: '不動産サイト編集システム',
	robots: { follow: false, index: false },
	title: { default: 'Novo', template: `%s | Novo` },
}

export default function RootLayout(props: { children: React.ReactNode }): React.ReactNode {
	/* === props === */
	const { children } = props

	/* === return === */
	return (
		<html className="" lang="ja" suppressHydrationWarning>
			<body className="flex min-h-dvh flex-col">
				<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
					<div className="flex flex-1 flex-col">{children}</div>
					<Toast />
				</ThemeProvider>
			</body>
		</html>
	)
}
