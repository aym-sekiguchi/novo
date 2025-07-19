import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import { authConfig } from '@/configs/auth'

export default NextAuth({
	...authConfig,
	callbacks: {
		authorized: ({ auth, request }) => {
			// プロトコルからのURLを取得
			const { nextUrl } = request

			// pathnameを取得
			const { pathname } = nextUrl

			// ログイン状態確認
			const isLoggedIn = !!auth?.user
			const isOnLogin = pathname.startsWith('/login')

			// ログインページかつログイン済みの場合はトップにリダイレクト
			if (isLoggedIn && isOnLogin) {
				return NextResponse.redirect(new URL('/', nextUrl))
			}

			// ログインページ以外かつ未ログインの場合はログインページにリダイレクト
			if (!isLoggedIn && !isOnLogin) {
				const url = new URL('/login', nextUrl)
				return NextResponse.redirect(url)
			}

			const user = auth?.user

			// editorがトップにアクセスしたときは自分のページにリダイレクト
			if (user?.role === 'editor' && pathname === '/') {
				return NextResponse.redirect(new URL(`/${user.username}`, nextUrl))
			}

			return isLoggedIn
		},
		session: ({ session, token }) => {
			return token ? { ...session, user: { ...token } } : session
		},
	},
}).auth

// const { auth } = NextAuth({
// 	...authConfig,
// 	callbacks: {
// 		jwt: ({ token, user }) => {},
// 		session: ({ session, token }) => {
// 			return token ? { ...session, user: { ...token } } : session
// 		},
// 	},
// })

// export default auth(async function middleware(request) {
// 	const response = NextResponse.next({ request })

// 	// requestからpathnameを取得
// 	const pathname = request.nextUrl.pathname

// 	// responseのheadersにpathnameをセット
// 	response.headers.set('x-pathname', pathname)

// 	// pathnameが/apiで始まる場合はそのまま返す
// 	if (pathname.startsWith('/api')) return response

// 	// セッション情報を取得
// 	const session = await getSession().catch(() => null)

// 	// ログインURLを取得
// 	const loginURL = authConfig.pages.signIn

// 	// ログインページかどうかを判定
// 	const isLoginPage = pathname.startsWith(loginURL)

// 	// 未ログインかつログインページ以外の場合はログインページにリダイレクト
// 	if (!session && !isLoginPage) return NextResponse.redirect(new URL(loginURL, request.nextUrl))

// 	// ログイン済みかつログインページの場合はトップにリダイレクト
// 	if (session && isLoginPage) return NextResponse.redirect(new URL('/', request.nextUrl))

// 	// ログイン済みかつトップページかつroleがeditorの場合はuserのページにリダイレクト
// 	if (session?.role === 'editor' && pathname === '/') {
// 		return NextResponse.redirect(new URL(`/${session.username}`, request.nextUrl))
// 	}

// 	return response
// })

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
