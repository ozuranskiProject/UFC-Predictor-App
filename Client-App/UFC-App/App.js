import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import WeightClassSelector, { weightClasses } from './weight-class-picker';
import FighterSearch from './fighterSearch';
import fighters from './fighterService';
import calculateFight, { DEFAULT_WEIGHTS } from './calculateFight';

export default function App() {
  const [isReady, setIsReady] = useState(false); //use of true/false useState default automatically makes isReady hold boolean

  const [weightClassLabel, setWeightClassLabel] = useState("Women's Strawweight"); // label in state // preselect weight class

  const [fighterA, setFighterA] = useState(null);
  const [fighterB, setFighterB] = useState(null);
  const [result, setResult] = useState(null);

  const weightClassCode = useMemo(
    () => weightClasses.find(o => o.label === weightClassLabel)?.code ?? null,
    [weightClassLabel]
  );

  useEffect(() => {                     //useEffect is confusing me but from my understanding, it lets you run something once after the app loads,
    const SPLASH_DELAY = 2500;
                                        // without it happening again every time the screen updates or "rerenders"
    const timer = setTimeout(() => {  // setTimeout ({code to execute}, time to wait before doing so)
      setIsReady(true);                  
    }, SPLASH_DELAY); // 2.5 second splash delay
    return () => clearTimeout(timer); // cleanup on "unmount" aka get ridda dis shit when you done we dont need it
  }, []);

  // clear last result whenever the weight class changes
  useEffect(() => {
    setResult(null);
    // If you also want to clear the picks themselves, uncomment:
    setFighterA(null);
    setFighterB(null);
  }, [weightClassLabel]);

  const readyToFight = !!(fighterA && fighterB);

  

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
        <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode} onSelect={setFighterA}/>
        <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode} onSelect={setFighterB}/>
      </View>

      <Pressable
        onPress={() => {
          console.log('pressed fight', { 
          readyToFight, 
          fighterA: fighterA?.name, 
          fighterB: fighterB?.name 
        });
          if (!readyToFight) return;
          const r = calculateFight(fighterA, fighterB, DEFAULT_WEIGHTS);
          setResult(r);
        }}
        style={[styles.fightButton, !readyToFight && styles.fightButtonDisabled]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>FIGHT!</Text>
      </Pressable>

      {result && (
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Result</Text>
        <Text style={styles.resultText}>{fighterA?.name}: {result.percent1}%</Text>
        <Text style={styles.resultText}>{fighterB?.name}: {result.percent2}%</Text>
      </View>
      )}
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
  fightButton: {
    marginTop: 16,
    backgroundColor: '#e63946',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  fightButtonDisabled: {
    opacity: 0.4,
  },
  resultBox: {
    marginTop: 12,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
  },
});