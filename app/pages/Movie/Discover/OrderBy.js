import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  'popularity.desc': {
    id: 'app.pages.movie.discover.order_by.popularity.desc',
    defaultMessage: 'Popularity (descending)',
  },
  'popularity.asc': {
    id: 'app.pages.movie.discover.order_by.popularity.asc',
    defaultMessage: 'Popularity (ascending)',
  },
  'vote_average.desc': {
    id: 'app.pages.movie.discover.order_by.vote_average.desc',
    defaultMessage: 'Rating (descending)',
  },
  'vote_average.asc': {
    id: 'app.pages.movie.discover.order_by.vote_average.asc',
    defaultMessage: 'Rating (ascending)',
  },
  'primary_release_date.desc': {
    id: 'app.pages.movie.discover.order_by.primary_release_date.desc',
    defaultMessage: 'Release date (descending)',
  },
  'primary_release_date.asc': {
    id: 'app.pages.movie.discover.order_by.primary_release_date.asc',
    defaultMessage: 'Release date (ascending)',
  },
  'title.desc': {
    id: 'app.pages.movie.discover.order_by.title.desc',
    defaultMessage: 'Title (Z-A)',
  },
  'title.asc': {
    id: 'app.pages.movie.discover.order_by.title.asc',
    defaultMessage: 'Title (A-Z)',
  },
});

function OrderBy({ name }) {
  return <FormattedMessage {...messages[name]} />;
}

OrderBy.propTypes = {
  name: PropTypes.string.isRequired,
};

export default OrderBy;
