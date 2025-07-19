import bic from 'browser-image-compression'

import type { Options } from 'browser-image-compression'

export async function imageCompression(file: File, options = {} as Options): Promise<File> {
	// SVGは圧縮しない
	if (file.type === 'image/svg+xml') return file

	// オプション
	const defaultOptions: Options = {
		...options,
		fileType: options?.fileType ?? 'image/webp',
		initialQuality: options?.initialQuality ?? 0.8,
		maxIteration: options?.maxIteration ?? 20,
		maxWidthOrHeight: options?.maxWidthOrHeight ?? 500,
		useWebWorker: options?.useWebWorker ?? true,
	}

	/* === return === */
	return await bic(file, defaultOptions)
}
