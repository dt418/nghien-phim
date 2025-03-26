import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { vi } from 'vitest'

import { ThemeProvider } from '~/providers/theme'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  writable: true,
})

function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: ThemeProvider,
    ...options,
  })
}

export {
  act,
  buildQueries,
  cleanup,
  configure,
  fireEvent,
  getNodeText,
  prettyDOM,
  queries,
  queryHelpers,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender }
