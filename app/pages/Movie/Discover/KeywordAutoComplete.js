import React from 'react';
import PropTypes from 'prop-types';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import flowRight from 'lodash/flowRight';
import omit from 'lodash/omit';

import { searchRequest } from 'store/actions/keywords';
import { makeGetByQuery } from 'store/reducers/keywords/search';
import { CleanableAutoComplete, AutoComplete } from 'components/Form';
import { withWatcher } from 'hocs';

const dataSourceConfig = {
  value: 'id',
  text: 'name',
};

export function KeywordAutoComplete({ dataSource, setQuery, ...props }) {
  const restProps = omit(props, 'query', 'searchRequest');

  return (
    <CleanableAutoComplete>
      <AutoComplete
        {...restProps}
        dataSource={dataSource || []}
        dataSourceConfig={dataSourceConfig}
        onDataSourceRequest={setQuery}
      />
    </CleanableAutoComplete>
  );
}

KeywordAutoComplete.propTypes = {
  dataSource: PropTypes.array,
  setQuery: PropTypes.func.isRequired,
};

const EnhancedKeywordAutoComplete = withWatcher(
  (props) => props.query,
  (query, props) => {
    if (query && !props.dataSource) {
      props.searchRequest(query);
    }
  },
)(KeywordAutoComplete);

EnhancedKeywordAutoComplete.propTypes = {
  query: PropTypes.string,
  dataSource: PropTypes.array,
  searchRequest: PropTypes.func.isRequired,
};

const mapState = (state, { query }) => createStructuredSelector({
  dataSource: createSelector(makeGetByQuery(query), (loader) => loader ? loader.get('items').toJS() : null),
})(state);

const mapDispatch = {
  searchRequest,
};

export default flowRight([
  withState('query', 'setQuery'),
  connect(mapState, mapDispatch),
])(EnhancedKeywordAutoComplete);
