import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Pressable } from 'react-native';

import { searchFighters } from './fighterService';

export default function FighterSearch({ placeholder = 'Search fighter…', fighters = [] }) {
  const [query, setQuery] = useState('');

  const results = searchFighters(query); // limit defaults to 5

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="words"
        testID="fighter-search-input"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         <Pressable style={styles.row}>
           <Text style={styles.name}>{item.name}</Text>
         </Pressable>
       )}
     />
    </View>
  );
}

// no function for buttons yet that will come soon

const styles = StyleSheet.create({
  wrap: { }, //for the sake of having a container
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10,
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    fontSize: 16,
  },
  row: { 
    paddingVertical: 10, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderBottomColor: '#ddd' 
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
}); 