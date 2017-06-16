import theMovieDb from 'themoviedb-javascript-library';

import { tmdbClient } from 'config';

export default function configureTmdbClient() {
  theMovieDb.common.api_key = tmdbClient.apiKey;
  theMovieDb.common.base_uri = tmdbClient.baseUri;
  theMovieDb.common.images_uri = tmdbClient.imagesUri;
  theMovieDb.common.timeout = tmdbClient.timeout;
}
