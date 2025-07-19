'use client'

import { MonitorCog, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Button,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	Tooltip,
} from '@/components/'

/**
 * Theme
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */

export function ThemeSelector(): React.ReactNode {
	const [mounted, setMounted] = useState(false)
	const { setTheme, theme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div style={{ height: '40px', width: '100px' }}></div>
	}

	return (
		<DropdownMenu>
			<Tooltip content="テーマ設定">
				<DropdownMenuTrigger asChild>
					<Button className="p-1" size={'icon'} variant="secondary">
						{theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <MonitorCog size={18} />}
					</Button>
				</DropdownMenuTrigger>
			</Tooltip>
			<DropdownMenuContent align="end" className="">
				<DropdownMenuLabel>テーマ</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup onValueChange={(value) => setTheme(value)} value={theme}>
					<DropdownMenuRadioItem className="flex items-center gap-1" value="dark">
						<Moon size={16} />
						<span>ダーク</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="flex items-center gap-1" value="light">
						<Sun size={16} />
						<span>ライト</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="flex items-center gap-1" value="system">
						<MonitorCog size={16} />
						<span>システム</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
