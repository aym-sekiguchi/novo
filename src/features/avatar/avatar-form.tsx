'use client'
'use no memo'

import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUp, Save, Trash } from 'lucide-react'
import Image from 'next/image'
import { createContext, use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Label,
} from '@/components'
import { deleteFile, uploadFile } from '@/firebase/client'
import { useDisableInteraction, useFormAction } from '@/hooks'
import { imageCompression } from '@/utilities'

import { avatarAction } from './avatar-actions'
import { avatarSchema } from './avatar-schema'

import type { AvatarSchemaType } from './avatar-schema'
import type { Dispatch, SetStateAction } from 'react'

// context
type AvatarFormContextType = {
	avatar: AvatarSchemaType['avatar']
	id: string
	open: boolean
	setId: Dispatch<SetStateAction<string>>
	toggle: (open?: boolean) => void
}

export const AvatarFormContext = createContext<AvatarFormContextType>({ avatar: '', id: '', open: false, setId: () => {}, toggle: () => {} })

export function AvatarForm(props: { id: string }): React.ReactNode {
	/* === props === */
	const { id } = props

	/* === hooks === */
	const { avatar, open, toggle } = use(AvatarFormContext)

	const [file, setFile] = useState<File | null>(null)

	const [preview, setPreview] = useState<string | undefined>(avatar)

	const { disableInteraction, enableInteraction } = useDisableInteraction()

	const { formAction: uploadAction } = useFormAction<{ id: string; values: AvatarSchemaType }>({
		onAction: async ({ id, values }) => {
			try {
				// 前の画像があればstorageから削除
				if (avatar) {
					await deleteFile({ url: avatar })
				}

				// 圧縮をしてstorageにアップロードし、urlを取得
				if (file) {
					// 圧縮
					const compressedFile = await imageCompression(file)

					// upload
					const result = await uploadFile({ file: compressedFile, path: 'avatar' })

					Object.assign(values, { avatar: result })
				}

				/* === return === */
				return await avatarAction({ id, values })
			} catch (error) {
				console.error('アバター画像を保存できませんでした。', error)

				/* === return === */
				return { message: String(error), status: 500 }
			}
		},
		onSuccess: toggle,
	})

	const { formAction: deleteAction } = useFormAction<{ id: string }>({
		onAction: async ({ id }) => {
			try {
				setPreview(undefined)
				setFile(null)

				// 前の画像があればstorageから削除
				if (avatar) {
					await deleteFile({ url: avatar })
				}

				/* === return === */
				return await avatarAction({ id, values: { avatar: '' } })
			} catch (error) {
				console.error('アバター画像を削除できませんでした。', error)

				/* === return === */
				return { message: String(error), status: 500 }
			}
		},
		onSuccess: toggle,
	})

	// フォームフック
	const form = useForm<AvatarSchemaType>({ defaultValues: { avatar: '' }, resolver: zodResolver(avatarSchema) })
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: AvatarSchemaType): Promise<void> {
		// 絶対操作無効化
		disableInteraction()

		await uploadAction({ id, values: { avatar: values.avatar } })

		// 絶対操作無効化解除
		enableInteraction()
	}

	// アバター削除
	async function onDelete(): Promise<void> {
		// 絶対操作無効化
		disableInteraction()

		await deleteAction({ id })

		// 絶対操作無効化解除
		enableInteraction()
	}

	useEffect(() => {
		setPreview(avatar)
	}, [avatar])

	const onOpenChange = (open: boolean): void => {
		toggle(open)
		setPreview(undefined)
		setFile(null)
	}

	/* === return === */
	return (
		<>
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="">
					<DialogHeader>
						<DialogTitle>アバター変更</DialogTitle>
						<DialogDescription>アバター画像をアップロードしてください。</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form className="flex w-full flex-col items-end gap-4" id="avatar-form" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="avatar"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<div className="flex gap-4 max-md:flex-col max-md:items-center">
												<figure className="bg-neutral border-line size-20 shrink-0 overflow-hidden rounded-full border">
													{preview && <Image alt="" className="size-full object-cover" height={40} src={preview} width={40} />}
												</figure>
												<Label
													className="bg-field border-line flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border"
													htmlFor="avatar"
												>
													<ImageUp size={40} strokeWidth={1.5} />
													<p>Upload File</p>
												</Label>
												<Input
													accept="image/png, image/jpeg, image/webp, image/svg+xml"
													disabled={isSubmitting}
													hidden
													id="avatar"
													{...field}
													onChange={(e) => {
														const file = e.target.files?.[0]
														if (file && file.type.startsWith('image/')) {
															const imageUrl = URL.createObjectURL(file)
															setPreview(imageUrl)
															setFile(file)
														} else {
															setPreview(undefined)
															setFile(null)
														}
													}}
													type="file"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
					<DialogFooter className="flex w-full !justify-between">
						<Button
							className="flex items-center gap-2"
							disabled={isSubmitting || !preview}
							onClick={async () => {
								setFile(null)
								form.setValue('avatar', undefined)
								await onDelete()
							}}
							type="button"
							variant="destructive"
						>
							<Trash size={20} strokeWidth={1.5} />
							<p>アバターを削除</p>
						</Button>
						<Button className="flex items-center gap-2" disabled={isSubmitting || preview === avatar} form="avatar-form" type="submit">
							<Save size={20} strokeWidth={1.5} />
							<p>保存</p>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
