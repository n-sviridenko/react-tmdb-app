import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Result from './Result';

function ResultList({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.get('id')} className="mb-3">
          <Result movie={movie} />
        </div>
      ))}
    </div>
  );
}

ResultList.propTypes = {
  movies: ImmutablePropTypes.list.isRequired,
};

export default ResultList;
