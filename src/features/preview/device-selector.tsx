import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { useContext } from 'react'

import { Button } from '@/components'
import { cn } from '@/utilities'

import { DeviceContext, type DeviceType } from '../property/preview/property-preview'

export function DeviceSelector(): React.ReactNode {
	/* === props === */
	const { device, setDevice } = useContext(DeviceContext)

	const items: { icon: React.ReactNode; label: string; value: DeviceType }[] = [
		{ icon: <Monitor size={16} />, label: 'デスクトップ', value: 'desktop' },
		{ icon: <Tablet size={16} />, label: 'タブレット', value: 'tablet' },
		{ icon: <Smartphone size={16} />, label: 'スマートフォン', value: 'mobile' },
	]

	/* === return === */
	return (
		<div className="flex h-fit gap-1 rounded-md border border-gray-300 bg-white p-1 max-sm:hidden md:justify-between">
			{items.map((item, index) => (
				<Button
					className={cn(
						'flex size-fit items-center gap-1 rounded-sm bg-transparent px-2 py-1 hover:bg-gray-100',
						device === item.value && 'bg-gray-100',
						item.value === 'desktop' && 'max-lg:hidden',
					)}
					key={`device-selector-${index}`}
					onClick={() => setDevice(item.value)}
				>
					{item.icon}
					<p className="text-xs">{item.label}</p>
				</Button>
			))}
		</div>
	)
}
