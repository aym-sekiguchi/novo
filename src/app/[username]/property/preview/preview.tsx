'use client'

import { useContext, useEffect } from 'react'

import { DeviceContext, renderCaption, renderCustom, renderNotice, renderSeparator, renderTable } from '@/features'
import { PreviewPropertyStyle } from '@/libraries'

import type { PropertyData, PropertyStyleData } from '@/types'

// TODO app内にあっていいのか
// TODO tailwindが効いちゃう（特にcustom）
// TODO APIのrender・styleと共通化しないのか

export function Preview(props: { property: PropertyData; style: PropertyStyleData }): React.ReactNode {
	/* === props === */
	const { property, style } = props

	const { caption, notice, separator, table } = style

	/* === hooks === */
	const { device } = useContext(DeviceContext)

	/* === useEffect === */
	useEffect(() => {
		const preview = document.getElementById('novo')
		if (!preview) return

		while (preview.firstChild) {
			preview.removeChild(preview.firstChild)
		}

		// style
		const styleElement = PreviewPropertyStyle({ device, styleData: style })

		// スタイルを親要素に挿入
		preview.appendChild(styleElement)

		// 各ブロックを作成
		property.blocks
			.filter((block) => block.isPublic)
			.forEach((block) => {
				const { contents, type } = block
				// caption
				if (type === 'caption') {
					renderCaption({ contents, parent: preview })
				}

				// separator
				if (type === 'separator') {
					renderSeparator({ parent: preview })
				}

				// notice
				if (type === 'notice') {
					renderNotice({ contents, parent: preview })
				}

				// table
				if (type === 'table' && block.data) {
					renderTable({ contents: block.data, parent: preview })
				}

				if (type === 'custom') {
					renderCustom({ contents, parent: preview })
				}
			})
	}, [device, property.blocks, caption, notice, separator, table, style])

	return (
		<>
			<div id="novo"></div>
		</>
	)
}
