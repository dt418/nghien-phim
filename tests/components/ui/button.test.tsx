import { describe, expect, it } from 'vitest'

import { Button } from '~/components/ui/button'

import { customRender, screen } from '../../utils/test-utils'

describe('button', () => {
  it('customRenders button with text', () => {
    customRender(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toHaveTextContent(
      'Click me',
    )
  })

  it('renders icon-only button with aria-label', () => {
    customRender(<Button aria-label="Settings" size="icon"><svg data-testid="icon" /></Button>)
    const button = screen.getByRole('button', { name: /settings/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Settings')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders disabled button', () => {
    customRender(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
  })

  it('applies variant classes correctly', () => {
    customRender(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass(
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    )
  })

  it('applies size classes correctly', () => {
    customRender(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole('button', { name: /small button/i })
    expect(button).toHaveClass('h-9 rounded-md px-3')
  })
})
