import CodeTool from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Underline from '@editorjs/underline'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'

import { uploadFile } from '@/firebase/client'
import { imageCompression } from '@/utilities'

export const i18n = {
	messages: {
		blockTunes: {
			delete: { 'Click to delete': 'クリックして削除', Delete: '削除' },
			moveDown: {
				'Move down': '下に移動',
			},
			moveUp: {
				'Move up': '上に移動',
			},
		},
		toolNames: {
			Bold: '太字',
			Checklist: 'チェックリスト',
			Code: 'コード',
			Delimiter: '区切り線',
			Heading: '見出し',
			Image: '画像',
			InlineCode: 'インラインコード',
			Italic: '斜体',
			Link: 'リンク',
			List: 'リスト',
			Marker: 'マーカー',
			'Ordered List': '順序付きリスト',
			Text: 'テキスト',
			Underline: '下線',
			'Unordered List': '順序なしリスト',
		},
		tools: {
			convertTo: { 'Convert to': '変換' },
			image: { 'Stretch image': '画像を全幅表示', 'With background': '背景あり', 'With border': '枠あり' },
			link: {
				'Add a link': 'リンクを追加',
			},
			list: { Checklist: 'チェックリスト', Ordered: '順序付きリスト', Unordered: '順序なしリスト' },
			stub: {
				'The block can not be displayed correctly.': 'このブロックは正しく表示できません。',
			},
			warning: {
				Message: 'メッセージ',
				Title: 'タイトル',
			},
		},
		ui: {
			blockTunes: {
				toggler: {
					'Click to tune': 'クリックして調整',
					'or drag to move': 'またはドラッグして移動',
				},
			},
			popover: {
				'Convert to': '変換',
				Filter: 'フィルター',
			},
			toolbar: {
				toolbox: {
					Add: '追加',
				},
			},
		},
	},
}

// 順番が反映されるため自動ソートを無効化
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const tools = {
	// 追加
	paragraph: {
		tunes: ['alignment'],
	},
	header: Header,
	list: {
		class: List,
		config: {
			defaultStyle: 'unordered',
		},
		inlineToolbar: true,
	},
	delimiter: Delimiter,
	image: {
		class: Image,
		config: {
			uploader: {
				uploadByFile: async (
					file: File,
				): Promise<{
					file: { url: string }
					success: number
				}> => {
					// 圧縮
					const compressedFile = await imageCompression(file)

					// upload
					const result = await uploadFile({ file: compressedFile, path: 'memo' })

					return { success: 1, file: { url: result } }
				},
			},
		},
	},
	code: CodeTool,
	// ポップアップ
	inlineCode: {
		class: InlineCode,
		shortcut: 'CMD+SHIFT+M',
	},
	marker: {
		class: Marker,
		shortcut: 'CMD+SHIFT+M',
	},
	underline: {
		class: Underline,
		shortcut: 'CMD+U',
	},

	// tunes
	alignment: {
		class: AlignmentTuneTool,
		config: {
			blocks: ['paragraph'],
			default: 'left',
		},
	},
}
/* eslint-enable sort-keys-fix/sort-keys-fix */
