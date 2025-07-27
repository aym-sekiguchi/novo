import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// 初期化
const app = !getApps().length ? initializeApp({ credential: applicationDefault() }) : getApps()[0]

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
