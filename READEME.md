# Novo - 不動産物件管理システム

> 物件情報の作成・管理・公開を効率化するWebアプリケーション

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-0a7ea4)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-Admin-orange)
![Auth.js](https://img.shields.io/badge/Auth.js-Latest-green)

## 📋 プロジェクト概要

Novoは、不動産業界向けに開発された物件情報管理システムです。物件の詳細情報を効率的に作成・編集し、美しいWebページとして公開できるプラットフォームを提供します。

### 🎯 主な機能

- **認証システム**: セキュアなログイン機能（管理者・ユーザー別権限）
- **物件管理**: 物件情報の作成・編集・削除
- **ブロック型エディタ**: ドラッグ&ドロップによる直感的なコンテンツ作成
- **リアルタイム更新**: Firebaseを活用したリアルタイム同期
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **画像管理**: アバター・物件画像のアップロード機能

## 🚀 技術スタック

### フロントエンド

- **Next.js 15**: App Router, Server Components, Server Actions
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: 効率的なスタイリング
- **@dnd-kit**: ドラッグ&ドロップ機能

### バックエンド・認証

- **Auth.js**: モダンな認証システム
- **Firebase Admin SDK**: サーバーサイドデータベース操作
- **bcryptjs**: パスワードハッシュ化

### 開発・品質管理

- **ESLint**: コード品質の維持
- **Bun**: 高速なパッケージマネージャー
- **Cspell**: スペルチェック

## 🏗️ アーキテクチャ

```md
src/
├── actions/ # Server Actions
├── features/ # 機能別モジュール
│ ├── login/ # ログイン機能
│ ├── property/ # 物件管理
│ ├── avatar/ # プロフィール管理
│ └── memo/ # メモ機能
├── configs/ # 設定ファイル
└── utilities/ # 共通ユーティリティ
```

## 💡 技術的なハイライト

### 1. モダンなNext.js活用

```typescript
// Server Actionsを活用したフォーム処理
export async function loginAction(values: LoginSchemaType) {
	'use server'
	// 認証ロジック
}
```

### 2. 型安全なFirebase操作

```typescript
// 型定義を活用したデータベース操作
const docRef = store.collection('projects').doc(username)
const doc = await docRef.get()
const data = doc.data() as ProjectData
```

### 3. バッチ処理による効率的なデータ更新

```typescript
// 複数のドキュメントを一括更新
const batch = store.batch()
data.map((value, index) => {
	const docRef = store.collection(collectionPath).doc(value.id)
	batch.update(docRef, { order: index })
})
await batch.commit()
```

## 🔧 セットアップ

### 必要な環境

- Node.js 18+
- Bun (推奨) または npm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/aym-sekiguchi/novo.git
cd novo

# 依存関係のインストール
bun install

# 環境変数の設定
cp .env.example .env.local
# Firebase設定、認証情報を設定

# 開発サーバーの起動
bun dev
```

### 環境変数

```env
# auth
AUTH_SECRET=your-auth-secret # Added by `npx auth`. Read more: https://cli.authjs.dev

# firebase
MAX_PROJECTS_COUNT=1000
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n

# admin
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-hashed-password
```

## 🎨 主要な機能デモ

### 1. ログイン機能

- 管理者・一般ユーザーの権限分離
- セキュアなパスワードハッシュ化
- セッション管理

### 2. 物件管理システム

- 直感的なブロック型エディタ
- ドラッグ&ドロップによる並び替え
- リアルタイムプレビュー

### 3. レスポンシブデザイン

- モバイルファーストアプローチ
- 全デバイス対応のUI/UX

## 📊 パフォーマンス最適化

- **Server Components**: 初期ロード時間の短縮
- **Image Optimization**: Next.js Image componentの活用
- **Code Splitting**: 自動的なバンドル分割
- **Caching**: Firebase Admin SDKによる効率的なキャッシュ

## 🧪 テスト・品質管理

- ESLintによる静的解析
- TypeScriptによる型チェック
- Cspellによるスペルチェック

## 📱 レスポンシブ対応

- **モバイル**: 320px〜768px
- **タブレット**: 768px〜1024px
- **デスクトップ**: 1024px以上

## 🔒 セキュリティ

- bcryptjsによる安全なパスワードハッシュ化
- Firebase Security Rulesによるデータ保護
- Auth.jsによるセッション管理
- CSRF保護

## 📄 ライセンス

MIT License

## 👨‍💻 開発者情報

このプロジェクトは、モダンなWeb開発技術を駆使して作成されました。Next.js 15の最新機能やServer Actions、Firebase Admin SDKを活用し、実際のビジネス課題を解決するアプリケーションとして設計されています。

---

**このプロジェクトを通じて、モダンなReact/Next.js開発、Firebase活用、認証システム実装の実務経験を積むことができました。**
