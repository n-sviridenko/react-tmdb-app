export const defaultLocale = 'en';

export const tmdbClient = {
  apiKey: process.env.TMDB_API_KEY,
  baseUri: process.env.TMDB_BASE_URI,
  imagesUri: process.env.TMDB_IMAGES_URI,
  timeout: process.env.TMDB_TIMEOUT,
};
