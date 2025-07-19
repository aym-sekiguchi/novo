import { toast } from 'sonner'

type UseFormActionOptions<T> = {
	onAction: (values: T) => Promise<{ message: string; status: number }>
	onError?: () => void
	onSuccess?: () => void
}

export function useFormAction<T>(options: UseFormActionOptions<T>): { formAction: (values: T) => Promise<void> } {
	/* === options === */
	const { onAction, onError, onSuccess } = options

	const formAction = async (values: T): Promise<void> => {
		const toastId = toast('Sonner')

		try {
			toast.loading('処理中・・・', { description: 'ブラウザを閉じずに、しばらくお待ちください。', id: toastId })

			const response = await onAction(values)

			if (response.status !== 200) throw new Error(response.message)

			toast.success('処理しました。', { description: response.message, id: toastId })

			onSuccess?.()
		} catch (error) {
			console.log('error in useFormAction', error)
			const message = error instanceof Error ? error.message : 'エラーが発生しました。'

			toast.error('処理に失敗しました。', { description: message, id: toastId })

			onError?.()
		}
	}

	/* === return === */
	return { formAction }
}
