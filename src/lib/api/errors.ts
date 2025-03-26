/**
 * Custom error class for API-related errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}
