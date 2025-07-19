'use client'

import { Blocks } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components'

/**
 * 物件概要新規作成ボタン
 *
 */

export function CreatePropertyBlockButton(): React.ReactNode {
	/* === return === */
	return (
		<>
			{/* 新規作成ボタン */}
			<Button asChild className="flex items-center gap-2">
				<Link className="flex" href="./blocks/create">
					<Blocks size={20} strokeWidth={1.5} />
					<span>ブロック新規作成</span>
				</Link>
			</Button>
		</>
	)
}
