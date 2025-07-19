import type { PropertyBlockData, PropertyBlockTableData } from '@/types'

/**
 * 区切り線をレンダリング
 *
 * @param props.parent - レンダリングする親要素
 */

export function renderSeparator(props: { parent: HTMLElement }): void {
	/* === props === */
	const { parent } = props

	// 要素を作成
	const separator = document.createElement('hr')

	// クラス名をつける
	separator.className = 'separator'

	// 親要素にレンダリング
	parent.appendChild(separator)
}

/**
 * カスタムをレンダリング
 *
 * @param props.parent - レンダリングする親要素
 */

export function renderCustom(props: { contents: PropertyBlockData['contents']; parent: HTMLElement }): void {
	/* === props === */
	const { contents, parent } = props

	// 要素を作成
	const custom = document.createElement('div')

	// コンテンツを挿入
	if (contents) {
		custom.innerHTML = contents
	}

	// 親要素にレンダリング
	parent.appendChild(custom)
}

/**
 * 注釈をレンダリング
 *
 * @param props.contents - コンテンツ
 * @param props.parent - レンダリングする親要素
 */

export function renderCaption(props: { contents: PropertyBlockData['contents']; parent: HTMLElement }): void {
	/* === props === */
	const { contents, parent } = props

	// 要素を作成
	const caption = document.createElement('p')

	// クラス名をつける
	caption.className = 'caption'

	// コンテンツを挿入
	if (contents) {
		caption.textContent = contents
	}

	// 親要素にレンダリング
	parent.appendChild(caption)
}

/**
 * 予告をレンダリング
 *
 * @param props.contents - コンテンツ
 * @param props.parent - レンダリングする親要素
 */

export function renderNotice(props: { contents: PropertyBlockData['contents']; parent: HTMLElement }): void {
	/* === props === */
	const { contents, parent } = props

	// 要素を作成
	const notice = document.createElement('div')
	const noticeTitle = document.createElement('p')
	const noticeContent = document.createElement('p')

	// クラス名をつける
	notice.className = 'notice'
	noticeTitle.className = 'notice-title'
	noticeContent.className = 'notice-content'

	// コンテンツを挿入
	noticeTitle.textContent = '予告広告'
	if (contents) {
		noticeContent.textContent = contents
	}

	// 親要素にレンダリング
	notice.appendChild(noticeTitle)
	notice.appendChild(noticeContent)
	parent.appendChild(notice)
}

/**
 * 表をレンダリング
 *
 * @param props.contents - コンテンツ
 * @param props.parent - レンダリングする親要素
 */

export function renderTable(props: { contents: PropertyBlockTableData; parent: HTMLElement }): void {
	/* === props === */
	const { contents, parent } = props

	// 要素を作成
	const tableWrapper = document.createElement('div')
	const dl = document.createElement('dl')

	// クラス名をつける
	tableWrapper.className = 'table-wrapper'
	dl.className = 'table'

	// 表題がある場合
	if (contents.subject) {
		// 要素を作成
		const subject = document.createElement('p')

		// クラス名をつける
		subject.className = 'table-subject'

		// コンテンツを挿入
		subject.textContent = contents.subject

		// 親要素にレンダリング
		tableWrapper.appendChild(subject)
	}

	// 表を挿入
	contents.table.forEach((item) => {
		// 要素を作成
		const div = document.createElement('div')
		const dt = document.createElement('dt')
		const dd = document.createElement('dd')

		// クラス名をつける
		div.className = 'table-content'
		dt.className = 'table-label'
		dd.className = 'table-value'

		// コンテンツを挿入
		dt.textContent = item.label
		dd.textContent = item.value || ''

		// 親要素にレンダリング
		div.appendChild(dt)
		div.appendChild(dd)
		dl.appendChild(div)
		tableWrapper.appendChild(dl)
	})

	// 注釈がある場合
	if (contents.caption) {
		// 要素を作成
		const caption = document.createElement('p')

		// クラス名をつける
		caption.className = 'table-caption'

		// コンテンツを挿入
		caption.textContent = contents.caption

		// 親要素にレンダリング
		tableWrapper.appendChild(caption)
	}

	// 親要素にレンダリング
	parent.appendChild(tableWrapper)
}
