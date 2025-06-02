import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders default greeting', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('greeting').props.children.join('')).toBe('Hello, World!');
  });

  it('renders custom name in greeting', () => {
    const { getByTestId } = render(<App name="Cooper" />);
    expect(getByTestId('greeting').props.children.join('')).toBe('Hello, Cooper!');
  });
});
