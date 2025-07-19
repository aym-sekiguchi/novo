import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import * as reactCompiler from 'eslint-plugin-react-compiler'
import * as hooksPlugin from 'eslint-plugin-react-hooks'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import eslintPluginSortExports from 'eslint-plugin-sort-exports'
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix'
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys'
import globals from 'globals'
import { configs as tsConfigs } from 'typescript-eslint'

import type { Linter } from 'eslint'

const tslintConfigs = tsConfigs.recommended.map((config) => ({ ...config, files: ['**/*.ts', '**/*.tsx'] }))

export default [
	{ ignores: ['node_modules', '.next', 'out'] },
	{
		name: 'recommended',
		...js.configs.recommended,
		rules: { 'no-async-promise-executor': 'error', 'require-await': 'error', ...js.configs.recommended.rules },
	},
	...tslintConfigs,
	{
		files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
		languageOptions: { parserOptions: { project: './tsconfig.json' } },
		name: 'typescript-eslint/custom',
		rules: {
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/consistent-type-imports': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'warn',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/prefer-as-const': 'warn',
			// '@typescript-eslint/strict-boolean-expressions': 'error',
		},
	},
	{
		name: 'nextPlugin',
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules, // eslint-disable-line
			...nextPlugin.configs['core-web-vitals'].rules, // eslint-disable-line
		},
	},
	{
		name: 'reactPlugin',
		...reactPlugin.configs.flat?.recommended,
		languageOptions: {
			...reactPlugin.configs.flat?.recommended.languageOptions,
			globals: { ...globals.serviceworker, ...globals.browser },
			parserOptions: { ecmaFeatures: { jsx: true }, jsxPragma: null },
		},
		plugins: {
			react: reactPlugin,
		},
		rules: {
			...reactPlugin.configs.flat?.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react/jsx-sort-props': 'warn',
			'react/no-unknown-property': 'off',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		name: 'hooksPlugin',
		plugins: {
			'react-hooks': hooksPlugin,
		},
		rules: hooksPlugin.configs.recommended.rules,
	},
	{
		name: 'jsxA11y',
		...jsxA11yPlugin.flatConfigs.recommended,
		languageOptions: {
			...jsxA11yPlugin.flatConfigs.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		rules: {
			...jsxA11yPlugin.flatConfigs.recommended.rules,
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img'],
					img: ['Image'],
				},
			],
			'jsx-a11y/aria-props': 'warn',
			'jsx-a11y/aria-proptypes': 'warn',
			'jsx-a11y/aria-unsupported-elements': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'warn',
			'jsx-a11y/role-supports-aria-props': 'warn',
		},
	},
	{
		name: 'importPlugin',
		...importPlugin.flatConfigs.recommended,
		languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
		rules: {
			...importPlugin.flatConfigs.recommended.rules,
			'import/no-anonymous-default-export': 'warn',
			'import/order': [
				'error',
				{
					// アルファベット順に並び替え
					alphabetize: { caseInsensitive: true, order: 'asc' },
					// 名前付きインポートとデフォルトインポートを分けて改行
					distinctGroup: true,
					groups: [
						'builtin', // 例: 'fs', 'path'
						'external', // 例: 'react', 'lodash'
						'internal', // 内部モジュール
						['parent', 'sibling', 'index'], // 同一プロジェクトの親、兄弟、インデックス
						'object', // オブジェクトの分割代入
						'type', // 型のインポート
					],
					'newlines-between': 'always', // インポートのタイプ間に改行を追加
					// pathGroups: [{ group: 'parent', pattern: '{.,..}/**', position: 'before' }],
				},
			],
		},
		settings: {
			'import/parsers': { '@typescript-eslint/parser': ['.d.ts', '.ts', '.tsx'] },
			'import/resolver': { typescript: true },
		},
	},
	{
		name: 'sort-destructure-keys',
		plugins: { 'sort-destructure-keys': sortDestructureKeysPlugin },
		rules: {
			'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
		},
	},
	{
		name: 'sort-keys-fix',
		plugins: { 'sort-keys-fix': sortKeysFixPlugin },
		rules: {
			'sort-keys-fix/sort-keys-fix': 'warn',
		},
	},
	{
		name: 'typescript-sort-keys',
		plugins: { 'typescript-sort-keys': typescriptSortKeys },
		rules: {
			'typescript-sort-keys/interface': 'error',
			'typescript-sort-keys/string-enum': 'error',
		},
	},
	{
		files: ['**/index.ts'],
		name: 'sort-exports',
		plugins: { 'sort-exports': eslintPluginSortExports },
		rules: {
			'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],
		},
	},
	{
		name: 'reactCompiler',
		plugins: { 'react-compiler': reactCompiler },
		rules: {
			'react-compiler/react-compiler': 'error',
		},
	},
	{ name: 'eslintConfigPrettier', ...eslintConfigPrettier },
] satisfies Linter.Config[]
