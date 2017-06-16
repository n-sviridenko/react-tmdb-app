import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import LoadingTextOverlay from './LoadingTextOverlay';

describe('<LoadingTextOverlay />', () => {
  it('should render children if it is not loading and not erred', () => {
    const children = <div />;
    const component = shallow(<LoadingTextOverlay loading={false} error={null}>{children}</LoadingTextOverlay>);
    expect(component.contains(children)).toBe(true);
  });

  it('should render a loading message if loading', () => {
    const children = <div />;
    const component = shallow(<LoadingTextOverlay loading>{children}</LoadingTextOverlay>);
    expect(component.find(FormattedMessage).prop('id')).toBe('app.components.common.loading_text_overlay.loading');
    expect(component.contains(children)).toBe(false);
  });

  it('should render an error message if error', () => {
    const children = <div />;
    const component = shallow(<LoadingTextOverlay loading={false} error={new Error()}>{children}</LoadingTextOverlay>);
    expect(component.find(FormattedMessage).prop('id')).toBe('app.components.common.loading_text_overlay.undefined_error');
    expect(component.contains(children)).toBe(false);
  });
});
