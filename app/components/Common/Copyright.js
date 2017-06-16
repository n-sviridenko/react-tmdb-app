import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import TmdbLogo from './TmdbLogo';

const messages = defineMessages({
  text: {
    id: 'app.components.common.copyright.text',
    defaultMessage: 'This product uses the TMDb API but is not endorsed or certified by TMDb.',
  },
});

function Copyright() {
  return (
    <div className="p-3 text-muted text-center">
      <div><FormattedMessage {...messages.text} /></div>
      <div className="mt-3">
        <TmdbLogo />
      </div>
    </div>
  );
}

export default Copyright;
