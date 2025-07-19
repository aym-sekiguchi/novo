'use client'

import { useEffect, useState } from 'react'

/**
 *
 * @returns モバイルかどうかを判定
 */
export function useIsMobile(props: { width?: number }): boolean {
	const { width = 768 } = props
	const [isMobile, setIsMobile] = useState(false)
	// モバイルかどうかを判定
	useEffect(() => {
		setIsMobile(typeof window !== 'undefined' && window.innerWidth < width)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	/* === return === */
	return isMobile
}
