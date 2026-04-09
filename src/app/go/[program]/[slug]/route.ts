import { NextRequest, NextResponse } from 'next/server';
import { AFFILIATE_PROGRAMS, type AffiliateProgram } from '@/lib/affiliate';

/**
 * Affiliate redirect handler.
 * Destination URLs live in /content/_redirects/[program]/[slug].json
 * Falls back to program base URL if no mapping found.
 *
 * Usage: /go/evo/smith-vantage-mips?post=best-ski-helmets-2026
 */

import fs from 'fs';
import path from 'path';

interface RedirectEntry {
  url: string;
  label: string;
}

function getDestination(program: AffiliateProgram, slug: string): string | null {
  const filePath = path.join(
    process.cwd(),
    'content',
    '_redirects',
    program,
    `${slug}.json`
  );
  if (!fs.existsSync(filePath)) return null;
  const entry: RedirectEntry = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return entry.url;
}

function appendTracking(url: string, program: AffiliateProgram, postSlug?: string): string {
  const config = AFFILIATE_PROGRAMS[program];
  const dest = new URL(url);

  dest.searchParams.set(config.trackingParam, config.trackingValue);

  if (postSlug) {
    dest.searchParams.set('utm_campaign', postSlug);
  }

  return dest.toString();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ program: string; slug: string }> }
) {
  const { program, slug } = await params;
  const postSlug = request.nextUrl.searchParams.get('post') ?? undefined;

  if (!(program in AFFILIATE_PROGRAMS)) {
    return NextResponse.json({ error: 'Unknown program' }, { status: 404 });
  }

  const affiliateProgram = program as AffiliateProgram;
  const rawDestination = getDestination(affiliateProgram, slug);

  if (!rawDestination) {
    // Fall back to program homepage
    const config = AFFILIATE_PROGRAMS[affiliateProgram];
    return NextResponse.redirect(config.baseUrl, { status: 307 });
  }

  const finalUrl = appendTracking(rawDestination, affiliateProgram, postSlug);

  return NextResponse.redirect(finalUrl, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
}
