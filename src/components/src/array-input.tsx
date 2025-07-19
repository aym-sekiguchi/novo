'use client'

import { Plus, X } from 'lucide-react'
import { useState } from 'react'

import { Button, Input } from '@/components'

import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export function ArrayInput<T extends FieldValues>(props: {
	disabled: boolean
	field: ControllerRenderProps<T, Path<T>>
	valueName: string
	values: string[] | undefined
}): React.ReactNode {
	const { disabled, field, valueName, values = [] } = props

	/* === hooks === */
	const [value, setValue] = useState<string>('')

	/* === return === */
	return (
		<div>
			<div className="flex items-center gap-2">
				<Input disabled={disabled} onChange={(event) => setValue(event.target.value)} placeholder={valueName} value={value} />
				<Button
					className="mb-1 shrink-0"
					onClick={() => {
						if (!value) return
						field.onChange(Array.from(new Set([...field.value, value])))
						setValue('')
					}}
					size="icon"
					type="button"
					variant="outline"
				>
					<Plus aria-label={`${valueName}を追加`} />
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{values.map((value, index) => (
					<div className="bg-surface border-line flex shrink-0 items-center gap-2 rounded-full border pr-1 pl-2" key={`tag-${index}`}>
						<p>{value}</p>
						<Button
							className="bg-neutral hover:bg-neutral hover:border-line size-auto rounded-full border border-transparent p-0.5"
							onClick={() => field.onChange((field.value as string[]).filter((_, i) => i !== index))}
							type="button"
						>
							<X className="text-primary" size={12} strokeWidth={2} />
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
