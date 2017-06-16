import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import BaseAutoComplete from 'material-ui/AutoComplete';

class AutoComplete extends React.Component {
  componentWillMount() {
    if (this.props.debounceDelay) {
      this.callDataSourceHandler = debounce(this.callDataSourceHandler, this.props.debounceDelay);
    }
  }

  onUpdateInput = (query) => {
    if (this.props.onUpdateInput) {
      this.props.onUpdateInput(query);
    }

    this.callDataSourceHandler(query);
  };

  callDataSourceHandler(query) {
    this.props.onDataSourceRequest(query.trim());
  }

  render() {
    const props = omit(this.props, 'debounceDelay', 'onDataSourceRequest', 'onUpdateInput');

    return <BaseAutoComplete onUpdateInput={this.onUpdateInput} filter={() => true} {...props} />;
  }
}

AutoComplete.propTypes = {
  debounceDelay: PropTypes.number,
  onDataSourceRequest: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func,
};

AutoComplete.defaultProps = {
  debounceDelay: 500,
};

export default AutoComplete;
