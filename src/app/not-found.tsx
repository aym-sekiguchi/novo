import { House } from 'lucide-react'
import Link from 'next/link'

import { LogoutButton } from '@/components'

export default function NotFound(): React.ReactElement {
	/* === return === */
	return (
		<div className="mx-auto flex w-fit flex-1 flex-col items-center justify-center gap-6">
			<h2>Not Found</h2>
			<Link className="border-line bg-background flex w-full items-center gap-2 rounded-xl border px-4 py-2" href="/">
				<House size={18} />
				<p>ホームへ</p>
			</Link>
			<div className="border-line bg-background flex w-full rounded-xl border px-4 py-2">
				<LogoutButton />
			</div>
		</div>
	)
}
