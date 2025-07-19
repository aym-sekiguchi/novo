import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/utilities'

// Type
export type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>

/**
 * Switch コンポーネント
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Switch(props: SwitchProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<SwitchPrimitives.Root
			className={cn(
				'border-line inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border p-0 transition-colors',
				'data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral',
				'focus-visible:ring-primary/75 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...rest}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					'bg-surface pointer-events-none block size-5 rounded-full ring-0 shadow-md brightness-150 transition-transform',
					'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5',
				)}
			/>
		</SwitchPrimitives.Root>
	)
}
