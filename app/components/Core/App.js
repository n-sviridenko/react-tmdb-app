/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

import { Copyright } from 'components/Common';

function App(props) {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Movie search app"
        defaultTitle="Movie search app"
        meta={[
          { name: 'description', content: 'Movie search app' },
        ]}
      />
      {React.Children.toArray(props.children)}
      <Copyright />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
