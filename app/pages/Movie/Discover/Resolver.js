import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { locationShape, routerShape } from 'react-router';
import { fromJS } from 'immutable';
import uniq from 'lodash/uniq';

import * as config from 'config';
import { withRouteValidator } from 'hocs';
import Discover from './Discover';

function resolveQuery(params, query) {
  return fromJS({
    keywords: query.keywords ? uniq(query.keywords.split(',').map(Number)).filter((item) => item > 0) : [],
    genres: query.genres ? uniq(query.genres.split(',').map(Number)).filter((item) => item > 0) : [],
    year: query.year ? parseInt(query.year, 10) : null,
    orderBy: query.orderBy || config.movie.discover.orderBys[0],
    page: query.page ? parseInt(query.page, 10) : 1,
  });
}

function buildRoute(query) {
  return {
    pathname: '/movies/discover',
    query: {
      keywords: query.get('keywords').size ? query.get('keywords').join(',') : undefined,
      genres: query.get('genres').size ? query.get('genres').join(',') : undefined,
      year: query.get('year') || undefined,
      orderBy: query.get('orderBy'),
      page: query.get('page'),
    },
  };
}

export function Resolver({ router, location, params }) {
  const resolvedQuery = resolveQuery(params, location.query);

  const onQueryChange = (nextQuery) => {
    router.replace(buildRoute(nextQuery));
  };

  return <Discover query={resolvedQuery} onQueryChange={onQueryChange} />;
}

Resolver.propTypes = {
  params: PropTypes.object.isRequired,
  location: locationShape.isRequired,
  router: routerShape.isRequired,
};

const routeSchema = {
  query: Joi.object({
    keywords: Joi.string().regex(/^[\d,]+$/),
    genres: Joi.string().regex(/^[\d,]+$/),
    year: Joi.any().only(config.movie.discover.years.map(String)),
    orderBy: Joi.any().only(config.movie.discover.orderBys),
    page: Joi.number().integer().positive(),
  }).with('from', 'to').with('minWeight', 'minWeightMeasure'),
};

export default withRouteValidator(routeSchema)(Resolver);
