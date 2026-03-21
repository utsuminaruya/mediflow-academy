import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// ログイン必須ルート（ロケールプレフィックス除いたパス）
const PROTECTED_PATHS = ["/dashboard", "/ai-tutor", "/onboarding"];

/** /ja/dashboard や /vi/ai-tutor など、ロケール付きの保護ルートかどうか判定 */
function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) =>
    new RegExp(`^/[a-z]{2}(-[A-Z]{2})?${p}(/|$)`).test(pathname)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedPath(pathname)) {
    // レスポンスを先に作成してCookieのやり取りに使う
    const response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(
                name,
                value,
                options as Parameters<typeof response.cookies.set>[2]
              );
            });
          },
        },
      }
    );

    // getUser() はサーバー側でJWTを検証する（getSession()より安全）
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // ロケールを取得してログインページへリダイレクト
      const locale = pathname.split("/")[1] || "ja";
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      // ログイン後に元のページへ戻れるようにリダイレクト先を保持
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // i18n ルーティング処理（ロケールプレフィックスの付与など）
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/([\\w-]+)?/",
  ],
};
