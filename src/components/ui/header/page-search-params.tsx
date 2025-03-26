import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'

// Describe search params
export const searchPageSearchParams = {
  keyword: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(0),
}

export const loadSearchParams = createLoader(searchPageSearchParams)
