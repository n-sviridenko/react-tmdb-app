import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import getYear from 'date-fns/get_year';

import Image from './Image';
import Rating from './Rating';
import Genre from './Genre';

function getStyles() {
  return {
    description: {
      fontSize: '0.85rem',
    },
  };
}

function Result({ movie }) {
  const styles = getStyles();

  return (
    <Card>
      <div className="p-3">
        <div className="d-sm-table">
          {!!movie.get('poster_path') && (
            <div className="d-sm-table-cell align-top text-center text-sm-left pr-sm-3 pb-3 pb-sm-0">
              <Image file={movie.get('poster_path')} size="w185_and_h278_bestv2" />
            </div>
          )}
          <div className="d-sm-table-cell align-top">
            <h3>{movie.get('title')} ({getYear(movie.get('release_date'))})</h3>
            <div style={styles.description}>{movie.get('overview')}</div>
            {movie.get('vote_average') > 0 && movie.get('genre_ids').size > 0 && (
              <div className="d-flex flex-wrap mt-3">
                {movie.get('vote_average') > 0 && (
                  <div className="mb-1 mr-1">
                    <Rating value={movie.get('vote_average')} />
                  </div>
                )}
                {movie.get('genre_ids').map((item) => (
                  <div key={item} className="mb-1 mr-1">
                    <Chip><Genre id={item} /></Chip>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

Result.propTypes = {
  movie: ImmutablePropTypes.map.isRequired,
};

export default Result;
