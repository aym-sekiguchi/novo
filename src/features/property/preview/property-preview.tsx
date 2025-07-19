'use client'

import { useState, createContext, useEffect } from 'react'

import { ColorPicker } from '@/components'
import { DeviceSelector } from '@/features/preview/device-selector'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utilities'

import type { Dispatch } from 'react'

/**
 *  PropertyPreview
 *
 * @param {React.ReactNode} props.children - Reactコンポーネント
 */

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

export const DeviceContext = createContext<{ device: DeviceType; setDevice: Dispatch<DeviceType> }>({ device: 'desktop', setDevice: () => {} })

export function PropertyPreview(props: { children: React.ReactNode }): React.ReactNode {
	/* === props === */
	const { children } = props

	/* === hooks === */
	const isMobile = useIsMobile({ width: 640 })
	const isTablet = useIsMobile({ width: 1024 })

	const [backgroundColor, setBackgroundColor] = useState('#fff')

	const [device, setDevice] = useState<DeviceType>('desktop')

	useEffect(() => {
		if (isTablet) {
			setDevice('tablet')
		}
	}, [isTablet])
	useEffect(() => {
		if (isMobile) {
			setDevice('mobile')
		}
	}, [isMobile])

	/* === return === */
	return (
		<DeviceContext.Provider value={{ device: device, setDevice: setDevice }}>
			<div className="flex-1 bg-white" style={{ backgroundColor }}>
				<div className={cn('container flex max-w-4xl flex-1 flex-col gap-6 py-10')}>
					{/* ツールバー */}
					<div className="flex justify-between gap-x-8 gap-y-4 rounded-sm border border-gray-300 bg-gray-100 p-2 max-sm:flex-col sm:items-end">
						{/* 背景色 */}
						<div className="text-black">
							<p className="text-sm">背景色</p>
							<ColorPicker
								className="[&_button>div]:border-gray-300 [&_input]:border-gray-300 [&_input]:bg-white"
								onChange={setBackgroundColor}
								value={backgroundColor}
							/>
						</div>
						{/* デバイス */}
						<DeviceSelector />
					</div>

					{/* プレビュー */}
					<div
						className={cn(
							'mx-auto flex w-full flex-1 flex-col gap-6',
							device === 'tablet' && !isTablet && 'max-w-2xl',
							device === 'mobile' && !isMobile && 'max-w-96',
						)}
					>
						{children}
					</div>
				</div>
			</div>
		</DeviceContext.Provider>
	)
}
