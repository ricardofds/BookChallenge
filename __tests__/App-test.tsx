/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/';

import { render, screen } from '@testing-library/react-native';

it('renders correctly', () => {
  render(<App />);

  expect(screen.toJSON()).toMatchSnapshot();
});
