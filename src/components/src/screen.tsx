'use client'

import { ChevronsDownUp, ChevronsUpDown, EllipsisVertical, ImageIcon, MonitorCog, Moon, PanelLeftClose, PanelLeftOpen, Sun, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { createContext, Fragment, use, useContext, useState } from 'react'

import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	Collapsible,
	CollapsibleContent,
	Separator,
	ScrollArea,
	CollapsibleTrigger,
	Tooltip,
	Breadcrumb as BreadcrumbWrapper,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbLink,
	BreadcrumbSeparator,
	Footer,
	Board,
	LogoutButton,
	Badge,
} from '@/components'
import { AvatarForm, AvatarFormContext } from '@/features'
import { useToggle } from '@/hooks'
import { propertyContents } from '@/libraries'
import { cn } from '@/utilities'

import type { Session } from 'next-auth'

type Breadcrumb = { href: string; label: string }[]

type ScreenProps = {
	avatar: string
	breadcrumb: Breadcrumb
	children?: React.ReactNode
	isPublic: boolean
	projectName: string
	role: Session['user']['role']
	username: string
}

/* === type === */
type ProjectContextProps = { avatar: string; isPublic: boolean; name: string; role: Session['user']['role']; username: string }

/* === context === */
const ProjectContext = createContext<ProjectContextProps>({ avatar: '', isPublic: false, name: '', role: 'admin', username: '' })

const useProject = (): ProjectContextProps => useContext(ProjectContext)

export function Screen(props: ScreenProps): React.ReactNode {
	const { avatar, breadcrumb, children, isPublic, projectName, role, username } = props

	/* === hooks === */
	const [open, toggle] = useToggle(false)
	const [id, setId] = useState('')
	const [openAvatar, toggleAvatar] = useToggle(false)

	/* === return === */
	return (
		<ProjectContext value={{ avatar, isPublic, name: projectName, role, username }}>
			<AvatarFormContext value={{ avatar, id, open: openAvatar, setId, toggle: toggleAvatar }}>
				<AvatarForm id={id} />
				<div className="flex flex-1 flex-col gap-3 md:gap-6">
					{/* header */}
					<header className="flex items-center gap-3 px-3 pt-3 max-md:h-9 md:justify-center md:px-6 md:pt-6">
						{/* mobile用のメニューボタン */}
						<Button className="size-fit bg-transparent md:hidden" onClick={toggle} size="icon" variant="ghost">
							<PanelLeftOpen size={20} strokeWidth={1.5} />
						</Button>

						<Separator className="md:hidden" orientation="vertical" />

						{/* 物件名 */}
						<h1 className="flex md:justify-center">
							<Link className="" href={`/${username}`}>
								{projectName}
							</Link>
						</h1>
					</header>

					{/* mobile menu */}
					<MobileMenu onOpenChange={toggle} open={open} />

					{/* main */}
					<Contents breadcrumb={breadcrumb}>{children}</Contents>

					{/* footer */}
					<Footer />
				</div>
			</AvatarFormContext>
		</ProjectContext>
	)
}

function Contents(props: { breadcrumb: Breadcrumb; children: React.ReactNode }): React.ReactNode {
	/* === props === */
	const { breadcrumb, children } = props

	/* === hooks === */
	const [open, toggle] = useToggle(true)

	/* === return === */
	return (
		<div className={cn('grid flex-1 gap-6 px-3 duration-500 md:px-6', open ? 'md:grid-cols-[17rem_auto]' : 'md:grid-cols-[3.625rem_auto]')}>
			{/* sidebar */}
			<Board className="relative flex flex-col overflow-hidden max-md:hidden">
				<Tooltip content={`${open ? '閉じる' : '開く'}`} side="top">
					<Button className={cn('absolute top-0 right-0 size-10', !open && '-translate-x-2')} onClick={toggle} size="icon" variant="ghost">
						{open ? <PanelLeftClose size={20} strokeWidth={1.5} /> : <PanelLeftOpen size={20} strokeWidth={1.5} />}
					</Button>
				</Tooltip>

				<div className={cn('grid size-full grid-rows-[2.5rem_1fr_3.625rem] transition duration-250', !open && 'pointer-events-none opacity-0')}>
					<Menu />
					<UserProfileButton />
				</div>

				<MobileUserProfileButton open={open} />
			</Board>

			{/* main */}
			<main>
				<Board className="relative h-full">
					<div className="absolute inset-1 flex flex-auto flex-col py-3 md:px-3">
						<ScrollArea className="@container flex-1">
							{/* paddingに中のコンテンツがoverflowするように */}
							<div className="flex h-full flex-col gap-3 px-3 md:gap-6">
								<div className="border-line bg-background sticky top-0 z-11 border-b px-3 py-2">
									<Breadcrumb items={breadcrumb} />
								</div>
								{children}
							</div>
						</ScrollArea>
					</div>
				</Board>
			</main>
		</div>
	)
}

function Breadcrumb(props: { items: Breadcrumb }): React.ReactNode {
	const { items } = props

	/* === return === */
	return (
		<BreadcrumbWrapper>
			<BreadcrumbList>
				{items.map((item, index) => (
					<Fragment key={`breadcrumb-${index}`}>
						<BreadcrumbItem>
							{item.href ? <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink> : <BreadcrumbPage>{item.label}</BreadcrumbPage>}
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</BreadcrumbWrapper>
	)
}

function Menu(props: { onOpenChange?: (open: boolean) => void }): React.ReactNode {
	const { onOpenChange } = props
	const { role, username } = useProject()

	/* === return === */
	return (
		<>
			<h2 className="flex h-10 items-center px-4 text-xl font-bold">Novo</h2>

			<div className="relative">
				<div className="absolute inset-1 px-1">
					<ScrollArea className="size-full">
						<nav>
							<ul className="flex flex-col gap-3">
								<li>
									<Collapsible className="group" defaultOpen>
										<CollapsibleTrigger asChild>
											<Button className="bg-background flex h-auto w-full items-center justify-between py-2 pr-1 pl-2" variant="ghost">
												<span>物件概要</span>
												<ChevronsDownUp className="group-has-data-[state=closed]:hidden" size={18} />
												<ChevronsUpDown className="group-has-data-[state=open]:hidden" size={18} />
											</Button>
										</CollapsibleTrigger>
										<CollapsibleContent className="flex gap-2 pl-4">
											<Separator className="w-0.5" orientation="vertical" />
											<div className="flex-1">
												{propertyContents.map(
													(content, index) =>
														(content.link !== 'setting' || role !== 'editor') && (
															<Fragment key={`outline-${index}`}>
																<Button asChild className="h-auto w-full p-2 whitespace-normal" variant="ghost">
																	<Link
																		className="w-full justify-start"
																		href={`/${username}/property/${content.link}`}
																		onClick={() => onOpenChange?.(false)}
																		target={content.target || '_self'}
																	>
																		{content.label}
																	</Link>
																</Button>
															</Fragment>
														),
												)}
											</div>
										</CollapsibleContent>
									</Collapsible>
								</li>
								<li>
									<Button asChild className="h-auto w-full p-2 whitespace-normal" variant="ghost">
										<Link className="w-full justify-start" href={`/${username}/memo`}>
											メモ
										</Link>
									</Button>
								</li>
							</ul>
						</nav>
					</ScrollArea>
				</div>
			</div>
		</>
	)
}

function MobileMenu(props: { onOpenChange: (open: boolean) => void; open: boolean }): React.ReactNode {
	const { onOpenChange, open } = props

	/* === return === */
	return (
		<>
			<Sheet onOpenChange={onOpenChange} open={open}>
				<SheetHeader className="sr-only">
					<SheetTitle>Novo</SheetTitle>
				</SheetHeader>
				<SheetContent className="w-fit p-0" isCloseable={false} side="left">
					<SheetClose asChild>
						<Button className="absolute top-1 right-1 size-8" onClick={() => onOpenChange(false)} size="icon" variant="ghost">
							<PanelLeftClose size={20} strokeWidth={1.5} />
						</Button>
					</SheetClose>
					<div
						className={cn(
							'grid h-full w-[17rem] max-w-[calc(100vw-8.75rem)] grid-rows-[2.5rem_1fr_3.625rem] transition duration-250',
							!open && 'pointer-events-none opacity-0',
						)}
					>
						<Menu onOpenChange={onOpenChange} />
						<UserProfileButton />
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}

function UserProfileButton(): React.ReactNode {
	/* === hooks === */
	const { avatar, isPublic, role, username } = useProject()

	/* === return === */
	return (
		<div className="relative">
			{role === 'admin' && (
				<Badge className="absolute -top-5 left-3" variant={isPublic ? 'success' : 'warning'}>
					{isPublic ? '公開中' : '非公開'}
				</Badge>
			)}
			<UserProfileMenu>
				<div className="p-1">
					<Button className="flex h-auto w-full items-center justify-between p-1" variant="ghost">
						<figure className="bg-neutral border-line flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border">
							{avatar ? (
								<Image alt="" className="size-full object-cover" height={40} src={avatar} width={40} />
							) : (
								<User className="text-neutral-foreground" fill="currentColor" size={32} strokeWidth={0} />
							)}
						</figure>
						<div className="flex flex-1 items-center pl-2">
							<div className="grow text-left">
								<p className="text-sm font-bold">{username}</p>
								<p className="text-neutral-foreground text-[0.625rem]">{role === 'admin' ? '管理者' : '編集者'}</p>
							</div>
							<EllipsisVertical />
						</div>
					</Button>
				</div>
			</UserProfileMenu>
		</div>
	)
}

function MobileUserProfileButton(props: { open: boolean }): React.ReactNode {
	/* === props === */
	const { open } = props

	/* === return === */
	return (
		<UserProfileMenu>
			<div className={cn('absolute bottom-2 left-2 w-fit transition duration-250', open && 'pointer-events-none opacity-0')}>
				<Button className="flex h-auto w-full items-center justify-between rounded-full p-0" variant="ghost">
					<figure className="bg-neutral border-line size-10 shrink-0 rounded-full border"></figure>
				</Button>
			</div>
		</UserProfileMenu>
	)
}

function UserProfileMenu(props: { children: React.ReactNode }): React.ReactNode {
	/* === props === */
	const { children } = props

	/* === hooks === */
	const { username } = useProject()
	const { setTheme, theme } = useTheme()
	const { setId, toggle } = use(AvatarFormContext)
	// DropdownMenuの開閉状態を管理
	const [dropdownOpen, setDropdownOpen] = useState(false)

	/* === return === */
	return (
		<>
			<DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-fit" side="right">
					<DropdownMenuGroup>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="w-full">テーマを選択</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
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
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem>
							<LogoutButton />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Button
								className="bg-unset flex h-auto items-center gap-2 border-none !p-0 text-sm"
								onClick={() => {
									// まずドロップダウンを閉じる
									setDropdownOpen(false)
									// 少し遅延してからダイアログを開く
									setTimeout(() => {
										toggle()
										setId(username)
									}, 100)
								}}
								variant="secondary"
							>
								<ImageIcon />
								<p>アバター変更</p>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
