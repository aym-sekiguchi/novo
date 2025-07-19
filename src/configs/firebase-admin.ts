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

/* === export === */
export { app, store }
