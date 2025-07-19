declare namespace NodeJS {
	/* eslint-disable typescript-sort-keys/interface */
	interface ProcessEnv {
		// next-auth v5
		AUTH_SECRET: string //認証用のシークレットキー

		// firebase
		MAX_PROJECTS_COUNT: string //プロジェクトの最大登録件数
		NEXT_PUBLIC_FIREBASE_API_KEY: string //FirebaseのAPIキー
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string //Firebaseの認証ドメイン
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: string //FirebaseのプロジェクトID
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string //Firebaseのストレージバケット
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string //Firebaseのメッシング送信者ID
		NEXT_PUBLIC_FIREBASE_APP_ID: string //FirebaseのアプリID
		FIREBASE_PROJECT_ID: string //FirebaseのプロジェクトID（サーバーサイド用）
		FIREBASE_CLIENT_EMAIL: string //Firebaseのクライアントメール（サーバーサイド用）
		FIREBASE_PRIVATE_KEY_ID: string //FirebaseのプライベートキーID（サーバーサイド用）
		FIREBASE_PRIVATE_KEY: string //Firebaseのプライベートキー（サーバーサイド用）

		// admin account
		ADMIN_USERNAME: string //管理者のユーザー名
		ADMIN_PASSWORD: string //管理者のパスワード
	}
	/* eslint-enable typescript-sort-keys/interface */
}
