import { NextResponse } from 'next/server'

/**
 * Returns a standardized JSON error response for API routes.
 * @param message Error message to return to the client
 * @param status HTTP status code (default: 500)
 */
export function errorResponse(message: string, status: number = 500) {
  return new NextResponse(
    JSON.stringify({ error: message }),
    {
      headers: { 'Content-Type': 'application/json' },
      status,
    },
  )
}
