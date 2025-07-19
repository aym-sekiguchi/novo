'use client'

import { LandPlot, MessageCircleWarning, Undo2 } from 'lucide-react'
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
	Button,
} from '@/components'
import { useFormAction, useToggle } from '@/hooks'

import { propertyDeployAction } from './property-deploy-actions'

export function PropertyDeployForm(props: { data: string; id: string; isDraft: boolean }): React.ReactNode {
	/* === props === */
	const { data, id, isDraft } = props

	/* === hooks === */
	const [open, toggle] = useToggle(false)

	const router = useRouter()

	const { formAction } = useFormAction({
		onAction: propertyDeployAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	/* === event === */
	const handleClickDeploy = async (): Promise<void> => {
		await formAction({ id, value: data })
	}

	/* === return === */
	return (
		<>
			<Button className="flex h-16 w-full items-center gap-2" disabled={!isDraft} onClick={toggle}>
				<LandPlot size={24} strokeWidth={1.5} />
				<p className="text-xl">本番に反映</p>
			</Button>

			<AlertDialog onOpenChange={toggle} open={open}>
				<AlertDialogContent className="max-w-sm">
					<AlertDialogHeader>
						<AlertDialogTitle className="flex items-center gap-2">
							本番サイトに反映
							<MessageCircleWarning className="text-destructive -translate-y-0.5" />
						</AlertDialogTitle>
						<AlertDialogDescription>
							この操作は取り消すことができません。一度データを反映すると、復元することは不可能になります。本当に本番サイトに反映してもよろしいですか？
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!justify-between">
						<AlertDialogCancel className="flex items-center gap-2" onClick={toggle}>
							<Undo2 size={20} strokeWidth={1.5} />
							<span>戻る</span>
						</AlertDialogCancel>
						<AlertDialogAction buttonProps={{ variant: 'success' }} className="flex items-center gap-2" onClick={handleClickDeploy}>
							<LandPlot className="text-white" size={20} strokeWidth={1.5} />
							<span>反映</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
