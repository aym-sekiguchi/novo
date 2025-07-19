'use client'

import { ArrowDownToLine, ArrowUpFromLine, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button, Tooltip } from '@/components'
import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

export function Code(props: { children: React.ReactNode; isReduction?: boolean }): React.ReactNode {
	const { children, isReduction = false } = props

	/* === hooks === */
	const [open, toggle] = useToggle(!isReduction)
	const ref = useRef<HTMLPreElement>(null)
	const [isOverflowing, setIsOverflowing] = useState(false)

	useEffect(() => {
		if (!ref.current) return
		if (ref.current.clientHeight > 112) {
			setIsOverflowing(true)
		}
	}, [])

	/* === event === */
	const handleClickCopy = (): void => {
		if (!navigator.clipboard) {
			alert('このブラウザは対応していません。コピーする範囲を選択してコピーしてください。')
			return
		}
		toast.promise(
			() => {
				if (!ref.current) return Promise.resolve()
				return navigator.clipboard.writeText(ref.current.innerText)
			},
			{
				error: 'Error',
				loading: 'Loading...',
				success: 'コピーしました',
			},
		)
	}
	/* === return === */
	return (
		<div className="relative">
			<div className="bg-neutral pointer-events-none absolute inset-0 z-10 h-28 overflow-hidden rounded-xl px-4 py-2">
				<pre className="font-mono whitespace-pre-wrap" ref={ref} style={{ overflowWrap: 'anywhere', tabSize: 2 }}>
					{children}
				</pre>
				{isOverflowing && (
					<div
						className={cn('from-neutral absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t to-transparent transition', open && 'opacity-0')}
					/>
				)}
			</div>
			<div
				className={cn(
					'group relative z-20 grid transition-[grid-template-rows]',
					isOverflowing ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
					isOverflowing && 'mb-20',
					open && 'grid-rows-[1fr]',
				)}
			>
				<Tooltip content="コードをコピー">
					<Button
						className="absolute top-2 right-2 z-50 size-8 p-0 opacity-0 transition group-hover:opacity-100"
						onClick={handleClickCopy}
						variant="outline"
					>
						<Copy size={20} strokeWidth={1.5} />
					</Button>
				</Tooltip>
				<div className="bg-neutral relative overflow-hidden rounded-xl">
					<pre className="px-4 py-2 font-mono whitespace-pre-wrap" ref={ref} style={{ overflowWrap: 'anywhere', tabSize: 2 }}>
						{children}
					</pre>
				</div>
				{isOverflowing && isReduction && (
					<Button className="relative z-20 mx-auto mt-4 flex h-fit w-fit items-center gap-2 text-sm" onClick={toggle}>
						<span>{open ? '縮小する' : '全て表示'}</span>
						{open ? <ArrowUpFromLine size={16} /> : <ArrowDownToLine size={16} />}
					</Button>
				)}
			</div>
		</div>
	)
}
