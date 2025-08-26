import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'; //imports needed to test functions //NOTE: "Render" used throughout means ~simulated~
import App from '../App';


describe('App counter', () => {   //"describe" equates to grouping related tests (a "suite"), so these two following tests are testing the counter function
  /*
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
  */

  it('renders the app with initial UI', () => {
    const { getByText, getByTestId } = render(<App />);  //check everything is in place on startup
    expect(getByText('Total Count: 0')).toBeTruthy();
    expect(getByText('Counter A')).toBeTruthy();
    expect(getByText('Counter B')).toBeTruthy();
    expect(getByText('Reset')).toBeTruthy();

    expect(getByTestId('increment-A-label').props.children.join('')).toBe('Count: 0'); //following use testIDs to distinguish repeated components
    expect(getByTestId('increment-B-label').props.children.join('')).toBe('Count: 0');
    
    expect(getByTestId('increment-A')).toBeTruthy();
    expect(getByTestId('increment-B')).toBeTruthy();
  });

  it('increments Counter A and updates total count', () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.press(getByTestId('increment-A'));
    expect(getByText('Total Count: 1')).toBeTruthy();
  });

  it('increments Counter B and updates total count', () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.press(getByTestId('increment-B'));
    expect(getByText('Total Count: 1')).toBeTruthy();
  });

    it('resets both counters when Reset is pressed', async () => {
      const { getByTestId, getByText } = render(<App />);
      
      fireEvent.press(getByTestId('increment-A'));
      fireEvent.press(getByTestId('increment-B'));
      expect(getByText('Total Count: 2')).toBeTruthy();

      fireEvent.press(getByText('Reset'));

      await waitFor(() => {
        expect(getByText('Total Count: 0')).toBeTruthy();
    });
  });
});

describe('Dropdown stats', () => {
  it('shows default stats when no fighter is selected', async () => { //just learned about async, await, and waitFor. Helps test properly with any possible lag or delay. should implement always
    const { getByText } = render(<App />);
    
    // These default values should show up before any selection
    expect(getByText('Wins: -')).toBeTruthy();
    expect(getByText('Losses: -')).toBeTruthy();
    expect(getByText('Draws: -')).toBeTruthy();
  });
});


