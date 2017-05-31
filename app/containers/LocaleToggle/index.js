/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setLocale } from 'store/actions/global';
import { getLocale } from 'store/reducers/global';
import Toggle from 'components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';

export class LocaleToggle extends React.PureComponent {
  onLocaleToggle = (event) => {
    this.props.setLocale(event.target.value);
  };

  render() {
    return (
      <Wrapper>
        <Toggle value={this.props.locale} values={appLocales} messages={messages} onToggle={this.onLocaleToggle} />
      </Wrapper>
    );
  }
}

LocaleToggle.propTypes = {
  setLocale: React.PropTypes.func,
  locale: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: getLocale,
});

const mapDispatchToProps = {
  setLocale,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
