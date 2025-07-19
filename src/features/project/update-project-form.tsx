'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserPen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Input,
	ScrollArea,
	Button,
	Switch,
	ArrayInput,
} from '@/components'
import { useFormAction } from '@/hooks'

import { updateProjectAction } from './project-actions'
import { useProject } from './project-provider'
import { updateProjectSchema } from './project-schemas'

import type { UpdateProjectSchemaType } from './project-schemas'

/**
 * UpdateProjectForm
 * プロジェクト編集
 * *
 * @returns
 */
export function UpdateProjectForm(): React.ReactNode {
	/* === hooks === */
	const { formState, onFormState } = useProject()

	const router = useRouter()

	const { formAction } = useFormAction<{ id: string; values: UpdateProjectSchemaType }>({
		onAction: updateProjectAction,
		onSuccess: () => {
			router.refresh()
			form.reset()
			onFormState({ state: 'none' })
		},
	})

	/* === event === */
	const onOpenChange = (open: boolean): void => {
		onFormState({ state: open ? 'update' : 'none' })
	}

	// フォームフック
	const form = useForm<UpdateProjectSchemaType>({
		defaultValues: { isPublic: false, name: '', tags: [] },
		resolver: zodResolver(updateProjectSchema),
	})
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: UpdateProjectSchemaType): Promise<void> {
		if (!formState.project) return
		await formAction({ id: formState.project.id, values })
	}

	useEffect(() => {
		if (!formState.project) return
		form.setValue('isPublic', formState.project.isPublic)
		form.setValue('name', formState.project.name)
		form.setValue('tags', formState.project.tags)
	}, [formState]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (formState.state !== 'update') form.reset()
	}, [formState.state, form])

	/* === return === */
	return (
		<Sheet onOpenChange={onOpenChange} open={formState.state === 'update'}>
			{/* TODO focusが一発で変わらない */}
			<SheetContent className="flex flex-col !px-0 sm:max-w-[425px]" onOpenAutoFocus={(event) => event.preventDefault()}>
				<SheetHeader className="px-3 md:px-6">
					<SheetTitle className="m-0">プロジェクト編集</SheetTitle>
					<SheetDescription className="sr-only"></SheetDescription>
				</SheetHeader>
				<ScrollArea className="flex-1">
					<Form {...form}>
						<form
							className="flex w-full flex-col items-center gap-4 px-3 md:px-6"
							id="update-project-form"
							onKeyDown={(e) => {
								if (e.key === 'Enter') e.preventDefault()
							}}
							onSubmit={form.handleSubmit(onSubmit)}
							role="presentation"
						>
							{/* プロジェクト名 */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel required>プロジェクト名</FormLabel>
										<FormControl>
											<Input {...field} autoComplete="off" disabled={isSubmitting} placeholder="ノーヴォ" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* 公開 */}
							<FormField
								control={form.control}
								name="isPublic"
								render={({ field }) => (
									<FormItem className="flex w-full items-center gap-3">
										<FormLabel>公開</FormLabel>
										<FormControl>
											<Switch checked={field.value} disabled={isSubmitting} onCheckedChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* タグ */}
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>タグ</FormLabel>
										<FormControl>
											<ArrayInput disabled={isSubmitting} field={field} valueName="タグ" values={form.getValues('tags')} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</ScrollArea>
				<SheetFooter className="px-3 md:px-6">
					<Button className="flex items-center gap-2" disabled={isSubmitting} form="update-project-form" type="submit">
						<UserPen size="20" strokeWidth={1.5} />
						<span>保存</span>
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
