import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
 
// Mock fixed fighter list so tests don’t depend on the real fighters-index.json,
// which can change over time. This guarantees stable, predictable test data for testing purposes.
jest.mock('../fighters-index.json', () => ([
  { id: 1, name: 'Jon Jones' },
  { id: 2, name: 'Alex Pereira' },
  { id: 3, name: 'Alexa Grasso' }
]), { virtual: true }); //work even if the file being mocked doesn't exist

jest.mock('../fighterService', () => {
  const pool = [
    { id: 1, name: 'Jon Jones', profile_url: '' },
    { id: 2, name: 'Alex Pereira', profile_url: '' },
    { id: 3, name: 'Alexa Grasso', profile_url: '' }
  ];
  return {
    getAllFighters: () => pool,
    searchFighters: (q, limit = 5) => {
      const s = (q ?? '').trim().toLowerCase(); 
      if (!s) return []; 
      return pool.filter(p => p.name.toLowerCase().includes(s)).slice(0, limit); 
    },
    getFighterByName: (name) =>
      pool.find(p => p.name.toLowerCase() === (name ?? '').toLowerCase()) ?? null
  };
});

import { getAllFighters, searchFighters, getFighterByName } from '../fighterService';
import FighterSearch from '../fighterSearch';
import WeightClassSelector from '../weight-class-picker';

// fighterService
describe('fighterService', () => {
  test('getAllFighters returns array with items', () => {
    const all = getAllFighters();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  test('searchFighters trims and filters (case-insensitive)', () => {
    expect(searchFighters('  al ').map(x => x.name))  
      .toEqual(expect.arrayContaining(['Alex Pereira', 'Alexa Grasso'])); 
    expect(searchFighters('   ')).toEqual([]); 
  });

  test('getFighterByName exact (case-insensitive)', () => {
    expect(getFighterByName('jon jones')?.id).toBe(1); 
    expect(getFighterByName('nobody')).toBeNull(); 
  });
});

// FighterSearch
describe('FighterSearch component', () => {
  test('typing shows suggestions', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FighterSearch placeholder="Search fighter…" />);
    fireEvent.changeText(getByPlaceholderText('Search fighter…'), 'al');
    await waitFor(() => getByTestId('suggestions')); 
  });

  test('picking a suggestion fills input and hides list', async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId, getByText } = render(<FighterSearch />);
    const input = getByPlaceholderText('Search fighter…');
    fireEvent.changeText(input, 'alex');
    await waitFor(() => getByTestId('suggestions'));
    fireEvent.press(getByTestId('suggestion-Alex Pereira'));
    expect(input.props.value).toBe('Alex Pereira');
    expect(queryByTestId('suggestions')).toBeNull();
    await waitFor(() => getByText('Alex Pereira')); 
  });
});

//weightClassSelector
describe('WeightClassSelector component', () => {
  test('renders a button in the scroll that can be pressed', () => {
    const { getByTestId } = render(
      <WeightClassSelector selectedLabel={"Flyweight"} onSelect={() => {}} />
    );
    expect(getByTestId('weight-FLW')).toBeTruthy();
  });

  test('pressing a button in list calls onSelect with its label', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <WeightClassSelector selectedLabel={"Flyweight"} onSelect={onSelect} />
    );
    fireEvent.press(getByTestId('weight-WW'));
    expect(onSelect).toHaveBeenCalledWith('Welterweight');
  });
});


