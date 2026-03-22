# Mediflow Academy

外国人医療・介護人材の育成プラットフォーム。日本語教育×資格取得×就職を一気通貫で提供する。
運営: Mediflow株式会社（有料職業紹介事業 許可番号: 14-ユ-302174）

## Tech Stack

- Framework: Next.js 14+ (App Router) / TypeScript
- Styling: Tailwind CSS
- Backend: Supabase (Auth / Database / Storage / Edge Functions)
- AI: Claude API (claude-sonnet-4-20250514) — ストリーミング対応必須
- Hosting: Vercel
- Payment: Stripe (Checkout / Webhook / Customer Portal)
- Languages: 6言語対応 (ja / vi / en / my / id / zh)

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # next-intl ルーティング
│   │   ├── dashboard/     # 学習者ダッシュボード
│   │   ├── courses/       # コース一覧・詳細
│   │   ├── lessons/       # レッスン画面
│   │   ├── ai-tutor/      # AI家庭教師チャット
│   │   ├── career/        # 就職サポート・求人マッチング
│   │   ├── live-sessions/ # ライブ講座
│   │   ├── requests/      # 学習リクエスト
│   │   └── pricing/       # 料金プラン
│   └── api/               # Route Handlers
├── components/
│   ├── ui/                # 共通UI (shadcn/ui ベース)
│   ├── learning/          # 学習系
│   ├── career/            # キャリア系
│   └── layout/            # レイアウト
├── lib/
│   ├── supabase/          # client.ts / server.ts / middleware.ts
│   ├── ai/                # Claude API呼び出し・システムプロンプト
│   ├── stripe/            # Stripe設定・ヘルパー
│   └── i18n/              # 国際化設定
├── hooks/                 # useSubscription, useProgress 等
└── types/                 # 型定義
```

## Commands

```bash
npm run dev          # 開発サーバー (localhost:3000)
npm run build        # 本番ビルド
npm run lint         # ESLint
npm run typecheck    # TypeScript型チェック
npx supabase db push # マイグレーション適用
npx supabase gen types typescript --local > src/types/database.ts  # 型生成
```

## Code Conventions

- コンポーネント: 関数コンポーネント + React Hooks のみ（クラスコンポーネント禁止）
- 状態管理: React Server Components を最大活用し、クライアント状態は最小限に
- DB操作: Supabase クライアントを直接使用（ORM不使用）
- APIルート: src/app/api/ 配下に Route Handlers として配置
- 型: database.ts の自動生成型を使用。手動型定義は types/ に配置
- インポート: @/ エイリアスを使用 (例: @/components/ui/Button)
- エラーハンドリング: try-catch + ユーザー向けトースト通知
- 多言語: UIテキストは全て翻訳キー経由。ハードコードされた日本語禁止
- DBコンテンツ: JSONB型で多言語格納 (例: {"ja": "...", "vi": "...", "en": "..."})

## Authentication & Authorization

- Supabase Auth (メール/パスワード)
- ミドルウェアでセッション検証
- RLSポリシーでDB層のアクセス制御
- プラン別アクセスはアプリ層の useSubscription フックで制御
- ロール: learner / instructor / admin

## Subscription Plans

4段階: free → standard (¥2,980) → pro (¥5,980) → premium (¥9,800)
- free: N5基礎、AI家庭教師5回/日、求人閲覧
- standard: 全JLPT、AI無制限、マッチング
- pro: ライブ講座月4回、資格試験対策、録画アーカイブ
- premium: マンツーマン月2回、履歴書添削、優先求人紹介

## AI Integration

- AI家庭教師: ストリーミングレスポンス必須。学習者のレベルと母語に応じて対応言語比率を変える
- 求人マッチング: JSON形式で match_score (0-100) を返す
- 学習プラン生成: 週単位のスケジュールをJSON形式で出力
- システムプロンプトは src/lib/ai/ に配置。ハードコード禁止

## External Services

- LINE公式 (事業者向け): https://lin.ee/R3ytJln
- LINE公式 (求職者向け): https://lin.ee/xUocVyI
- Google Form (求職者): https://forms.gle/H4kMy3fibe5oVrKbA
- 求人応募の最終CTAは必ずLINEまたはGoogle Formsに誘導する

## Key Warnings

- 医療行為の判断・診断をAIに行わせない
- 在留資格の法的助言は「専門家に相談」と案内する
- Stripe Webhookの署名検証を必ず行う
- 個人情報（マイナンバー等）はDBに保存しない
- 無料プレビュー（各コース第1レッスン）は認証なしでアクセス可能にする

## Testing

- ユニットテスト: Vitest
- E2Eテスト: Playwright
- テスト実行: npm run test
- テストファイルは対象ファイルと同階層に .test.ts で配置
