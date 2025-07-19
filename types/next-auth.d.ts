import 'next-auth'

declare module 'next-auth' {
	interface Session {
		expires: string
		user: {
			role: 'admin' | 'editor'
			username: string
		}
	}
}
