'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormMessage, Separator } from '@/components'
import { deleteFile } from '@/firebase/client'
import { useDisableInteraction, useFormAction } from '@/hooks'
import { base64 } from '@/utilities'

import { memoAction } from './memo-action'
import { memoSchema } from './memo-schema'

import type { MemoSchemaType } from './memo-schema'
import type { OutputBlockData, OutputData } from '@editorjs/editorjs'

const Editor = dynamic(() => import('@/components/src/editor'), { ssr: false })

export function MemoForm(props: { initialValue: string; username: string }): React.ReactNode {
	const { initialValue, username } = props

	/* ===  hooks === */

	const router = useRouter()

	const { disableInteraction, enableInteraction } = useDisableInteraction()

	const { formAction } = useFormAction<{ id: string; values: MemoSchemaType }>({
		onAction: async ({ values }) => {
			try {
				// 画像のリストを取得する関数
				function extractImageUrls(data: OutputData): string[] {
					return data.blocks.filter((block: OutputBlockData) => block.type === 'image').map((block: OutputBlockData) => block.data.file.url)
				}

				// 前回と今回の画像のリストを取得
				if (initialValue) {
					const currentData = JSON.parse(base64.decode(values.memo)) as OutputData
					const currentDataImages = extractImageUrls(currentData)
					const previousData = JSON.parse(base64.decode(initialValue)) as OutputData
					console.log(previousData)
					const previousDataImages = extractImageUrls(previousData)
					console.log(previousDataImages)

					// 画像リストを比較し、削除された画像をstorageから削除
					await Promise.all(
						previousDataImages.map(async (url: string) => {
							if (!currentDataImages.includes(url)) {
								await deleteFile({ url })
							}
						}),
					)
				}
				return await memoAction({ id: username, values })

				// エラー処理
			} catch (error) {
				console.error('メモの保存に失敗しました。', error)

				/* === return === */
				return { message: String(error), status: 500 }
			}
		},
		onSuccess: () => {
			router.refresh()
		},
	})

	// フォームフック
	const form = useForm<MemoSchemaType>({ defaultValues: { memo: initialValue }, resolver: zodResolver(memoSchema) })
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: MemoSchemaType): Promise<void> {
		// 絶対操作無効化
		disableInteraction()

		// console.log(currentDataImages)

		await formAction({ id: username, values })

		// 絶対操作無効化解除
		enableInteraction()
	}

	/* ===  return === */
	return (
		<>
			{/* TODO 保存ボタン下部に */}
			<Form {...form}>
				<form className="flex w-full flex-col items-end gap-4" id="memo-form" onSubmit={form.handleSubmit(onSubmit)}>
					{/* メモ */}
					<FormField
						control={form.control}
						name="memo"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Editor disable={isSubmitting} initialData={initialValue} onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className="bg-background sticky inset-x-0 bottom-0 z-20 flex flex-col justify-center pt-3">
				<Separator />
				<div className="flex w-full justify-center gap-8 pt-3">
					<Button className="flex items-center gap-2" disabled={isSubmitting} form="memo-form" type="submit">
						<Save size={20} strokeWidth={1.5} />
						<span>保存</span>
					</Button>
				</div>
			</div>
		</>
	)
}
