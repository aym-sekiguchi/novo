import edjsHTML from 'editorjs-html'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getMemo } from '@/actions/src/get-memo'
import { getProperty } from '@/actions/src/get-property'
import { Badge, Button, Card, CardContent, Screen, ScrollArea } from '@/components'
import { base64 } from '@/utilities'

import type { OutputData } from '@editorjs/editorjs'

// Type
type PageProps = { params: Promise<{ username: string }> }

/**
 * ページ
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	/* ===  data === */
	// パラメーターからusernameを取得
	const { username } = await props.params

	// プロジェクトの情報からavatar/isPublic/nameを取得
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())

	// セッション情報からroleを取得
	const { role } = await getSession()

	// 物件概要を取得
	const { isPublic: propertyIsPublic } = await getProperty(username).catch(() => {
		throw new Error('物件概要の取得に失敗しました。')
	})

	// メモを取得
	const { content: memo } = await getMemo(username).catch(() => {
		throw new Error('メモの取得に失敗しました。')
	})

	// メモをオブジェクトに変換
	const outputData = memo ? (JSON.parse(base64.decode(memo)) as OutputData) : { blocks: [] }

	// オブジェクト形式のメモをHTMLに変換
	const convertedMemo = edjsHTML().parse(outputData)

	/* ===  return === */
	return (
		<>
			<Screen avatar={avatar} breadcrumb={[{ href: '', label: 'Home' }]} isPublic={isPublic} projectName={name} role={role} username={username}>
				<div className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
					{(isPublic || (!isPublic && role === 'admin')) && (
						<Link className="min-h-[11.25rem] transition hover:brightness-90" href={`/${username}/property`}>
							<Card className="size-full">
								<CardContent className="flex flex-col gap-1.5">
									<p className="text-lg font-bold tracking-tight md:text-xl">物件概要</p>
									<p className="text-neutral-foreground text-xs md:text-sm">物件概要の新規作成、更新、削除</p>
									{role === 'admin' && (
										<div className="pt-1.5">
											<Badge className="w-fit" variant={propertyIsPublic ? 'success' : 'warning'}>
												{propertyIsPublic ? '稼働中' : '停止中'}
											</Badge>
										</div>
									)}
								</CardContent>
							</Card>
						</Link>
					)}
					<Card className="col-span-full size-full min-h-[11.25rem]">
						<CardContent className="relative flex flex-col gap-4">
							<Button asChild className="absolute -top-2 right-2 flex items-center gap-2 md:-top-2 md:right-4" variant="outline">
								<Link href={`./${username}/memo`}>
									<Pencil size={16} strokeWidth={1.5} />
									<p className="text-sm">編集する</p>
								</Link>
							</Button>
							<p className="text-neutral-foreground text-sm tracking-tight">メモ</p>
							<ScrollArea className="h-[50vh]">
								<div className="prose dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: convertedMemo }} />
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</Screen>
		</>
	)
}
