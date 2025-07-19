'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { logoutAction } from '@/actions'

import { Button } from './button'
import { Tooltip } from './tooltip'

export function LogoutButton(props: { variant?: 'default' | 'icon' }): React.ReactNode {
	/* === props === */
	const { variant = 'default' } = props

	/* === hooks === */
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)

	/* === events === */
	const handleClickLogout = async (): Promise<void> => {
		setIsSubmitting(true)
		const toastId = toast('Sonner')

		toast.loading('ログアウトしています。', { description: 'ブラウザを閉じずに、しばらくお待ちください。', duration: Infinity, id: toastId })
		const result = await logoutAction()

		if (result.status === 200) {
			toast.success('ログアウトしました。', { duration: 5000, id: toastId })
			setIsSubmitting(false)
			router.push('/login')
		} else {
			toast.error('ログアウトに失敗しました。', { duration: 5000, id: toastId })
			setIsSubmitting(false)
		}
	}

	useEffect(() => {
		if (isSubmitting) {
			document.body.style.pointerEvents = 'none'
			document.body.style.cursor = 'not-allowed'
		} else {
			document.body.style.pointerEvents = 'auto'
			document.body.style.cursor = 'auto'
		}
	}, [isSubmitting])

	return variant === 'default' ? (
		<button className="flex items-center gap-2" onClick={handleClickLogout}>
			<LogOut size={18} />
			<span>ログアウト</span>
		</button>
	) : (
		<Tooltip content="ログアウト" side="bottom">
			<Button onClick={handleClickLogout} size="icon" variant="outline">
				<LogOut size={18} />
			</Button>
		</Tooltip>
	)
}
