'use client'

import { useCallback, useEffect, useState } from 'react'

// Type
export type UseDisableInteraction = {
	disableInteraction: () => void
	enableInteraction: () => void
}

/**
 * カスタムフック: 画面操作を無効化
 */
export function useDisableInteraction(): UseDisableInteraction {
	const [isDisabled, setIsDisabled] = useState(false)

	// 画面操作を無効化
	const disableInteraction = useCallback(() => {
		setIsDisabled(true)
	}, [])

	const enableInteraction = useCallback(() => {
		setIsDisabled(false)
	}, [])

	/* === hooks === */
	useEffect(() => {
		if (!isDisabled) return

		// キーボード操作を無効化
		const preventKey = (event: KeyboardEvent): void => {
			event.preventDefault()
			event.stopPropagation()
		}

		// クリック・タッチ操作を無効化
		const preventClick = (event: MouseEvent | TouchEvent): void => {
			event.preventDefault()
			event.stopPropagation()
		}

		// 右クリックメニューを無効化
		const preventContextMenu = (event: MouseEvent): void => {
			event.preventDefault()
		}

		// スクロール無効化
		const preventScroll = (): void => {
			document.documentElement.style.overflow = 'hidden'
			document.documentElement.style.touchAction = 'none'
			document.documentElement.style.pointerEvents = 'none'
			document.documentElement.style.cursor = 'wait'
		}

		// スクロール許可
		const allowScroll = (): void => {
			document.documentElement.style.overflow = ''
			document.documentElement.style.touchAction = ''
			document.documentElement.style.pointerEvents = ''
			document.documentElement.style.cursor = ''
		}

		// イベントリスナー追加
		document.addEventListener('contextmenu', preventContextMenu, true)
		document.addEventListener('keydown', preventKey, true)
		document.addEventListener('keyup', preventKey, true)
		document.addEventListener('keypress', preventKey, true)
		document.addEventListener('click', preventClick, true)
		document.addEventListener('touchstart', preventClick, true)
		window.addEventListener('scroll', preventScroll, true)

		// スクロール無効化を適用
		preventScroll()

		// Radix UI の Dialog 内は操作可能にする
		const dialogs = document.querySelectorAll('[data-state="open"]')
		dialogs.forEach((dialog) => ((dialog as HTMLElement).style.pointerEvents = 'none'))

		// オーバーレイ要素の追加
		const overlay = document.createElement('div')
		overlay.id = 'disable-layer'
		overlay.style.position = 'fixed'
		overlay.style.inset = '0'
		overlay.style.width = '100%'
		overlay.style.height = '100%'
		overlay.style.zIndex = '9999'
		document.body.insertBefore(overlay, document.body.firstChild)

		// cleanup
		return (): void => {
			document.addEventListener('contextmenu', preventContextMenu, true)
			document.removeEventListener('keydown', preventKey, true)
			document.removeEventListener('keyup', preventKey, true)
			document.removeEventListener('keypress', preventKey, true)
			document.removeEventListener('click', preventClick, true)
			document.removeEventListener('touchstart', preventClick, true)
			window.removeEventListener('scroll', preventScroll, true)

			// スクロール許可を適用
			allowScroll()

			// Radix UI の Dialog の pointer-events を元に戻す
			dialogs.forEach((dialog) => ((dialog as HTMLElement).style.pointerEvents = 'auto'))

			// オーバーレイ要素の削除
			overlay.remove()
		}
	}, [isDisabled])

	/* === return === */
	return { disableInteraction, enableInteraction }
}
