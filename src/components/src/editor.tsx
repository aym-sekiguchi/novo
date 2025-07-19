'use client'

import EditorJS from '@editorjs/editorjs'
import { useEffect, useId, useRef } from 'react'

import { i18n, tools } from '@/configs/editorjs'
import { base64, cn } from '@/utilities'

// type
type EditorProps = {
	disable: boolean
	initialData?: string
	onChange: (value: string) => void
}

// default export でないとエラーになる(dynamic importのため)
export default function Editor(props: EditorProps): React.ReactNode {
	/* === props === */
	const { disable, initialData, onChange } = props

	/* === hooks === */
	const ref = useRef<EditorJS>(null)
	const id = useId()

	/* === events === */
	useEffect(() => {
		if (!ref.current) {
			ref.current = new EditorJS({
				data: initialData ? JSON.parse(base64.decode(initialData)) : {},
				holder: id,
				i18n: i18n,
				inlineToolbar: ['convertTo', 'link', 'bold', 'italic', 'underline', 'marker', 'inlineCode'],
				onChange: async (value): Promise<void> => {
					const outputData = await value.saver.save()
					onChange(base64.encode(JSON.stringify(outputData)))
				},
				tools: tools,
			})
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	/* === return === */
	return (
		<div
			className={cn(
				'prose dark:prose-invert bg-field border-line w-full max-w-none rounded-lg border px-3 py-2 min-[650px]:pl-20',
				disable && 'pointer-events-none cursor-not-allowed',
			)}
			id={id}
		/>
	)
}
