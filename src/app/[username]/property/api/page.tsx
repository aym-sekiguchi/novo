import { notFound } from 'next/navigation'

import { getProject, getProperty, getSession } from '@/actions'
import { Code, Screen } from '@/components'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: 'API' }
}

/**
 * 物件概要 API
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	const { username } = await props.params
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())
	const { role } = await getSession()
	const { accessToken, isDraft } = await getProperty(username).catch(() => notFound())

	// コード
	const url = `https://novo.s-labo.tech/${username}/property`
	function code(props: { isDraft?: boolean }): string {
		const { isDraft = false } = props

		return `<script>
fetch("${url}${isDraft ? `?draft` : ''}", {
	headers: {
		"Content-Type": "text/html; charset=utf-8",
		Authorization: "Bearer ${accessToken}",
	},
})
	.then((response) => response.text())
	.then((response) => {
		const novo = document.querySelector("#novo");
		if (novo) novo.innerHTML = response;
	});
</script>
<div id="novo"></div>`
	}

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: '../', label: 'Home' },
					{ href: './', label: '物件概要' },
					{ href: '', label: 'API' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="w-full max-w-5xl space-y-6">
					{isDraft ? (
						<>
							<section className="space-y-2">
								<h3 className="border-line border-b text-xl font-bold">テストサイト</h3>
								<Code>{code({ isDraft })}</Code>
							</section>
							<section className="space-y-2">
								<h3 className="border-line border-b text-xl font-bold">本番サイト</h3>
								<Code>{code({})}</Code>
							</section>
						</>
					) : (
						<section className="space-y-2">
							<Code>{code({})}</Code>
						</section>
					)}
				</div>
			</Screen>
		</>
	)
}
