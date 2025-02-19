import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

export const runtime = 'experimental-edge';

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /i (internal pages)
     * 4. /_static (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     * 6. _vercel
     * 7. assets
     */
    '/((?!api/|_next/|i/|_static/|_vercel|assets|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // Get hostname and normalize for dev environment - using a regex for better performance
  const hostname = req.headers
    .get('host')!
    .replace(new RegExp(`.dev.glow:3000$`), `.${rootDomain}`);

  // Create base URL once
  const baseUrl = new URL('', req.url);

  console.log('hostname', hostname);

  // Handle root domain
  if (hostname === rootDomain) {
    return handleRootDomain(req, url.pathname, baseUrl);
  }

  // Handle unknown domains - reuse baseUrl
  baseUrl.pathname = `/${hostname}/unknown`;
  return NextResponse.rewrite(baseUrl);
}

function handleRootDomain(req: NextRequest, path: string, baseUrl: URL) {
  const searchParams = req.nextUrl.searchParams.toString();

  // Redirect root to landing page
  if (path === '/') {
    baseUrl.pathname = '/i/landing-page';
    baseUrl.search = searchParams;
    return NextResponse.rewrite(baseUrl);
  }

  // Handle special paths
  if (path.startsWith('/new')) {
    baseUrl.pathname = path;
    baseUrl.search = searchParams;
    return NextResponse.rewrite(baseUrl);
  }

  // Rewrite all other paths
  baseUrl.pathname = `/${req.headers.get('host')}${path}`;
  baseUrl.search = searchParams;
  return NextResponse.rewrite(baseUrl);
}
