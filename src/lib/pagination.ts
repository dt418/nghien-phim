/**
 * Calculates a list of page numbers to display in pagination, centered around the current page
 *
 * @param currentPage - The currently active page number
 * @param PAGE_TO_DISPLAY - Number of pages to show on each side of the current page
 * @param totalPage - Total number of pages available
 *
 * @returns An array of page numbers to display
 *
 * @example
 * // With 10 total pages, showing 2 pages on each side
 * calculatePageList(5, 2, 10) // returns [3, 4, 5, 6, 7]
 * calculatePageList(1, 2, 10) // returns [1, 2, 3]
 * calculatePageList(10, 2, 10) // returns [8, 9, 10]
 *
 * // With 5 total pages, showing 1 page on each side
 * calculatePageList(3, 1, 5) // returns [2, 3, 4]
 */
export function calculatePageList(currentPage: number, PAGE_TO_DISPLAY: number, totalPage: number): number[] {
  // Ensure start page is not less than 1
  const start = Math.max(1, currentPage - PAGE_TO_DISPLAY)
  // Ensure end page does not exceed total pages
  const end = Math.min(totalPage, currentPage + PAGE_TO_DISPLAY)

  // Create array of page numbers from start to end
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}
