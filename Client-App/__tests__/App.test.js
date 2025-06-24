import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; //imports needed to test functions //NOTE: "Render" used throughout means ~simulated~
import App from '../App';

describe('App counter', () => {   //"describe" equates to grouping related tests (a "suite"), so these two following tests are testing the counter function
  it('renders initial count as 0', () => {      //"it" starts and labels the individual test
    const { getByText } = render(<App />);       //"Look for text in the simulation of the App"
    expect(getByText('Count: 0')).toBeTruthy();  //"The test is passed if 'Count: 0' is found anywhere"
  });

  it('increments count when button is pressed', () => {
    const { getByText } = render(<App />);
    const button = getByText('Increase');       //}
                                                //}
    fireEvent.press(button);                    //}  >"Find the 'increase' button, then (pretend to) press it and if the text is 'Count: 1,' congrats"
                                                //} 
    expect(getByText('Count: 1')).toBeTruthy(); //}
  });
});