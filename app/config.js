import range from 'lodash/range';

export const defaultLocale = 'en';

export const tmdbClient = {
  apiKey: process.env.TMDB_API_KEY,
  baseUri: process.env.TMDB_BASE_URI,
  imagesUri: process.env.TMDB_IMAGES_URI,
  timeout: process.env.TMDB_TIMEOUT,
};

export const movie = {
  discover: {
    orderBys: [
      'popularity',
      'vote_average',
      'primary_release_date',
      'title',
    ].reduce((acc, item) => [...acc, `${item}.desc`, `${item}.asc`], []),
    years: range(new Date().getFullYear(), 1900 - 1, -1),
  },
};
