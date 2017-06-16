import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { showRequest } from 'store/actions/keywords';
import { makeGetById } from 'store/reducers/keywords/show';
import { withPreloader } from 'hocs';
import { LoadingTextOverlay } from 'components/Common';

export function Keyword({ loader }) {
  const keyword = loader.get('data');

  return <span>{keyword.get('name')}</span>;
}

Keyword.propTypes = {
  loader: ImmutablePropTypes.map.isRequired,
};

const EnhancedKeyword = withPreloader(
  (props) => props.id,
  (id, props) => {
    if (!props.loader || props.loader.get('error')) {
      props.showRequest(id);
    }
  },
  { overlayBuilder: (props) => <LoadingTextOverlay {...props} loadInBackground /> },
)(Keyword);

EnhancedKeyword.propTypes = {
  id: PropTypes.number.isRequired,
  loader: ImmutablePropTypes.map,
  showRequest: PropTypes.func.isRequired,
};

const mapState = (state, { id }) => createStructuredSelector({
  loader: makeGetById(id),
});

const mapDispatch = {
  showRequest,
};

export default connect(mapState, mapDispatch)(EnhancedKeyword);
