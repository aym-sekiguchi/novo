import { Card, Separator, CardContent } from '@/components'

export function SidePreview(): React.ReactNode {
	return (
		<Card className="h-fit w-full max-w-1/2 @max-[52rem]:hidden">
			<CardContent className="flex flex-col gap-6">
				<div className="space-y-3">
					<h3 className="text-center">プレビュー</h3>
					<Separator />
				</div>
				<section className="border-line bg-background h-40 border"></section>
				<section className="border-line bg-background h-40 border"></section>
			</CardContent>
		</Card>
	)
}
