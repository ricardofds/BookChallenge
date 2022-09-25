/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MockedNavigator from './mock/MockedNavigator';

it('renders correctly', () => {
  renderer.create(<MockedNavigator component={App} />);
});
