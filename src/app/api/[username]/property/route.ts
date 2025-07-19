import { headers } from 'next/headers'

import { getProperty } from '@/actions'
import rowTemplate from '@/assets/property.html'
import { fillTemplate } from '@/utilities/'

import type { PropertyBlockData, PropertyBlockTableData, PropertyStyleData } from '@/types'

// Type
type PageProps = { params: Promise<{ username: string }> }

export async function GET(request: Request, props: Readonly<PageProps>): Promise<Response> {
	/* === props === */
	const { username } = await props.params

	// propertyデータを取得
	const property = await getProperty(username).catch(() => null)

	if (!property) {
		return new Response('Not Found', { status: 404 })
	}

	const { accessToken, blocks, domains, fixedData, isDraft, style } = property

	// propertyデータが取得できなかった場合404
	if (!property) return new Response('Not Found', { status: 404 })

	// headersを取得
	const headersList = await headers()

	// bearer認証
	const token = headersList.get('Authorization')?.replace('Bearer ', '')

	// tokenがないまたはtokenが不正な場合は401
	if (!token || token !== accessToken) {
		return new Response('Unauthorized', { status: 401 })
	}

	// headersからoriginを取得
	const origin = headersList.get('Origin')

	const responseHeaders: HeadersInit = {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Origin': origin && domains.includes(origin) ? origin : 'null',
		'Content-Type': 'text/html; charset=utf-8',
	}

	// リクエストURLからenvパラメータを取得
	const url = new URL(request.url)

	const flag = url.searchParams.has('draft')

	// URLにあったデータを取得
	const data = isDraft ? (flag ? blocks : JSON.parse(fixedData || '[]')) : blocks

	// htmlを取得
	const html = getHtml({ data, style })

	// htmlを置換
	const contents = fillTemplate(rowTemplate, {
		'caption.color': property.style.caption.color,
		'caption.fontSize': property.style.caption.fontSize,
		'contents.html': html,
		'notice.color': property.style.notice.color,
		'notice.fontSize': property.style.notice.fontSize,
		'separator.color': property.style.separator.color,
		'separator.weight': property.style.separator.weight,
		'table.color': property.style.table.color,
		'table.fontSize': property.style.table.fontSize,
	})

	/* === return === */
	return new Response(contents, {
		headers: responseHeaders,
		status: 200,
	})
}

export async function OPTIONS(_: Request, props: Readonly<PageProps>): Promise<Response> {
	/* === props === */
	const { username } = await props.params

	// propertyデータを取得
	const property = await getProperty(username).catch(() => null)

	if (!property) {
		return new Response('Not Found', { status: 404 })
	}

	const { domains } = property

	// propertyデータが取得できなかった場合404
	if (!property) return new Response('Not Found', { status: 404 })

	// headersからoriginを取得
	const headersList = await headers()
	const origin = headersList.get('Origin')

	// レスポンスのheadersを設定
	const responseHeaders: HeadersInit = {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Methods': 'OPTIONS',
		'Access-Control-Allow-Origin': origin && domains.includes(origin) ? origin : 'null',
	}

	return new Response(null, {
		headers: responseHeaders,
	})
}

/**
 * HTMLを生成する
 *
 * @param props.data - プロパティデータ
 * @param props.style - スタイルデータ
 *
 */
function getHtml(props: { data: PropertyBlockData[]; style: PropertyStyleData }): string {
	/* === props === */
	const { data, style } = props

	const items = data
		.filter((block) => block.isPublic)
		.map((block) => {
			const { contents, data, type } = block

			// 区切り線
			if (type === 'separator') return renderSeparator()

			// 注釈
			if (type === 'caption') return renderCaption({ contents })

			// カスタム
			if (type === 'custom') return renderCustom({ contents })

			// 予告
			if (type === 'notice') return renderNotice({ contents, style: style.notice })

			// 表
			if (type === 'table') return renderTable({ data, style: style.table })

			return ''
		})

	/* === return === */
	return items.join('\n')
}

function renderSeparator(): string {
	/* === return === */
	return `<hr class="novo-separator" />`
}

function renderCaption(props: { contents?: string }): string {
	/* === props === */
	const { contents } = props

	/* === return === */
	return `<p class="novo-caption">${contents}</p>`
}

function renderCustom(props: { contents?: string }): string {
	/* === props === */
	const { contents } = props

	/* === return === */
	return `<div>${contents}</div>`
}

function renderNotice(props: { contents?: string; style: PropertyStyleData['notice'] }): string {
	/* === props === */
	const { contents, style } = props

	const { variant } = style

	/* === return === */
	return `
	<div class="novo-notice" data-novo-variant=${variant}>
		<p class="novo-notice-title">予告広告</p>
		<p class="novo-notice-content">${contents}</p>
	</div>
	`
}

function renderTable(props: { data?: PropertyBlockTableData; style: PropertyStyleData['table'] }): string {
	/* === props === */
	const { data, style } = props

	if (!data) return ''

	const { caption, description, subject, table } = data

	const { outline, separator, variant } = style

	const tableBlocks = table.map(
		({ label, value }) => `
		<div class="novo-table-content">
			<dt class="novo-table-label">${label}</dt>
			<dd class="novo-table-value">${value || ''}</dd>
		</div>
	`,
	)

	/* === return === */
	return `
	<div class="novo-table-wrapper" data-novo-variant=${variant}  data-novo-outline=${outline}  data-novo-separator=${separator}>
		${subject ? `<p class="novo-table-subject">${subject}</p>` : ''}
		${description ? `<p class="novo-table-description">${description}</p>` : ''}
		${tableBlocks ? `<dl class="novo-table">${tableBlocks?.join('\n')}</dl>` : ''}
		${caption ? `<p class="novo-table-caption">${caption}</p>` : ''}
	</div>
	`
}
