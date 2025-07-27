import { House } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'
import { LogoutButton } from '@/components'

import type { Metadata } from 'next'

// Type
type PropertyLayoutProps = { children: React.ReactNode; params: Promise<{ username: string }> }

type PageProps = { params: Promise<{ username: string }> }

// metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { username } = await props.params
	const { name } = await getProject(username).catch(() => ({ name: 'not found' }))
	return {
		title: {
			default: '物件概要',
			template: `${name} | %s | 物件概要 | Novo`,
		},
	}
}

export default async function RootLayout(props: PropertyLayoutProps): Promise<React.ReactNode> {
	/* === props === */
	const { children, params } = props

	/* ===  data === */
	// パラメーターからusernameを取得
	const { username } = await params

	// セッション情報からroleを取得
	const { role } = await getSession()

	// 物件概要を取得
	const propertyStatus = await getProperty(username)
		.then((response) => {
			if (response.isPublic || role === 'admin') {
				return true
			} else {
				return false
				// throw new Error('物件概要が有効ではありません。')
			}
		})
		.catch((error) => {
			console.error(error)
			notFound()
		})

	/* === return === */
	return propertyStatus ? (
		children
	) : (
		<div className="mx-auto flex w-fit flex-1 flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center">
				<p className="text-xl">物件概要は現在停止中です。</p>
				<p className="text-sm">稼働させる場合は管理者までお問い合わせください。</p>
			</div>
			<Link className="border-line bg-background flex w-fit items-center gap-2 rounded-xl border px-4 py-2" href="/">
				<House size={18} />
				<p>ホームへ</p>
			</Link>
			<div className="border-line bg-background flex w-fit rounded-xl border px-4 py-2">
				<LogoutButton />
			</div>
		</div>
	)
}
