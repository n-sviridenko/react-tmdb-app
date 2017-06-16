import React from 'react';
import PropTypes from 'prop-types';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import { listRequest } from 'store/actions/genres';
import { getRoot } from 'store/reducers/genres/list';
import { CleanableAutoComplete, AutoComplete } from 'components/Form';
import { withWatcher } from 'hocs';

const dataSourceConfig = {
  value: 'id',
  text: 'name',
};

function filter(searchText, key) {
  return searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
}

export function GenreAutoComplete({ dataSource, ...props }) {
  const restProps = omit(props, 'listRequest');

  return (
    <CleanableAutoComplete>
      <AutoComplete
        {...restProps}
        dataSource={dataSource || []}
        dataSourceConfig={dataSourceConfig}
        onDataSourceRequest={() => {}}
        filter={filter}
      />
    </CleanableAutoComplete>
  );
}

GenreAutoComplete.propTypes = {
  dataSource: PropTypes.array,
};

const EnhancedGenreAutoComplete = withWatcher(
  () => null,
  (data, props) => {
    if (!props.dataSource) {
      props.listRequest();
    }
  },
)(GenreAutoComplete);

EnhancedGenreAutoComplete.propTypes = {
  dataSource: PropTypes.array,
  listRequest: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  dataSource: createSelector(getRoot, (loader) => loader.get('data') ? loader.get('data').toJS() : null),
});

const mapDispatch = {
  listRequest,
};

export default connect(mapState, mapDispatch)(EnhancedGenreAutoComplete);
