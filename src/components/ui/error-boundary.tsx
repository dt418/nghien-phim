'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { AlertTriangleIcon, HomeIcon, RotateCcwIcon } from 'lucide-react'
import process from 'process'

import { Alert, AlertDescription, AlertTitle } from './alert'
import { Button } from './button'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * ErrorBoundary component to handle and display errors with user-friendly UI.
 * Provides options to retry, go home, or see error details.
 *
 * @param {ErrorBoundaryProps} props
 * @returns The error boundary component
 */
export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Log the error to the console in development
  useEffect(() => {
    console.error('Error caught by ErrorBoundary:', error)
  }, [error])

  // Handle going back to home
  const goHome = () => {
    router.push('/')
  }

  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center gap-8 py-10">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertTriangleIcon className="h-5 w-5" />
        <AlertTitle className="text-lg">Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-4">
            We&apos;re sorry, but an error occurred while displaying this page.
            {error.digest && (
              <span className="mt-2 block text-xs opacity-70">
                Error digest:
                {' '}
                {error.digest}
              </span>
            )}
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="my-4 rounded-md bg-destructive/10 p-4">
              <p className="font-mono text-sm">{error.message}</p>
              {error.stack && (
                <pre className="mt-2 max-h-[200px] overflow-auto rounded bg-black/10 p-2 text-xs">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Button variant="default" size="sm" onClick={goHome}>
          <HomeIcon className="mr-2 h-4 w-4" />
          Go home
        </Button>
        {pathname !== '/' && (
          <Button variant="ghost" asChild size="sm">
            <Link href="/">
              Go back
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
