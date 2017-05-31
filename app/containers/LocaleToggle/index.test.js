import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { shallow, mount } from 'enzyme';

import ConnectedLocaleToggle, { LocaleToggle } from './index';
import LanguageProvider from './../LanguageProvider';

import configureStore from './../../store';
import { translationMessages } from './../../i18n';

describe('<LocaleToggle />', () => {
  it('should dispatch changeLocale when called', () => {
    const setLocaleMock = jest.fn();
    const renderedComponent = shallow(<LocaleToggle setLocale={setLocaleMock} />);
    const locale = 'de';
    const event = { target: { value: locale } };

    renderedComponent.find('Toggle').prop('onToggle')(event);
    expect(setLocaleMock).toHaveBeenCalledWith(locale);
  });
});

describe('<ConnectedLocaleToggle />', () => {
  let store;
  let renderedComponent;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedLocaleToggle />
        </LanguageProvider>
      </Provider>
    );
  });

  it('should pass the default locale', () => {
    expect(renderedComponent.find('Toggle').prop('value')).toBe('en');
  });
});
