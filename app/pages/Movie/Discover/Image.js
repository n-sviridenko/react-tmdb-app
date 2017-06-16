import React from 'react';
import PropTypes from 'prop-types';
import theMovieDb from 'themoviedb-javascript-library';

function Image({ size, file, ...props }) {
  const src = theMovieDb.common.getImage({ size, file });

  return <img src={src} alt={file} {...props} />;
}

Image.propTypes = {
  size: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default Image;
