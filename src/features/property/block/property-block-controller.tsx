'use client'

import { MessageCircleWarning, Trash2, Undo2 } from 'lucide-react'
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
	Handler,
} from '@/components'
import { useFormAction, useToggle } from '@/hooks'

import { deletePropertyBlockAction } from './property-block-action'
import { useEditProperty } from './property-blocks'

import type { PropertyBlockData } from '@/types'

export function PropertyBlockController(props: { block: PropertyBlockData }): React.ReactNode {
	/* === props === */
	const { block } = props

	/* === hooks === */
	const { id } = useEditProperty()

	const router = useRouter()

	const [open, toggle] = useToggle(false)

	const { formAction } = useFormAction({
		onAction: deletePropertyBlockAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	const handleClickDelete = async (): Promise<void> => {
		await formAction({ blockId: block.id, id })
	}

	/* === return === */
	return (
		<>
			<div>
				{/* <Tooltip content={block.isPublic ? '削除' : '非公開に設定されています'}>
					<div className="cursor-pointer">
						<Button className="size-8" disabled={!block.isPublic} onClick={toggle} size="icon" variant="destructive">
							<FileX className="size-5 text-white" strokeWidth={1.5} />
						</Button>
					</div>
				</Tooltip> */}
				<Handler className="hover:bg-unset h-full w-10" id={block.id} />
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
