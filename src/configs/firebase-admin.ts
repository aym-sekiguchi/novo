import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseAdminConfig = {
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
	projectId: process.env.FIREBASE_PROJECT_ID,
}

// 認証情報
const credential = cert(firebaseAdminConfig)

// 初期化
const app = !getApps().length ? initializeApp({ credential }) : getApps()[0]

// データベースアプリ
const store = getFirestore(app)

const globalAny = globalThis as { __firestoreSettingsApplied?: boolean }

if (!globalAny.__firestoreSettingsApplied) {
	// gRPCを使わずREST通信に切り替える設定を追加（Vercel対応）
	store.settings({ preferRest: true })
	globalAny.__firestoreSettingsApplied = true
}

/* === export === */
export { app, store }
