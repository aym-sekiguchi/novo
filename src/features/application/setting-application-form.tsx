'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	ArrayInput,
	SwitchWithDescription,
	FormDescription,
} from '@/components'
import { useFormAction } from '@/hooks'

import { settingApplicationAction } from './setting-application-action'
import { settingApplicationSchema, type SettingApplicationSchemaType } from './setting-application-schema'

// type
type SettingApplicationFormProps = { id: string; initialValues: { domains: string[]; isDraft: boolean; isPublic: boolean } }

/**
 * 公開設定フォーム
 *
 */

export function SettingApplicationForm(props: SettingApplicationFormProps): React.ReactNode {
	/* ===  props === */
	const {
		id,
		initialValues: { domains, isDraft, isPublic },
	} = props

	/* ===  hooks === */
	const router = useRouter()

	const { formAction } = useFormAction<{ id: string; values: SettingApplicationSchemaType }>({
		onAction: settingApplicationAction,
		onSuccess: () => {
			router.refresh()
		},
	})

	// フォームフック
	const form = useForm<SettingApplicationSchemaType>({
		defaultValues: { domains, isDraft, isPublic },
		mode: 'onBlur',
		resolver: zodResolver(settingApplicationSchema),
	})
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: SettingApplicationSchemaType): Promise<void> {
		await formAction({ id, values })
	}

	/* ===  return === */
	return (
		<Form {...form}>
			<form className="flex w-full max-w-2xl flex-col gap-4 pt-3" id="setting-property-form" onSubmit={form.handleSubmit(onSubmit)}>
				{/* 稼働 / 停止 */}
				<FormField
					control={form.control}
					name="isPublic"
					render={({ field }) => (
						<FormItem className="flex w-full items-center gap-3">
							<FormControl>
								<SwitchWithDescription
									checked={field.value}
									description="物件概要の稼働状態を切り替える設定です。ONにすると、編集者がこの項目を編集できるようになり、サイトにも反映されます。OFFにすると、編集者は編集できず、サイトにも表示されません（管理者は編集可能です）。"
									disabled={isSubmitting}
									label="稼働状態"
									onCheckedChange={(checked) => field.onChange(checked)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* テスト環境利用 */}
				<FormField
					control={form.control}
					name="isDraft"
					render={({ field }) => (
						<FormItem className="flex w-full items-center gap-3">
							<FormControl>
								<SwitchWithDescription
									checked={field.value}
									description="サイトの表示内容をテスト用・本番用で切り替える設定です。ONにすると、URLの指定に応じてそれぞれのデータが表示されます。"
									disabled={isSubmitting}
									label="テスト環境利用"
									onCheckedChange={(checked) => field.onChange(checked)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* ドメイン */}
				<FormField
					control={form.control}
					name="domains"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>ドメイン</FormLabel>
							<FormDescription>
								プロトコルからドメイン名までを入力してください。
								<br />
								ディレクトリは入れないでください。
							</FormDescription>
							<FormControl>
								<ArrayInput disabled={isSubmitting} field={field} valueName="例) https://s-novo.com" values={form.getValues('domains')} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* 送信ボタン */}
				<div className="pt-4">
					<Button className="flex w-fit items-center gap-2" form="setting-property-form" type="submit">
						<Save size={20} strokeWidth={1.5} />
						<span>保存</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}
