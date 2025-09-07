import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import WeightClassSelector, { weightClasses } from './weight-class-picker';
import FighterSearch from './fighterSearch';
import fighters from './fighterService';

export default function App() {
  const [isReady, setIsReady] = useState(false); //use of true/false useState default automatically makes isReady hold boolean

  const [weightClassLabel, setWeightClassLabel] = useState("Women's Strawweight"); // label in state // preselect weight class

  const weightClassCode = useMemo(
    () => weightClasses.find(o => o.label === weightClassLabel)?.code ?? null,
    [weightClassLabel]
  );

  useEffect(() => {                     //useEffect is confusing me but from my understanding, it lets you run something once after the app loads,
                                        // without it happening again every time the screen updates or "rerenders"
    const timer = setTimeout(() => {  // setTimeout ({code to execute}, time to wait before doing so)
      setIsReady(true);                  
    }, 2500); // 2.5 second splash delay

    return () => clearTimeout(timer); // cleanup on "unmount" aka get ridda dis shit when you done we dont need it
  }, []);

  if (!isReady) {  //while setTimeout is still riding its delay, this will run as in the useState statement, isReady is set to false
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>UFC App</Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeightClassSelector 
        selectedLabel={weightClassLabel}
        onSelect={setWeightClassLabel}
      />
      <Text style={styles.welcome}>Choose your matchup!!!</Text>

      <View style={styles.searchRow}>
        <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode}/>
        <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode}/>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 50, // optional: push content below status bar
    paddingHorizontal: 20,
  },
  searchRow: {                 
    flexDirection: 'row',      // put side by side
    gap: 20,                   // space between them 
    justifyContent: 'center',
    alignItems: 'flex-start',  // keep them aligned at the top
  },
  searchBox: {
    width: 140,          // <- lock the width as parent, children should just use a percentage of this container
  },
  welcome: {
    fontSize: 12,             // make it bigger
    fontWeight: 'bold',       // bold text
    color: '#e63946',         // red text (pick any hex/rgb color)
    justifyContent: 'center',         // spacing below the text
    alignItems: 'center',
  },
});