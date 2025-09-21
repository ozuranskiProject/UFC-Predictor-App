import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Pressable, Image, Platform } from 'react-native';
import { searchFighters, getFighterByName } from './fighterService';

const PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

export default function FighterSearch({ weightClassCode, weightClassLabel, placeholder = 'Search fighter…', fighters = [], style, onSelect }) {

  const [fighterQuery, setFighterQuery] = useState('');

  const [showResults, setShowResults] = useState(false); 

  const [selectedFighter, setSelectedFighter] = useState(null);  

  const inputRef = useRef(null);

  const [inputActive, setInputActive] = useState(false); 

  // whenever the weight class changes, clear query + selection + dropdown
  useEffect(() => {
    setFighterQuery('');
    setShowResults(false);
    setSelectedFighter(null);
    onSelect?.(null); // tell parent this cleared
    
    // also blur the input and set active to false to reset styling
    inputRef.current?.blur?.(); 
    setInputActive(false); 
  }, [weightClassCode]); 

  // try not to recalculate results unless query or weightclass changes
  const results = useMemo(() => {
    if (!fighterQuery.trim()) return []; 
    return searchFighters(fighterQuery, weightClassLabel, 5); // 
  }, [fighterQuery, weightClassLabel]); 

  // whenever the results change if there are no results hide the dropdown
  function handleResultsChange(text) { 
    setFighterQuery(text);
    setShowResults(!!text.trim()); // hide dropdown if empty
    setInputActive(!!text.trim());        
    if (!text) setSelectedFighter(null);
  }

  function chooseFighter(fighter) {
    setFighterQuery(fighter.name);       
    setShowResults(false);
    setSelectedFighter(fighter);         
    setInputActive(false);  
    onSelect?.(fighter);          
  }

  console.log('Selected weightclass:', { weightClassLabel }); // DEBUG

  return (
    <View style={[styles.wrap, style, inputActive && styles.wrapActive]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={fighterQuery}
        onChangeText={handleResultsChange}            
        placeholder={placeholder}  // 'Search fighter…'
        autoCorrect={false}
        autoCapitalize="words"
        onFocus={() => setInputActive(!!fighterQuery.trim())}               
        onBlur={() => !showResults && setInputActive(false)}        
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
              onPress={() => chooseFighter(item)} 
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
            resizeMode="contain" //contain so it doesn't get cropped
            fadeDuration={0}   // disable cross-fade (android only) I personally think it looks cleaner rather than default fade
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