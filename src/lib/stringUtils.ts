import slugify from 'slugify';

export function textTruncate(str: string, length = 160, ending = '...') {
  if (length == null) {
    length = 100;
  }

  if (ending == null) {
    ending = '...';
  }
  if (typeof str === 'string' && str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

const IS_SERVER = typeof window === 'undefined';

/**
 *
 * @param path The relative path start with '/'
 * @example
 * getURL('/about')
 * @returns Full path with host name
 */
export function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_SITE_URL!
    : window.location.origin;
  return new URL(path, baseURL).toString();
}

/**
 * Converts a string to a URL-friendly slug with Vietnamese language support.
 * @param str - The input string to convert to a slug
 * @returns A lowercase URL-friendly slug with Vietnamese characters converted to Latin equivalents
 * @example
 * ```typescript
 * stringToSlug("Xin chào") // returns "xin-chao"
 * ```
 */
export function stringToSlug(str: string) {
  return slugify(str, {
    locale: 'vi',
    lower: true,
    strict: true,
    replacement: '-',
  });
}

/**
 * Checks if a given URL string points to an image file
 * @param url - The URL string to validate
 * @returns `true` if the URL is valid and ends with an image extension, `false` otherwise
 * @example
 * ```typescript
 * isImageUrl('https://example.com/image.jpg') // Returns: true
 * isImageUrl('https://example.com/file.pdf') // Returns: false
 * ```
 */
export function isImageUrl(url: string) {
  try {
    // Validate URL format
    new URL(url);

    // Check if the URL ends with an image extension
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|ico)$/i.test(url);
  } catch {
    return false;
  }
}
