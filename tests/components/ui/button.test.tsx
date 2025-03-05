import { describe, expect, it } from 'vitest';

import { Button } from '@/components/ui/button';

import { render, screen } from '../../utils/test-utils';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveTextContent(
      'Click me'
    );
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass(
      'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    );
  });

  it('applies size classes correctly', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('h-9 rounded-md px-3');
  });
});
