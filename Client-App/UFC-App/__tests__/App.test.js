import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

//creating mock data and functions so tests run faster without having to sift through hundereds of thousands of lines of code and 
// will work (as data) no matter what even as the real data set changes in the future. this one is static
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
      const s = (q ?? '').trim().toLowerCase(); // lowercase and trim. (q ?? '') basically just if null then use ''
      if (!s) return []; //if s doesnt exist then return nothing
      return pool.filter(p => p.name.toLowerCase().includes(s)).slice(0, limit); //giv epool back but filtered down based on query
    },
    getFighterByName: (name) =>
      pool.find(p => p.name.toLowerCase() === (name ?? '').toLowerCase()) ?? null
  };
});

import { getAllFighters, searchFighters, getFighterByName } from '../fighterService';
import FighterSearch from '../fighterSearch';
import WeightClassSelector from '../weight-class-picker';


//tests

// fighterService
describe('fighterService', () => {
  test('getAllFighters returns array with items', () => {
    const all = getAllFighters();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  test('searchFighters trims and filters (case-insensitive)', () => {
    expect(searchFighters('  al ').map(x => x.name)) //testing al with spaces to hopefully get the appropriate results vvv
      .toEqual(expect.arrayContaining(['Alex Pereira', 'Alexa Grasso']));
    expect(searchFighters('   ')).toEqual([]); // testing nothing to hopefully get nothing
  });

  test('getFighterByName exact (case-insensitive)', () => {
    expect(getFighterByName('jon jones')?.id).toBe(1); //get correct id for given fighter
    expect(getFighterByName('nobody')).toBeNull(); //ensure fake names dont return anything
  });
});

// FighterSearch
describe('FighterSearch component', () => {
  test('typing shows suggestions', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FighterSearch placeholder="Search fighter…" />);
    fireEvent.changeText(getByPlaceholderText('Search fighter…'), 'al');
    await waitFor(() => getByTestId('suggestions')); // list appears since 'al' should return two valid fighters
  });

  test('picking a suggestion fills input and hides list', async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId, getByText } = render(<FighterSearch />);
    const input = getByPlaceholderText('Search fighter…');
    fireEvent.changeText(input, 'alex');
    await waitFor(() => getByTestId('suggestions'));
    fireEvent.press(getByTestId('suggestion-Alex Pereira'));
    expect(input.props.value).toBe('Alex Pereira');
    expect(queryByTestId('suggestions')).toBeNull();
    await waitFor(() => getByText('Alex Pereira')); // selected card shows
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


