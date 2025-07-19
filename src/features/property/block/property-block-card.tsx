'use client'

import { CircleChevronRight, Copy, FileX, MessageCircleWarning, Pencil, Trash2, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Badge,
	Button,
	Card,
	CardContent,
	Separator,
	Tooltip,
} from '@/components'
import { useFormAction, useToggle } from '@/hooks'

import { deletePropertyBlockAction, savePropertyBlockAction } from './property-block-action'
import { useEditProperty } from './property-blocks'

import type { PropertyBlockData } from '@/types'

/**
 * 物件概要カード
 *
 */

export function _PropertyBlockCard(props: { block: PropertyBlockData }): React.ReactNode {
	/* === props === */
	const { block } = props

	/* === return === */
	return (
		<Link className="w-[calc(100%-40px)] transition hover:brightness-90" href={`./blocks/edit/${block.id}`}>
			<Card className="h-auto">
				<CardContent className="!m-0 min-h-[3em] w-full !p-3">
					<div className="flex w-full items-center gap-4">
						<div className="flex flex-1 flex-col gap-1">
							<div className="flex items-center gap-4">
								<Badge className="w-fit" variant={block.isPublic ? 'success' : 'warning'}>
									{block.isPublic ? '公開中' : '非公開'}
								</Badge>
								<p className="text-neutral-foreground text-sm">
									{block.type === 'caption' && '注釈'}
									{block.type === 'notice' && '予告'}
									{block.type === 'separator' && '区切り線'}
									{block.type === 'table' && '表'}
									{block.type === 'custom' && 'カスタム'}
								</p>
							</div>
							{block.type !== 'separator' && (
								<div className="relative w-full overflow-hidden">
									&nbsp;
									<p className="absolute inset-0 w-[calc(100%+5em)] whitespace-pre-wrap max-md:text-sm">
										{/* table以外の時 */}
										{block.type !== 'table' && block.contents}

										{/* tableの時 */}
										{block.type === 'table' && (block.data?.subject || '無題の表')}
									</p>
									<div className="from-surface absolute inset-y-0 right-0 left-auto w-[8em] bg-linear-to-l to-transparent" />
								</div>
							)}
							{block.type === 'separator' && (
								<div className="flex h-[1.5em] items-center">
									<Separator className="bg-foreground" />
								</div>
							)}
						</div>
						<CircleChevronRight strokeWidth={1.5} />
					</div>
				</CardContent>
			</Card>
		</Link>
		// </Button>
	)
}

export function PropertyBlockCard(props: { block: PropertyBlockData; blockCount: number }): React.ReactNode {
	/* === props === */
	const { block, blockCount } = props

	/* === hooks === */
	const { id } = useEditProperty()

	const router = useRouter()

	const [open, toggle] = useToggle(false)

	const { formAction: copyFormAction } = useFormAction({
		onAction: savePropertyBlockAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	const { formAction: deleteFormAction } = useFormAction({
		onAction: deletePropertyBlockAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	const handleClickCopyBlock = async (): Promise<void> => {
		await copyFormAction({ blockId: '', id, values: { ...block, order: blockCount } })
	}

	const handleClickDelete = async (): Promise<void> => {
		await deleteFormAction({ blockId: block.id, id })
	}

	/* === return === */
	return (
		<>
			<div className="@container w-[calc(100%-40px)] py-4 pl-4 transition">
				<div className="flex w-full items-center gap-4 @max-lg:flex-col @max-lg:items-start @max-lg:gap-2">
					<div className="flex w-full max-w-311 flex-col gap-1 @max-lg:gap-2">
						<div className="flex items-center gap-4">
							<Badge className="w-fit" variant={block.isPublic ? 'success' : 'warning'}>
								{block.isPublic ? '公開中' : '非公開'}
							</Badge>
							<p className="text-neutral-foreground text-sm">
								{block.type === 'caption' && '注釈'}
								{block.type === 'notice' && '予告'}
								{block.type === 'separator' && '区切り線'}
								{block.type === 'table' && '表'}
								{block.type === 'custom' && 'カスタム'}
							</p>
						</div>
						{block.type !== 'separator' && (
							<div className="relative w-full overflow-hidden max-md:text-sm">
								&nbsp;
								<p className="absolute inset-0 w-[calc(100%+5em)] whitespace-pre-wrap">
									{/* table以外の時 */}
									{block.type !== 'table' && block.contents}

									{/* tableの時 */}
									{block.type === 'table' && (block.data?.subject || '無題の表')}
								</p>
								<div className="from-surface absolute inset-y-0 right-0 left-auto w-[8em] bg-linear-to-l to-transparent" />
							</div>
						)}
						{block.type === 'separator' && (
							<div className="flex h-[1.5em] items-center">
								<Separator className="bg-foreground" />
							</div>
						)}
					</div>
					<div className="flex max-w-md grow-1 justify-around gap-3">
						<Tooltip content={'編集'}>
							<Button asChild className="flex h-auto items-center gap-2 px-2 py-2" variant="secondary">
								<Link href={`./blocks/edit/${block.id}`}>
									<Pencil size={20} strokeWidth={1.5} />
									<p className="text-sm @max-lg:hidden">編集</p>
								</Link>
							</Button>
						</Tooltip>
						<Tooltip content={'複製'}>
							<Button className="flex h-auto items-center gap-2 px-2 py-2" onClick={handleClickCopyBlock} variant="secondary">
								<Copy size={20} strokeWidth={1.5} />
								<p className="text-sm @max-lg:hidden">複製</p>
							</Button>
						</Tooltip>
						<Tooltip content={!block.isPublic ? '削除' : '非公開に設定されています'}>
							<div className="cursor-pointer">
								<Button className="flex h-auto items-center gap-2 px-2 py-2" disabled={block.isPublic} onClick={toggle} variant="destructive">
									<FileX size={20} strokeWidth={1.5} />
									<p className="text-sm @max-lg:hidden">削除</p>
								</Button>
							</div>
						</Tooltip>
					</div>
				</div>
			</div>

			{/* 削除ダイアログ */}
			<AlertDialog onOpenChange={toggle} open={open}>
				<AlertDialogContent className="max-w-sm">
					<AlertDialogHeader>
						<AlertDialogTitle className="flex items-center gap-2">
							<span>
								{block.type === 'caption' && '注釈'}
								{block.type === 'notice' && '予告'}
								{block.type === 'separator' && '区切り線'}
								{block.type === 'table' && '表'}
								{block.type === 'custom' && 'カスタム'}を削除
							</span>
							<MessageCircleWarning className="text-destructive -translate-y-0.5" />
						</AlertDialogTitle>
						<AlertDialogDescription>
							この操作は取り消すことができません。一度データを削除すると、復元することは不可能になります。本当に削除してもよろしいですか？
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!justify-between">
						<AlertDialogCancel className="flex items-center gap-2" onClick={toggle}>
							<Undo2 size={20} strokeWidth={1.5} />
							<span>戻る</span>
						</AlertDialogCancel>
						<AlertDialogAction buttonProps={{ variant: 'destructive' }} className="flex items-center gap-2" onClick={handleClickDelete}>
							<Trash2 className="text-white" size={20} strokeWidth={1.5} />
							<span>削除</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
