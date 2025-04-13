import { describe, expect, it, vi } from 'vitest'
import { fetchWithErrorHandling } from '~/lib/api/fetch'
import { getFilmByCategory, getFilmByCountry, getFilmBySlug, getFilmByYear, getFilmListByCategory, getFilms, searchFilms } from '~/lib/api/films'

vi.mock('~/lib/api/fetch')

describe('films API', () => {
  /**
   * Tests that the getFilms function is called correctly.
   */
  it('should call getFilms correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      paginate: { current_page: 1, total_page: 1 },
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await getFilms(1)

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/phim-moi-cap-nhat?page=1'),
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the getFilmListByCategory function is called correctly.
   */
  it('should call getFilmListByCategory correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      paginate: { current_page: 1, total_page: 1 },
      cat: { id: 1, title: 'Category 1' },
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await getFilmListByCategory('category-1', 1)

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/danh-sach/category-1?page=1'),
      undefined,
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the getFilmBySlug function is called correctly.
   */
  it('should call getFilmBySlug correctly', async () => {
    const mockResponse = { id: 1, title: 'Film 1' };
    (fetchWithErrorHandling as any).mockImplementation((url: string) => {
      if (url === 'https://phim.nguonc.com/api/film/film-1') {
        return Promise.resolve(mockResponse)
      }
      return Promise.reject(new Error('Unexpected URL'))
    })

    const result = await getFilmBySlug('film-1')

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'https://phim.nguonc.com/api/film/film-1',
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the searchFilms function is called correctly.
   */
  it('should call searchFilms correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      total: 1,
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await searchFilms('film')

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/search?keyword=film'),
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the getFilmByYear function is called correctly.
   */
  it('should call getFilmByYear correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      paginate: { current_page: 1, total_page: 1 },
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await getFilmByYear('2023', 1)

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/nam-phat-hanh/2023?page=1'),
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the getFilmByCountry function is called correctly.
   */
  it('should call getFilmByCountry correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      paginate: { current_page: 1, total_page: 1 },
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await getFilmByCountry('us', 1)

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/quoc-gia/us?page=1'),
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Tests that the getFilmByCategory function is called correctly.
   */
  it('should call getFilmByCategory correctly', async () => {
    const mockResponse = {
      data: [{ id: 1, title: 'Film 1' }],
      paginate: { current_page: 1, total_page: 1 },
      cat: { id: 1, title: 'Category 1' },
    };
    (fetchWithErrorHandling as any).mockResolvedValue(mockResponse)

    const result = await getFilmByCategory('action', 1)

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      expect.stringContaining('/the-loai/action?page=1'),
    )
    expect(result).toEqual(mockResponse)
  })
})
