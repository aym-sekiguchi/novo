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
} from '@/components'
import { useFormAction } from '@/hooks'

import { deleteProjectAction } from './project-actions'
import { useProject } from './project-provider'

export function ProjectDeleteForm(): React.ReactNode {
	/* === hooks === */
	const { formState, onFormState } = useProject()

	const router = useRouter()

	const { formAction } = useFormAction({
		onAction: deleteProjectAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	/* === event === */
	const onOpenChange = (open: boolean): void => {
		onFormState({ state: open ? 'delete' : 'none' })
	}

	const handleClickDelete = async (): Promise<void> => {
		if (!formState.project) return
		await formAction(formState.project.id)
	}

	if (!formState.project) return null

	/* === return === */
	return (
		<>
			<AlertDialog onOpenChange={onOpenChange} open={formState.state === 'delete'}>
				<AlertDialogContent className="max-w-sm">
					<AlertDialogHeader>
						<AlertDialogTitle className="flex items-center gap-2">
							<span>{formState.project.name}を削除</span>
							<MessageCircleWarning className="text-destructive -translate-y-0.5" />
						</AlertDialogTitle>
						<AlertDialogDescription>
							この操作は取り消すことができません。一度データを削除すると、復元することは不可能になります。本当に削除してもよろしいですか？
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!justify-between">
						<AlertDialogCancel className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
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
