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
    '/((?!api/|_next/|i/|_static/|_vercel|edit|invite|new|new-api|assets|[\\w-]+\\.\\w+).*)',
  ],
};

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname and normalize for dev environment - using a regex for better performance
  const hostname = req.headers
    .get('host')!
    .replace(new RegExp(`.dev.glow:3000$`), `.${rootDomain}`);

  // Create base URL once
  const baseUrl = new URL('', req.url);

  // Handle root domain
  if (hostname === rootDomain) {
    return handleRootDomain(req, url.pathname, baseUrl);
  }

  // Handle unknown domains - reuse baseUrl
  baseUrl.pathname = `/${hostname}/unknown`;
  return NextResponse.rewrite(baseUrl);
}

async function handleRootDomain(req: NextRequest, path: string, baseUrl: URL) {
  const searchParams = req.nextUrl.searchParams.toString();

  if (path === '/') {
    const marketingDest = process.env.NEXT_PUBLIC_MARKETING_URL;
    const search = searchParams ? '?' + searchParams : '';
    if (marketingDest) {
      // Construct the full URL for the rewrite
      const destinationUrl = new URL(`${marketingDest}/i${search}`);
      return NextResponse.rewrite(destinationUrl);
    }
    // Fallback if NEXT_PUBLIC_MARKETING_URL isn't set, though it should be.
    // This will likely result in a 404 if there's no app.frontend/app/page.tsx
    return NextResponse.next();
  }

  // Rewrite all other paths (likely for user pages on the root domain)
  // Ensure this logic is what you intend for paths other than '/' on the root domain.
  // It currently rewrites example.com/foo to example.com/example.com/foo which might be incorrect.
  // If these are user slugs, it should perhaps be something like:
  // baseUrl.pathname = `/${path}`; // Assuming 'path' is the slug
  // For now, keeping original logic for non-'/' paths:
  baseUrl.pathname = `/${req.headers.get('host')}${path}`;
  baseUrl.search = searchParams;
  return NextResponse.rewrite(baseUrl);
}
