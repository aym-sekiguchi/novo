'use client'
import { CircleCheckBigIcon, InfoIcon, LoaderCircle, OctagonX, TriangleAlertIcon } from 'lucide-react'
import { Toaster } from 'sonner'

import { cn } from '@/utilities'

// Type
export type ToasterProps = React.ComponentProps<typeof Toaster>

/**
 * Toaster
 *
 * @param props - 'Toaster'その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Toast(props: ToasterProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return (
		<Toaster
			icons={{
				error: <OctagonX className="size-5" strokeWidth={2} />,
				info: <InfoIcon className="size-5" strokeWidth={2} />,
				loading: <LoaderCircle className="size-5 animate-spin" />,
				success: <CircleCheckBigIcon className="size-5" strokeWidth={2} />,
				warning: <TriangleAlertIcon className="size-5" strokeWidth={2} />,
			}}
			toastOptions={{
				classNames: {
					// actionButton: '',
					// cancelButton: '',
					// closeButton: '',
					content: cn('select-none'),
					default: cn('border-line'),
					description: cn('!text-neutral-foreground'),
					error: cn('text-destructive border-destructive'),
					icon: cn('relative mr-4 !size-5 shrink-0'),
					info: cn('text-link border-link'),
					// loader: '',
					// loading: '',
					success: cn('text-success border-success'),
					title: cn('brightness-75'),
					toast: cn('bg-popover flex w-full items-start rounded-xl border p-4 text-sm shadow-md'),
					warning: cn('text-warning border-warning'),
				},
				unstyled: true,
			}}
			{...rest}
		/>
	)
}
