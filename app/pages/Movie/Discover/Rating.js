import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import Chip from 'material-ui/Chip';

const maxRating = 10;

function Rating({ value }) {
  const rate = value / maxRating;

  let color = [255 * (1 - rate), 255 * rate, 0];
  color = color.map((item) => parseInt(item, 10)).join(',');

  return (
    <Chip style={{ backgroundColor: `rgb(${color})` }}>
      <FormattedNumber value={value} minimumFractionDigits={1} />
    </Chip>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Rating;
