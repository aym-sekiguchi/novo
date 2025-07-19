'use client'
'use no memo'

import { zodResolver } from '@hookform/resolvers/zod'
import { PencilRuler } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Form, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { useFormAction } from '@/hooks'

import { FormCaption } from './form-caption'
import { FormNotice } from './form-notice'
import { FormSeparator } from './form-separator'
import { FormTable } from './form-table'
import { propertyStyleAction } from './property-style-action'
import { propertyStyleSchema } from './property-style-schema'

import type { PropertyStyleSchemaType } from './property-style-schema'
import type { PropertyStyleData } from '@/types'
import type React from 'react'
import type { UseFormReturn } from 'react-hook-form'

// Type
type PropertyStyleFormProps = {
	id: string
	initialValue: PropertyStyleData
}

/**
 * 物件概要新規作成・編集フォーム
 */

export function PropertyStyleForm(props: PropertyStyleFormProps): React.ReactNode {
	/* === props === */
	const { id, initialValue } = props

	/* === hooks === */
	const router = useRouter()

	const { formAction } = useFormAction<{ id: string; values: PropertyStyleSchemaType }>({
		onAction: propertyStyleAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	// フォームフック
	const form: UseFormReturn<PropertyStyleSchemaType> = useForm<PropertyStyleSchemaType>({
		defaultValues: initialValue,
		resolver: zodResolver(propertyStyleSchema),
	})

	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: PropertyStyleSchemaType): Promise<void> {
		await formAction({ id, values })
	}

	// ページ離脱時確認
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
			event.preventDefault()
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return (): void => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])
	/* === return === */
	return (
		<>
			{/* タブ */}
			<Tabs className="" defaultValue="table">
				<div className="bg-background sticky top-[33px] z-20 w-full pb-2">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="table">表</TabsTrigger>
						<TabsTrigger value="caption">注釈</TabsTrigger>
						<TabsTrigger value="notice">予告</TabsTrigger>
						<TabsTrigger value="separator">区切り線</TabsTrigger>
					</TabsList>
				</div>

				{/* フォーム */}
				<Form {...form}>
					<form className="w-full" id="property-style-form" onSubmit={form.handleSubmit(onSubmit)}>
						<TabsContent className="flex w-full flex-col gap-4" value="table">
							<FormTable disabled={isSubmitting} form={form} />
						</TabsContent>
						<TabsContent className="flex w-full flex-col gap-4" value="caption">
							<FormCaption disabled={isSubmitting} form={form} />
						</TabsContent>
						<TabsContent className="flex w-full flex-col gap-4" value="notice">
							<FormNotice disabled={isSubmitting} form={form} />
						</TabsContent>
						<TabsContent className="flex w-full flex-col gap-4" value="separator">
							<FormSeparator disabled={isSubmitting} form={form} />
						</TabsContent>
					</form>
				</Form>
			</Tabs>

			{/* ボタン */}
			<div className="bg-background sticky inset-x-0 bottom-0 z-20 pt-3">
				<Separator />
				<div className="flex w-full justify-center gap-8 pt-3">
					<Button className="flex w-full max-w-64 items-center gap-2" disabled={isSubmitting} form="property-style-form" type="submit">
						<PencilRuler size="20" strokeWidth={1.5} />
						<span>保存</span>
					</Button>
				</div>
			</div>
		</>
	)
}
