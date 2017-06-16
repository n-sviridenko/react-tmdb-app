import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  counter: {
    id: 'app.components.common.pager.counter',
    defaultMessage: 'Page {page} of {pageCount}',
  },
  next: {
    id: 'app.components.common.pager.next',
    defaultMessage: 'Next',
  },
  prev: {
    id: 'app.components.common.pager.prev',
    defaultMessage: 'Previous',
  },
});

class Pager extends React.PureComponent {
  onPrev = () => {
    this.props.onPageChange(this.props.page - 1);
  };

  onNext = () => {
    this.props.onPageChange(this.props.page + 1);
  };

  render() {
    const { page, pageCount } = this.props;

    return (
      <div className="d-flex align-items-end">
        <div className="mr-auto align-self-center">
          <FormattedMessage{...messages.counter} values={{ page, pageCount }} />
        </div>
        {page > 1 && (
          <RaisedButton
            label={<FormattedMessage {...messages.prev} />}
            onTouchTap={this.onPrev}
          />
        )}
        {page < pageCount && (
          <div className="ml-2">
            <RaisedButton
              label={<FormattedMessage {...messages.next} />}
              onTouchTap={this.onNext}
            />
          </div>
        )}
      </div>
    );
  }
}

Pager.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pager;
