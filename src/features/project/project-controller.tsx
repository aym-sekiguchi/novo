'use client'

import { CalendarArrowDown, CalendarArrowUp, Check, ChevronsUpDown, Search, Tags, X } from 'lucide-react'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea,
	ScrollBar,
	Tabs,
	TabsList,
	TabsTrigger,
} from '@/components'
import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

import { useProject } from './project-provider'

/**
 * ProjectHeader
 *
 *  - フィルター / ソート / 検索
 *
 * @returns
 */
// コントローラー
export function ProjectController(): React.ReactNode {
	/* === hooks === */
	const [open, toggle] = useToggle(false)
	const { allTags, listState, onListState } = useProject()

	/* === return === */
	return (
		<div className="flex flex-col gap-1.5 md:gap-3">
			<div className="flex flex-wrap items-center gap-3 max-md:justify-between md:gap-6">
				{/* 昇順/降順 */}
				<Button
					onClick={() =>
						onListState((prod) => ({
							...prod,
							sort: prod.sort === 'asc' ? 'desc' : 'asc',
						}))
					}
					size="icon"
					variant="secondary"
				>
					{listState.sort === 'asc' ? <CalendarArrowDown strokeWidth={1.5} /> : <CalendarArrowUp strokeWidth={1.5} />}
				</Button>
				{/* 公開/非公開 */}
				<Tabs
					className="w-[240px]"
					defaultValue="public"
					onValueChange={(value) =>
						onListState((prod) => ({
							...prod,
							access: value as 'public' | 'private',
						}))
					}
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="public">公開</TabsTrigger>
						<TabsTrigger value="private">非公開</TabsTrigger>
					</TabsList>
				</Tabs>
				{/* 部分一致検索 */}
				<div className="relative min-w-3xs flex-1">
					<Search className="absolute inset-y-0 right-4 m-auto opacity-50" size={20} />
					<Input
						className="mb-0 pr-9"
						onChange={(e) => onListState((prod) => ({ ...prod, word: e.target.value }))}
						placeholder="検索ワードを入力"
						value={listState.word}
					/>
				</div>
			</div>
			{/* タグフィルター */}
			<Popover onOpenChange={toggle} open={open}>
				<PopoverTrigger asChild>
					<Button aria-expanded={open} className="h-auto py-0" role="combobox" variant="outline">
						<ScrollArea className="w-[calc(100%-1.5rem)] py-3 text-left">
							<div className="flex items-center gap-2">
								<Tags size={20} strokeWidth={1.5} />
								{listState.tags.length !== 0
									? listState.tags.map((tag, index) => (
											<p
												className="border-line bg-neutral flex items-center gap-2 rounded-full border py-1 pr-1 pl-2 text-xs"
												key={`selected-tag-${index}`}
											>
												<span>{tag}</span>
												<Button
													className="bg-surface text-foreground border-line size-auto rounded-full border bg-none p-1"
													onClick={() => onListState((prod) => ({ ...prod, tags: prod.tags.filter((_, prodTagIndex) => index !== prodTagIndex) }))}
												>
													<X size={10} />
												</Button>
											</p>
										))
									: 'タグを選択'}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="タグを選択" />
						<CommandList>
							<CommandEmpty>タグが見つかりません。</CommandEmpty>
							<CommandGroup>
								{allTags.map((tag, index) => (
									<CommandItem
										key={`tag-${index}`}
										onSelect={(currentValue) => {
											onListState((prod) => ({
												...prod,
												tags: prod.tags.includes(currentValue) ? prod.tags.filter((item) => item !== currentValue) : [...prod.tags, currentValue],
											}))
										}}
										value={tag}
									>
										<Check className={cn('mr-2 h-4 w-4', listState.tags.includes(tag) ? 'opacity-100' : 'opacity-0')} />
										{tag}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
