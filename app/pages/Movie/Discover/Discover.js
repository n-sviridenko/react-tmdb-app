import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ImageTuneIcon from 'material-ui/svg-icons/image/tune';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import { List } from 'immutable';

import { discoverRequest } from 'store/actions/movies';
import { getRoot } from 'store/reducers/movies/discover';
import { withWatcher } from 'hocs';
import { Container, Sidebar, LoadingOverlay, Pager } from 'components/Common';
import Filter from './Filter';
import FilterSelection from './FilterSelection';
import ResultList from './ResultList';

const messages = defineMessages({
  header: {
    id: 'app.pages.movie.discover.discover.header',
    defaultMessage: 'Discover movies',
  },
  filter: {
    id: 'app.pages.movie.discover.discover.filter',
    defaultMessage: 'Filter',
  },
});

export class Discover extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpened: false,
      filterOpened: false,
    };
  }

  onSidebarToggle = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  onSidebarRequestChange = (opened) => {
    this.setState({ sidebarOpened: opened });
  };

  onFilterOpen = () => {
    this.setState({ filterOpened: true });
  };

  onFilterToggle = () => {
    this.setState({ filterOpened: !this.state.filterOpened });
  };

  onFilterRequestChange = (opened) => {
    this.setState({ filterOpened: opened });
  };

  onReload = () => {
    this.props.discoverRequest(this.props.query);
  };

  onPageChange = (page) => {
    this.props.onQueryChange(this.props.query.set('page', page));
  };

  render() {
    const { query, onQueryChange, loader } = this.props;
    const movies = loader.get('items') || List();

    return (
      <div>
        <AppBar
          title={<FormattedMessage {...messages.header} />}
          onLeftIconButtonTouchTap={this.onSidebarToggle}
          iconElementRight={<IconButton><ImageTuneIcon /></IconButton>}
          onRightIconButtonTouchTap={this.onFilterToggle}
        />
        <Drawer docked={false} open={this.state.sidebarOpened} onRequestChange={this.onSidebarRequestChange}>
          <Sidebar />
        </Drawer>
        <Drawer openSecondary open={this.state.filterOpened} onRequestChange={this.onFilterRequestChange}>
          <AppBar
            title={<FormattedMessage {...messages.filter} />}
            iconElementLeft={<span />} // to remove it
            iconElementRight={<IconButton><NavigationCloseIcon /></IconButton>}
            onRightIconButtonTouchTap={this.onFilterToggle}
          />
          <Filter query={query} onQueryChange={onQueryChange} />
        </Drawer>
        <Container>
          <div className="mb-3">
            <FilterSelection query={query} onQueryChange={onQueryChange} onFilterToggleRequest={this.onFilterToggle} />
          </div>
          <LoadingOverlay loading={loader.get('loading')} error={loader.get('error')} onReload={this.onReload}>
            <ResultList movies={movies} />
          </LoadingOverlay>
          {loader.get('pageCount') > 1 && (
            <Pager page={query.get('page')} pageCount={loader.get('pageCount')} onPageChange={this.onPageChange} />
          )}
        </Container>
      </div>
    );
  }
}

Discover.propTypes = {
  loader: ImmutablePropTypes.map.isRequired,
  query: ImmutablePropTypes.map.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  discoverRequest: PropTypes.func.isRequired,
};

const EnhancedDiscover = withWatcher(
  (props) => props.query,
  (query, props) => props.discoverRequest(query),
)(Discover);

EnhancedDiscover.propTypes = {
  discoverRequest: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  loader: getRoot,
});

const mapDispatch = {
  discoverRequest,
};

export default connect(mapState, mapDispatch)(EnhancedDiscover);
