import { twMerge } from 'tailwind-merge'

// Type
export type ClassName = ClassValue | ClassValue[] | Record<string, ClassValue>

// Type
export type ClassValue = string | number | bigint | null | boolean | undefined

/**
 * 条件付きでクラス名を構築し tailwind クラス名をマージするためのユーティリティ関数
 *
 */
export function cn(...args: ClassName[]): string {
	const classNames: string[] = []

	for (const arg of args) {
		if (arg) classNames.push(toVal(arg))
	}

	/* === return === */
	return twMerge(classNames.filter(Boolean).join(' '))
}

/**
 * プライベート関数：
 * クラス名を文字列に変換する
 *
 */
function toVal(value: ClassName): string {
	// 文字列または数値の場合
	if (typeof value === 'string' || typeof value === 'number') {
		return String(value)
	}

	// 配列の場合
	if (Array.isArray(value)) {
		return value.map(toVal).filter(Boolean).join(' ')
	}

	// オブジェクトの場合
	if (typeof value === 'object' && value !== null) {
		return Object.entries(value)
			.filter(([, val]) => Boolean(val))
			.map(([key]) => key)
			.join(' ')
	}

	/* === return === */
	return '' // falsy な値は無視
}
