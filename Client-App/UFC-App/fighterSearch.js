import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Pressable, Image } from 'react-native';
import { searchFighters, getFighterByName } from './fighterService';

const PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

export default function FighterSearch({ weightClassCode, weightClassLabel, placeholder = 'Search fighter…', fighters = [], style, onSelect }) {
  const [query, setQuery] = useState('');

  const [showResults, setShowResults] = useState(false); // for setting whether or not to show flatlist seuggestions dropdown

  const [selected, setSelected] = useState(null); // for storing actual chosen/selected fighter object 

  const inputRef = useRef(null);

  // whenever the weight class changes, clear query + selection + dropdown
  useEffect(() => {
    setQuery('');
    setShowResults(false);
    setSelected(null);
    onSelect?.(null); // tell parent we cleared
    // optional UX nicety:
    inputRef.current?.blur?.();
  }, [weightClassCode]); // or [weightClassLabel]

  const results = useMemo(() => {
    if (!query.trim()) return []; //.trim is needed so that this applies for spaces too
    return searchFighters(query, weightClassLabel, 10); // 
  }, [query, weightClassLabel]); //dependencies for useMemo so that results ONLY rerenders/runs when they change

  function handleChange(text) { // idk if this is actually needed yet because of searchfighters but ill play with it for now
    setQuery(text);
    setShowResults(!!text.trim());
    if (!text) setSelected(null);
  }

  function handlePick(fighter) {
    setQuery(fighter.name);       // autocomplete the input with the fighter’s name
    setShowResults(false);
    setSelected(fighter);         // store the object we already have
    onSelect?.(fighter);          // pass it directly to App
  }

  console.log('Selected weightclass:', { weightClassLabel }); //ugh debugging undefined issue

  return (
    <View style={[styles.wrap, style]}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleChange}            
        placeholder={placeholder}  //should I just remove this it doesnt need to be a prop
        autoCorrect={false}
        autoCapitalize="words"
        testID="fighter-search-input"
      />

      {showResults && results.length > 0 && (  // flatlist now only appears if there are results to show!!!
        <FlatList
          testID='suggestions'
          style={styles.dropdown}
          data={results} //filtered fighter data set (filtered by query)
          keyExtractor={(item, i) => String(item.id ?? `${item.name}-${i}`)} // use id as key, if no id then just use their name
          keyboardShouldPersistTaps="handled"  // what to do with keyboard after interaction
          renderItem={({ item }) => ( // vv render fighter object as button vv
            <Pressable
              onPress={() => handlePick(item)} //item.name 
              style={styles.row}
              testID={`suggestion-${item.name}`}    
              >
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}

      {selected && (   //selected fighter card that only appears if there has been a valid selection
        <View style={styles.card}>
          <Image
            // use `profile_url` directly. fallback if missing
            source={{ uri: selected.profile_url || PLACEHOLDER }} //where to take from, uri for internet image, use placeholder if you cant find an image
            style={styles.photo}
            resizeMode="contain"
            fadeDuration={0}   // Android-only ): disable cross-fade
            onError={() => setSelected(s => s ? { ...s, profile_url: PLACEHOLDER } : s)} //'=>' makes it so s is understood as previous. the statement basically says, if you can return to the last picture on error then do so but if you cant then just use the placeholder fallback
            />                                                                             
          <Text style={styles.selectedName}>{selected.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { //for the sake of having a container
    gap: 8,
    position: 'relative',
    width: '100%',
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
  },
}); 