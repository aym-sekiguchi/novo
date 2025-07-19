export type PropertyData = {
	accessToken: string
	blocks: PropertyBlockData[]
	domains: string[] // 許可するドメイン
	fixedAt?: number // 最終本番反映日時
	fixedData?: string
	isDraft: boolean // テスト環境が必要かどうか
	isPublic: boolean // 概要が必要かどうか
	style: PropertyStyleData
}

export type PropertyBlockData = {
	contents?: string
	data?: PropertyBlockTableData
	id: string
	isPublic: boolean
	order: number
	type: 'caption' | 'notice' | 'separator' | 'table' | 'custom'
}

export type PropertyBlockTableData = {
	caption?: string
	description?: string
	subject?: string
	table: { label: string; value?: string }[]
}

export type PropertyStyleData = {
	caption: {
		color: string
		fontSize: number
	}
	notice: {
		color: string
		fontSize: number
		variant: 'default' | 'flex' | 'outline' | 'fill' | 'separator'
	}
	separator: {
		color: string
		weight: number
	}
	table: {
		color: string
		fontSize: number
		outline: boolean
		separator: boolean
		variant: 'default' | 'even' | 'odd' | 'label' | 'value'
	}
}
