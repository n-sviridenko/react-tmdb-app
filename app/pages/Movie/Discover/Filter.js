import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { defineMessages, FormattedMessage } from 'react-intl';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as config from 'config';
import KeywordAutoComplete from './KeywordAutoComplete';
import GenreAutoComplete from './GenreAutoComplete';
import OrderBy from './OrderBy';

const messages = defineMessages({
  year: {
    id: 'app.pages.movie.discover.filter.year',
    defaultMessage: 'Year',
  },
  orderBy: {
    id: 'app.pages.movie.discover.filter.order_by',
    defaultMessage: 'Sort by',
  },
  empty: {
    id: 'app.pages.movie.discover.filter.empty',
    defaultMessage: 'None',
  },
  keyword: {
    id: 'app.pages.movie.discover.filter.keyword',
    defaultMessage: 'Keywords',
  },
  genre: {
    id: 'app.pages.movie.discover.filter.genre',
    defaultMessage: 'Genres',
  },
  searchPlaceholder: {
    id: 'app.pages.movie.discover.filter.search_placeholder',
    defaultMessage: 'Search..',
  },
});

class Filter extends React.PureComponent {
  onYearChange = (event, key, payload) => {
    this.setQueryParam('year', payload);
  };

  onOrderByChange = (event, key, payload) => {
    this.setQueryParam('orderBy', payload);
  };

  onKeywordNewRequest = (value, index) => {
    if (index !== -1) {
      this.updateQueryParam('keywords', (keywords) => keywords.push(value.id));
    }
  };

  onGenreNewRequest = (value, index) => {
    if (index !== -1) {
      this.updateQueryParam('genres', (genres) => genres.push(value.id));
    }
  };

  setQueryParam(key, value) {
    const { query, onQueryChange } = this.props;

    onQueryChange(query.set(key, value));
  }

  updateQueryParam(key, modifier) {
    this.setQueryParam(key, modifier(this.props.query.get(key)));
  }

  render() {
    const { query } = this.props;

    return (
      <div className="p-3">
        <div>
          <SelectField
            name="year"
            value={query.get('year')}
            floatingLabelText={<FormattedMessage {...messages.year} />}
            floatingLabelFixed
            onChange={this.onYearChange}
            fullWidth
          >
            <MenuItem value={null} primaryText={<FormattedMessage {...messages.empty} />} />
            {config.movie.discover.years.map((item) => (
              <MenuItem key={item} value={item} primaryText={`${item}`} />
            ))}
          </SelectField>
        </div>
        <div>
          <SelectField
            name="orderBy"
            value={query.get('orderBy')}
            floatingLabelText={<FormattedMessage {...messages.orderBy} />}
            floatingLabelFixed
            onChange={this.onOrderByChange}
            fullWidth
          >
            {config.movie.discover.orderBys.map((item) => (
              <MenuItem key={item} value={item} primaryText={<OrderBy name={item} />} />
            ))}
          </SelectField>
        </div>
        <div>
          <KeywordAutoComplete
            name="keyword"
            onNewRequest={this.onKeywordNewRequest}
            floatingLabelText={<FormattedMessage {...messages.keyword} />}
            floatingLabelFixed
            hintText={<FormattedMessage {...messages.searchPlaceholder} />}
            fullWidth
          />
        </div>
        <div>
          <GenreAutoComplete
            name="genre"
            onNewRequest={this.onGenreNewRequest}
            floatingLabelText={<FormattedMessage {...messages.genre} />}
            floatingLabelFixed
            hintText={<FormattedMessage {...messages.searchPlaceholder} />}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  query: ImmutablePropTypes.map.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default Filter;
