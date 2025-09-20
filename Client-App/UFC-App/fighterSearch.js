import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Pressable, Image, Platform } from 'react-native';
import { searchFighters, getFighterByName } from './fighterService';

const PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

export default function FighterSearch({ weightClassCode, weightClassLabel, placeholder = 'Search fighter…', fighters = [], style, onSelect }) {

  const [query, setQuery] = useState('');

  const [showResults, setShowResults] = useState(false); 

  const [selectedFighter, setSelectedFighter] = useState(null);  

  const inputRef = useRef(null);

  const [active, setActive] = useState(false); // for styling input when active

  // whenever the weight class changes, clear query + selection + dropdown
  useEffect(() => {
    setQuery('');
    setShowResults(false);
    setSelectedFighter(null);
    onSelect?.(null); // tell parent this cleared
    
    // also blur the input and set active to false to reset styling
    inputRef.current?.blur?.(); 
    setActive(false); 
  }, [weightClassCode]); 

  // try not to recalculate results unless query or weightclass changes
  const results = useMemo(() => {
    if (!query.trim()) return []; 
    return searchFighters(query, weightClassLabel, 5); // 
  }, [query, weightClassLabel]); 

  // whenever the results change if there are no results hide the dropdown
  function handleChange(text) { 
    setQuery(text);
    setShowResults(!!text.trim()); 
    setActive(!!text.trim());        
    if (!text) setSelectedFighter(null);
  }

  // when user picks a fighter from the list
  function handlePick(fighter) {
    setQuery(fighter.name);       
    setShowResults(false);
    setSelectedFighter(fighter);         
    setActive(false);  
    onSelect?.(fighter);          
  }

  console.log('Selected weightclass:', { weightClassLabel }); // DEBUG

  return (
    <View style={[styles.wrap, style, active && styles.wrapActive]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={query}
        onChangeText={handleChange}            
        placeholder={placeholder}  // 'Search fighter…'
        autoCorrect={false}
        autoCapitalize="words"
        onFocus={() => setActive(!!query.trim())}               
        onBlur={() => !showResults && setActive(false)}        
        testID="fighter-search-input"
      />

      {showResults && results.length > 0 && (  
        <FlatList
          testID='suggestions'
          style={styles.dropdown}
          data={results} 
          keyExtractor={(item, i) => String(item.id ?? `${item.name}-${i}`)} // use id as key, if no id then just use their name
          keyboardShouldPersistTaps="handled"  // what to do with keyboard after interaction
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePick(item)} 
              style={styles.row}
              testID={`suggestion-${item.name}`}    
              >
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}

      {selectedFighter && (   
        <View style={styles.card}>
          <Image
            source={{ uri: selectedFighter.profile_url || PLACEHOLDER }} 
            style={styles.photo}
            resizeMode="contain"
            fadeDuration={0}   // Android-only ): disable cross-fade
            onError={() => setSelectedFighter(s => s ? { ...s, profile_url: PLACEHOLDER } : s)} 
            />                                                                             
          <Text style={styles.selectedName}>{selectedFighter.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    gap: 8,
    zIndex: 0, // drop down over profile pics
    position: 'relative',
    width: '100%',
  }, 
  wrapActive: {
    zIndex: 2000,                                            
    ...Platform.select({ android: { elevation: 20 } }),    
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10,
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    fontSize: 16,
  },
  row: { 
    width: '100%',                 // ensure row spans dropdown
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',      // <-- center horizontally
    alignItems: 'center',          // <-- center vertically
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600',
    textAlign: 'center',   // centers text inside the box
    width: '100%',         // make Text fill the whole row
  },
  photo: {
    width: 160,    // you can pick any size
    height: 160,
    borderRadius: 12, // optional, for rounded corners
  },
  card: { 
    marginTop: 12, 
    alignItems: 'center', 
    gap: 6 
  },
  selectedName: { 
    fontSize: 18, 
    fontWeight: '600' 
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,          // or width: '100%'
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    zIndex: 3000,                                             
    ...Platform.select({ android: { elevation: 24 } }),       
  },
}); 