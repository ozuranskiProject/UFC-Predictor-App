import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Platform } from 'react-native';
import WeightClassSelector, { weightClasses } from './weight-class-picker';
import FighterSearch from './fighterSearch';
import calculateFightResults, { DEFAULT_WEIGHTS } from './calculateFight';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [isReady, setIsReady] = useState(false); 

  const [weightClassLabel, setWeightClassLabel] = useState("Women's Strawweight"); // preselected weight class

  const [fighterA, setFighterA] = useState(null);
  const [fighterB, setFighterB] = useState(null);
  const [result, setResult] = useState(null);

  const weightClassCode = useMemo(
    () => weightClasses.find(o => o.label === weightClassLabel)?.code ?? null,
    [weightClassLabel]
  );

  // simulate loading time for splash screen
  useEffect(() => {                     
    const SPLASH_DELAY = 2500;
                                        
    const timer = setTimeout(() => { 
      setIsReady(true);                  
    }, SPLASH_DELAY); 
    return () => clearTimeout(timer);  
  }, []);

  // clear last result whenever the weight class changes
  useEffect(() => {
    setResult(null);
    setFighterA(null);
    setFighterB(null);
  }, [weightClassLabel]);

  const readyToFight = !!(fighterA && fighterB);

  //splash screen
  if (!isReady) {  
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>UFC App</Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  //main app UI
  return (
    <SafeAreaView style={styles.root} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <WeightClassSelector 
          selectedWCLabel={weightClassLabel}
          onSelectWC={setWeightClassLabel}
        />
        <Text style={styles.welcome}>Choose your matchup!!!</Text>

        <View style={styles.searchRow}>
          <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode} onSelect={setFighterA}/>
          <FighterSearch style={styles.searchBox} weightClassLabel={weightClassLabel} weightClassCode={weightClassCode} onSelect={setFighterB}/>
        </View>

        {result && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultText}>{fighterA?.name}: {result.percent1}%</Text>
            <Text style={styles.resultText}>{fighterB?.name}: {result.percent2}%</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}> 
        <Pressable
          onPress={() => {
            console.log('pressed fight', { 
              readyToFight, 
              fighterA: fighterA?.name, 
              fighterB: fighterB?.name 
            });
            if (!readyToFight) return;
            const r = calculateFightResults(fighterA, fighterB, DEFAULT_WEIGHTS);
            setResult(r);
          }}
          style={[styles.fightButton, !readyToFight && styles.fightButtonDisabled]}
          android_ripple={{ color: '#ffffff33' }} 
        >
          <Text style={styles.fightText}>FIGHT!</Text> 
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: 'white' 
  }, 
  content: {                                   
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 88, // keep content clear of the fixed footer
  },
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
    backgroundColor: '#e63946',
    borderRadius: 10,
    paddingVertical: 12,
  },
  fightText: {                  
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
  footer: {                     
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 72,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#ffffffff',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: -2 } },
      android: { elevation: 12 },
    }),
  },
});