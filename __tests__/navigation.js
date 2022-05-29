import 'react-native';
import React from 'react';
import Screen from '../App';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Screen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});