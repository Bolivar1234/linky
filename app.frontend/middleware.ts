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
  let rawHostname = req.headers.get('host')!;
  let normalizedHostname = rawHostname;

  // Normalize www. to the root domain for comparison
  // Ensure rootDomain is defined before using it in startsWith
  if (rootDomain && rawHostname.startsWith(`www.${rootDomain}`)) {
    normalizedHostname = rootDomain;
  }
  
  // Normalize for dev environment if applicable
  // (adjust regex if your dev URLs are different, e.g., if rootDomain itself might be part of the dev URL)
  if (rootDomain) { // Ensure rootDomain is available for the replace pattern
    normalizedHostname = normalizedHostname.replace(new RegExp(`\\.dev\\.glow:3000$`), `.${rootDomain}`);
  }
  // else if (normalizedHostname.endsWith('.dev.glow:3000')) {
    // Handle dev normalization if rootDomain is not set, though it should be.
    // normalizedHostname = normalizedHostname.split('.')[0]; // Example: my-site.dev.glow:3000 -> my-site
  // }


  // Create base URL once
  const baseUrl = new URL('', req.url);

  // Handle root domain
  if (normalizedHostname === rootDomain) {
    return handleRootDomain(req, url.pathname, baseUrl);
  }

  // Handle other hostnames (subdomains or custom domains not matching root)
  // This logic might need review based on your multi-tenancy/subdomain strategy.
  // Using rawHostname here to capture the original subdomain if it's not the root.
  baseUrl.pathname = `/${rawHostname}${url.pathname === '/' ? '' : url.pathname}`; // Avoids //unknown for root of subdomain
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
