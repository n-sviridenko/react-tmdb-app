import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { listRequest } from 'store/actions/genres';
import { getRoot } from 'store/reducers/genres/list';
import { withPreloader } from 'hocs';
import { LoadingTextOverlay } from 'components/Common';

export function Genre({ id, loader }) {
  const genre = loader.get('data').find((item) => item.get('id') === id);

  return <span>{genre ? genre.get('name') : '-'}</span>;
}

Genre.propTypes = {
  id: PropTypes.number.isRequired,
  loader: ImmutablePropTypes.map.isRequired,
};

const EnhancedGenre = withPreloader(
  () => null,
  (data, props) => {
    if (!props.loader || props.loader.get('error')) {
      props.listRequest();
    }
  },
  { overlayBuilder: (props) => <LoadingTextOverlay {...props} loadInBackground /> },
)(Genre);

EnhancedGenre.propTypes = {
  loader: ImmutablePropTypes.map,
  listRequest: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  loader: getRoot,
});

const mapDispatch = {
  listRequest,
};

export default connect(mapState, mapDispatch)(EnhancedGenre);
