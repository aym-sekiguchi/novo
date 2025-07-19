'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'motion/react'

import { useToggle } from '@/hooks'

import type React from 'react'

// Type
export type TooltipProps = {
	children: React.ReactNode
	content: React.ReactNode
	side?: React.ComponentProps<typeof TooltipPrimitive.Content>['side']
} & TooltipPrimitive.TooltipProviderProps

/**
 * Tooltip
 *
 * @param props.children - children
 * @param props.content - content
 * @param props.side - side
 * @param props.rest - rest
 *
 * @returns {React.ReactNode} - React component
 *
 */
export function Tooltip(props: TooltipProps): React.ReactNode {
	const { children, content, side = 'top', ...rest } = props
	const [open, toggle] = useToggle(false)

	/* === return === */
	return (
		<TooltipPrimitive.Provider delayDuration={200} {...rest}>
			<TooltipPrimitive.Root onOpenChange={toggle} open={open}>
				{/* trigger */}
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

				{/* content */}
				<TooltipPrimitive.Portal forceMount>
					<AnimatePresence>
						{open && (
							<TooltipPrimitive.Content className="z-50" side={side} sideOffset={4}>
								<motion.div
									animate={{ opacity: 1, scale: 1, y: 0 }}
									className="data-[bottom]:origin-top data-[left]:origin-right data-[right]:origin-left data-[side=top]:origin-bottom"
									exit={{ opacity: 0, scale: 0.9, y: -4 }}
									initial={{ opacity: 0, scale: 0.9, y: -4 }}
									transition={{ duration: 0.18, ease: 'easeInOut' }}
								>
									<div className="bg-popover text-popover-foreground border-line rounded-lg border px-3 py-1.5 text-sm">{content}</div>
								</motion.div>
							</TooltipPrimitive.Content>
						)}
					</AnimatePresence>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}
