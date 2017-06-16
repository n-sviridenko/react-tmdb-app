import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  loading: {
    id: 'app.components.common.loading_text_overlay.loading',
    defaultMessage: 'Loading..',
  },
  undefinedError: {
    id: 'app.components.common.loading_text_overlay.undefined_error',
    defaultMessage: 'Undefined error',
  },
});

function LoadingTextOverlay({ children, loading, error }) {
  if (loading) {
    return (
      <FormattedMessage {...messages.loading} />
    );
  }

  if (error) {
    return (
      <FormattedMessage {...messages.undefinedError} />
    );
  }

  return children;
}

LoadingTextOverlay.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
};

export default LoadingTextOverlay;
