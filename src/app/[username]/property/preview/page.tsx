import { getProperty } from '@/actions'
import { PropertyPreview } from '@/features'
import { defaultStyle } from '@/libraries'

import { Preview } from './preview'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: 'プレビュー' }
}

/**
 * 物件概要 プレビュー
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	const { username } = await props.params
	const property = await getProperty(username).catch((error) => {
		console.error(error)
		return null
	})
	const style = property?.style || defaultStyle

	/* ===  return === */
	return <PropertyPreview>{property && <Preview property={property} style={style} />}</PropertyPreview>
}
