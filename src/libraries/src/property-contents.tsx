import { Code, Cog, Database, LandPlot, Palette, View } from 'lucide-react'

export const propertyContents = [
	{ icon: <Database strokeWidth={1.5} />, label: 'データ管理', link: 'blocks' },
	{ icon: <Palette strokeWidth={1.5} />, label: 'スタイル', link: 'style' },
	{ icon: <View strokeWidth={1.5} />, label: 'プレビュー', link: 'preview', target: '_blank' },
	{ icon: <Code strokeWidth={1.5} />, label: 'API', link: 'api' },
	{ icon: <Cog strokeWidth={1.5} />, label: '設定', link: 'setting' },
	{ icon: <LandPlot strokeWidth={1.5} />, label: '本番反映', link: 'deploy' },
]
