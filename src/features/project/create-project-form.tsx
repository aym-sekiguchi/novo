'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
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
	FormDescription,
	ScrollArea,
	PasswordInput,
	Button,
	ArrayInput,
} from '@/components'
import { useFormAction, useToggle } from '@/hooks'

import { createProjectAction } from './project-actions'
import { createProjectSchema } from './project-schemas'

import type { CreateProjectSchemaType } from './project-schemas'

/**
 * CreateProjectForm
 * プロジェクト新規作成
 * *
 * @returns
 */
export function CreateProjectForm(): React.ReactNode {
	/* === hooks === */
	const router = useRouter()

	const [open, toggle] = useToggle(false)

	const { formAction } = useFormAction<CreateProjectSchemaType>({
		onAction: createProjectAction,
		onSuccess: () => {
			router.refresh()
			toggle()
			form.reset()
		},
	})

	// フォームフック
	const form = useForm<CreateProjectSchemaType>({
		defaultValues: {
			'confirm-password': '',
			name: '',
			'new-password': '',
			tags: [],
			username: '',
		},
		resolver: zodResolver(createProjectSchema),
	})
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: CreateProjectSchemaType): Promise<void> {
		await formAction(values)
	}

	useEffect(() => {
		if (!open) form.reset()
	}, [open, form])
	/* === return === */
	return (
		<>
			{/* 新規作成ボタン */}
			<Button className="flex items-center gap-2" onClick={toggle}>
				<UserPlus size={20} strokeWidth={1.5} />
				<span>プロジェクト新規作成</span>
			</Button>
			{/* TODO focusが一発で変わらない */}
			<Sheet onOpenChange={toggle} open={open}>
				<SheetContent className="flex flex-col !px-0 sm:max-w-[425px]" onOpenAutoFocus={(event) => event.preventDefault()}>
					<SheetHeader className="px-3 md:px-6">
						<SheetTitle className="m-0">プロジェクト新規作成</SheetTitle>
						<SheetDescription className="sr-only"></SheetDescription>
					</SheetHeader>
					<div className={open ? 'block' : 'hidden'}>
						<ScrollArea className="flex-1">
							<Form {...form}>
								<form
									className="flex w-full flex-col items-center gap-4 px-3 md:px-6"
									id="create-project-form"
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
									{/* ユーザー名 */}
									<FormField
										control={form.control}
										name="username"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel required>ユーザー名</FormLabel>
												<FormControl>
													<div>
														<Input {...field} autoComplete="username" disabled={isSubmitting} placeholder="Novo" />
														<FormDescription>
															ログインに使用します。半角英数字と記号が使えます。
															<br />
															※あとから修正できません。
														</FormDescription>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* パスワード */}
									<FormField
										control={form.control}
										name="new-password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel required>パスワード</FormLabel>
												<FormControl>
													<PasswordInput autoComplete="new-password" disabled={isSubmitting} field={field} placeholder="新しいパスワード" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* パスワード確認 */}
									<FormField
										control={form.control}
										name="confirm-password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel required>パスワード(確認)</FormLabel>
												<FormControl>
													<PasswordInput disabled={isSubmitting} field={field} placeholder="パスワード再入力" />
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
					</div>
					<SheetFooter className="px-3 md:px-6">
						<Button className="flex items-center gap-2" disabled={isSubmitting} form="create-project-form" type="submit">
							<UserPlus size="20" strokeWidth={1.5} />
							<span>新規作成</span>
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	)
}
