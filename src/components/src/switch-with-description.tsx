import { Card, CardContent } from './card'
import { FormDescription, FormLabel } from './form'
import { Switch } from './switch'

type SwitchWithDescriptionProps = {
	checked: boolean
	description: React.ReactNode
	disabled: boolean
	label: React.ReactNode
	onCheckedChange: (checked: boolean) => void
}

/**
 * 説明文ありのスイッチカード
 *
 * @param props.checked - スイッチの状態
 * @param props.description - 説明文
 * @param props.disabled - スイッチの無効化
 * @param props.label - ラベル
 * @param props.onCheckedChange - スイッチの状態変更時のコールバック
 *
 * @returns React.ReactNode
 */

export function SwitchWithDescription(props: SwitchWithDescriptionProps): React.ReactNode {
	/* === props === */
	const { checked, description, disabled, label, onCheckedChange } = props

	/* === return === */
	return (
		<Card>
			<CardContent className="flex items-center justify-between gap-8">
				<div className="flex flex-col gap-2">
					<FormLabel>{label}</FormLabel>
					<FormDescription>{description}</FormDescription>
				</div>
				<Switch checked={checked} className="shrink-0" disabled={disabled} onCheckedChange={onCheckedChange} />
			</CardContent>
		</Card>
	)
}

{
	/* <SwitchWithDescription
checked={value}
description=""
disabled={disabled}
label=""
onCheckedChange={(checked) => onChange(checked)}
/> */
}
