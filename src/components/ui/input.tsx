import * as React from 'react'

import { cn } from '~/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

function Input({ ref, className, type, startIcon, endIcon, ...props }: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) {
  const StartIcon = startIcon
  const EndIcon = endIcon
  return (
    <div className="relative w-full">
      {StartIcon && (
        <div className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          startIcon ? 'pl-10' : '',
          endIcon ? 'pr-10' : '',
          className,
        )}
        ref={ref}
        {...props}
      />
      {EndIcon && (
        <div className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900">
          {endIcon}
        </div>
      )}
    </div>
  )
}
Input.displayName = 'Input'

export { Input }
