import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Chip from 'material-ui/Chip';
import memoize from 'lodash/memoize';
import { defineMessages, FormattedMessage } from 'react-intl';

import Keyword from './Keyword';
import Genre from './Genre';

const messages = defineMessages({
  openFilter: {
    id: 'app.pages.movie.discover.filter_selection.open_filter',
    defaultMessage: 'Manage filters',
  },
});

class FilterSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.makeOnKeywordRequestDelete = memoize((id) => () => this.onKeywordRequestDelete(id));
    this.makeOnGenreRequestDelete = memoize((id) => () => this.onGenreRequestDelete(id));
  }

  onKeywordRequestDelete = (id) => {
    this.updateQueryParam('keywords', (keywords) => keywords.filter((item) => item !== id));
  };

  onGenreRequestDelete = (id) => {
    this.updateQueryParam('genres', (genres) => genres.filter((item) => item !== id));
  };

  onYearRequestDelete = () => {
    this.setQueryParam('year', null);
  };

  setQueryParam(key, value) {
    const { query, onQueryChange } = this.props;

    onQueryChange(query.set(key, value));
  }

  updateQueryParam(key, modifier) {
    this.setQueryParam(key, modifier(this.props.query.get(key)));
  }

  render() {
    const { query, onFilterToggleRequest } = this.props;

    return (
      <div className="d-flex flex-wrap">
        {query.get('keywords').map((id) => (
          <div key={id} className="mr-1 mb-1">
            <Chip onRequestDelete={this.makeOnKeywordRequestDelete(id)}>
              <Keyword id={id} />
            </Chip>
          </div>
        ))}
        {query.get('genres').map((id) => (
          <div key={id} className="mr-1 mb-1">
            <Chip onRequestDelete={this.makeOnGenreRequestDelete(id)}>
              <Genre id={id} />
            </Chip>
          </div>
        ))}
        {query.get('year') && (
          <div className="mr-1 mb-1">
            <Chip onRequestDelete={this.onYearRequestDelete}>
              {query.get('year')}
            </Chip>
          </div>
        )}
        <div className="mr-1 mb-1">
          <Chip onTouchTap={onFilterToggleRequest}>
            <FormattedMessage {...messages.openFilter} />
          </Chip>
        </div>
      </div>
    );
  }
}

FilterSelection.propTypes = {
  query: ImmutablePropTypes.map.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onFilterToggleRequest: PropTypes.func.isRequired,
};

export default FilterSelection;
