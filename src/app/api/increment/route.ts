'server only';

import { Redis } from '@upstash/redis';
import { ipAddress } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // 'nodejs' (default) | 'edge'

const redis = Redis.fromEnv();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== 'POST') {
      return new NextResponse('use POST', { status: 405 });
    }
    if (req.headers.get('Content-Type') !== 'application/json') {
      return new NextResponse('must be json', { status: 400 });
    }

    const body = await req.json();
    let slug: string | undefined = undefined;
    if ('slug' in body) {
      slug = body.slug;
    }
    if (!slug) {
      return new NextResponse('Slug not found', { status: 400 });
    }

    const key = ['pageviews', 'films', slug].join(':');
    const ip = ipAddress(req);
    if (ip) {
      // Hash the IP in order to not store it directly in your db.
      const buf = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(ip)
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // deduplicate the ip for each slug
      const isNew = await redis.set(
        ['deduplicate', hash, slug].join(':'),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        }
      );
      if (!isNew) {
        // Return current view count even if duplicated
        const views = await redis.get(key);
        return new NextResponse(JSON.stringify({ views }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const newCount = await redis.incr(key);
    return new NextResponse(JSON.stringify({ views: newCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in increment route:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
