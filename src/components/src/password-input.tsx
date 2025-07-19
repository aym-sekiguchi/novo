'use client'

import { Eye, EyeOff } from 'lucide-react'

import { useToggle } from '@/hooks'

import { Input, Button } from '../'

import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export function PasswordInput<T extends FieldValues>(
	props: { disabled: boolean; field: ControllerRenderProps<T, Path<T>> } & React.ComponentProps<'input'>,
): React.ReactNode {
	const { field, ...rest } = props

	/* === hooks === */
	const [open, toggle] = useToggle(true)

	/* === return === */
	return (
		<div className="relative">
			<Input {...field} {...rest} type={open ? 'password' : 'text'} />
			<Button
				className="bg-unset hover:bg-unset absolute inset-y-0 right-2 my-auto size-auto p-0 hover:border-transparent"
				onClick={toggle}
				type="button"
				variant="ghost"
			>
				{open ? <Eye size={18} /> : <EyeOff size={18} />}
			</Button>
		</div>
	)
}
