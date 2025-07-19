'use no memo' //TODO RHFがまだmemo対応していないため
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Input,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	PasswordInput,
} from '@/components'

import { loginAction } from './login-action'
import { loginSchema } from './login-schema'

import type { LoginSchemaType } from './login-schema'

export function LoginForm(): React.ReactNode {
	/* === hooks === */
	const router = useRouter()

	// フォームフック
	const form = useForm<LoginSchemaType>({
		defaultValues: {
			password: '',
			username: '',
		},
		mode: 'onSubmit',
		resolver: zodResolver(loginSchema),
	})
	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: LoginSchemaType): Promise<void> {
		const toastId = toast('Sonner')

		toast.loading('認証中・・・', { description: 'ブラウザを閉じずに、しばらくお待ちください。', id: toastId })

		// 認証
		const result = await loginAction(values)

		if (result.status === 200) {
			toast.success('ログイン成功！', { description: undefined, id: toastId })
			router.push('/')
		} else {
			toast.error('ログインに失敗しました。', { description: result.message, id: toastId })
		}
	}

	return (
		<Card className="mx-auto w-full md:w-fit">
			<CardHeader className="py-6 md:p-8">
				<CardTitle className="text-2xl leading-normal md:text-5xl">
					{/* TODO ロゴに変更？ */}
					<p>Novoへようこそ</p>
					<p>まずはログインしましょう</p>
				</CardTitle>
				<CardDescription>ユーザー名とパスワードを入力してください。</CardDescription>
			</CardHeader>
			<CardContent className="pb-6 md:p-8">
				<Form {...form}>
					<form className="flex w-full flex-col items-center gap-4" id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>ユーザー名</FormLabel>
									<FormControl>
										<div>
											<Input {...field} disabled={isSubmitting} placeholder="Novo" />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>パスワード</FormLabel>
									<FormControl>
										<PasswordInput disabled={isSubmitting} field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-between pb-6 md:p-8">
				<Button className="w-full" disabled={isSubmitting} form="login-form" type="submit">
					ログイン
				</Button>
			</CardFooter>
		</Card>
	)
}
