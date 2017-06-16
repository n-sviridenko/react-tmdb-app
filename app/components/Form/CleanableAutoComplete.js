import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

class CleanableAutoComplete extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  onUpdateInput = (searchText) => {
    this.setState({ searchText });
  };

  onNewRequest = (input, index) => {
    if (index === -1) {
      return;
    }

    this.setState({ searchText: '' });

    const onNewRequest = this.props.children.props.onNewRequest;

    if (onNewRequest) {
      onNewRequest(input, index);
    }
  };

  onKeyDown = (event) => {
    // do not submit the form if autocomplete was not empty
    if (this.state.searchText.trim() !== '' && keycode(event) === 'enter') {
      event.preventDefault();
    }
  };

  render() {
    return React.cloneElement(this.props.children, {
      searchText: this.state.searchText,
      onUpdateInput: this.onUpdateInput,
      onNewRequest: this.onNewRequest,
      onKeyDown: this.onKeyDown,
    });
  }
}

CleanableAutoComplete.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CleanableAutoComplete;
