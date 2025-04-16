'server only'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { Redis } from '@upstash/redis'
import { ipAddress } from '@vercel/functions'

import { errorResponse } from '~/lib/api/errorResponse'

const redis = Redis.fromEnv()

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== 'POST') {
      return errorResponse('use POST', 405)
    }
    if (req.headers.get('Content-Type') !== 'application/json') {
      return errorResponse('must be json', 400)
    }

    const body = await req.json()
    let slug: string | undefined
    if ('slug' in body) {
      slug = body.slug
    }
    if (!slug) {
      return errorResponse('Slug not found', 400)
    }

    const key = ['pageviews', 'films', slug].join(':')
    const ip = ipAddress(req)
    if (ip) {
      // Hash the IP in order to not store it directly in your db.
      const buf = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(ip),
      )
      const hash = Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')

      // deduplicate the ip for each slug
      const isNew = await redis.set(
        ['deduplicate', hash, slug].join(':'),
        true,
        {
          ex: 24 * 60 * 60,
          nx: true,
        },
      )
      if (!isNew) {
        // Return current view count even if duplicated
        const views = await redis.get(key)
        return new NextResponse(JSON.stringify({ views }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      }
    }

    const newCount = await redis.incr(key)
    return new NextResponse(JSON.stringify({ views: newCount }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  }
  catch (error) {
    console.error('Error in increment route:', error)
    return errorResponse('Internal Server Error', 500)
  }
}
