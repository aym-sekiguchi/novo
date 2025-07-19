// import type { ProcessOptions } from 'postcss'

// /**
//  * PostCSS configuration
//  *
//  */
// const postCssConfig: {
// 	options?: ProcessOptions
// 	plugins: Record<string, unknown>
// } = {
// 	options: {},
// 	plugins: { '@tailwindcss/postcss': {} },
// }

// export default postCssConfig

const config = {
	plugins: {
		'@tailwindcss/postcss': {},
	},
}

export default config
