import React, { useState, useRef, useEffect } from 'react'; //import react for JSX and UI components and logic 
import { Button, Animated, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components 
import Counter from './Counter';
import RNPickerSelect from 'react-native-picker-select';
import { getFighterStats } from './fighterService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {    //basically just "put this file on my app; it is the app itself really" 
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const [loading, setLoading] = useState(false);

  const resetCounters = () => {
    setCountA(0);
    setCountB(0);
  };

  const scaleAnim = useRef(new Animated.Value(1)).current; //idk wtf this means its 3am but i think animating a button will be cool (famous last words!) ^-^

  const animateResetButton = () => {
    resetCounters();                      //RESET FIRST SO TESTS RUN CLEANLY!!!! THIS SHOULD GO FOR ANY ANIMATION LINKED TO AN ACTION OR FUNCTION CALL!!!
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(); 
  };

  const [selectedFighter, setSelectedFighter] = useState(null);   //create state for fighter selection
  const [fighterStats, setFighterStats] = useState(null);    //create state for stats

  const fighterOptions = [                                        //fighter list for dropdown (external)
    { label: 'Charles Oliveira', value: 'Charles Oliveira' },
    { label: 'Ilia Topuria', value: 'Ilia Topuria' },
    { label: 'Amanda Nunes', value: 'Amanda Nunes' },
  ];

  useEffect(() => {                                //load fighter on startup
    const loadSavedFighter = async () => {
    const savedName = await AsyncStorage.getItem('selectedFighter');
    if (savedName) {
      setSelectedFighter(savedName);
      setFighterStats(getFighterStats(savedName));
    }
  };

  loadSavedFighter();
}, []);

  return (
    <SafeAreaView style={styles.screenBackground}>
      <View style={styles.appContainer}>
        <Text style={styles.title}>Total Count: {countA + countB}</Text>

        {/* Drop Down */}
        <View style={styles.ddContainer}>
          <View style={styles.fighterInfo}>
          <Text style={styles.label}>Select a fighter:</Text>

          <RNPickerSelect
            value={selectedFighter} //keep dropdown synced
            //testID="fighter-picker"
            onValueChange={async (value) => {
              setSelectedFighter(value);

              if (value) {
                setLoading(true);                                    // start "loading" (display "loading") until stats are set (important when pulling from elsewhere later)
                setFighterStats(null);                     // visually get rid of current stats
                
                await AsyncStorage.setItem('selectedFighter', value);  // save updated fighter to storage

                const stats = getFighterStats(value);       //get stats of new fighter
                setFighterStats(stats);               //update stats to be current
                setLoading(false);                 //stop "loading" now that stats have been updated
              } else {
                setFighterStats(null);            //empty out stats because none exist!
                await AsyncStorage.removeItem('selectedFighter');  // clear storage?!
              }
            }}
            items={fighterOptions}
            placeholder={{ label: 'Choose one...', value: null }}
            style={{
              inputIOS: {
                height: 50, 
                width: 250, 
                fontSize: 16,
                paddingHorizontal: 12,
                borderWidth: 2,
                borderColor: '#888',
                borderRadius: 10,
                color: 'white',
                backgroundColor: '#222',
              },
              inputAndroid: {
                height: 50,
                width: 250,
                fontSize: 16,
                paddingHorizontal: 12,
                borderWidth: 2,
                borderColor: '#888',
                borderRadius: 10,
                color: 'white',
                backgroundColor: '#222',
              },
            }}
            />
            <View style={styles.statsBox}>
              {loading ? (
                <Text style={styles.result}>Loading...</Text>
              ) : fighterStats ? (
                <>
                  <Text style={styles.result}>Wins: {fighterStats.wins}</Text>
                  <Text style={styles.result}>Losses: {fighterStats.losses}</Text>
                  <Text style={styles.result}>Draws: {fighterStats.draws}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.result}>Wins: -</Text>
                  <Text style={styles.result}>Losses: -</Text>
                  <Text style={styles.result}>Draws: -</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.counterRow}>
          {/* First Counter */}
          <View style={styles.counterBox}>
            <Text style={styles.counterN}>Counter A</Text>
            <Counter internalCount={countA} onValueChange={setCountA} testID={"increment-A"}/>
          </View>

          {/* Second Counter */}
          <View style={styles.counterBox}>
            <Text style={styles.counterN}>Counter B</Text>
            <Counter internalCount={countB} onValueChange={setCountB} testID={"increment-B"}/>
          </View>
        </View>
        
        <View style={styles.bottomArea}>
        {/* Reset Button */}
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable onPress={animateResetButton} hitSlop={25}>
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

//so we need this setup to be this way because each counter can only access info within itself. You can make 
//countera.js and counterb.js but thats doubling code and inefficient. so instead, since one counter wouldnt 
// pull code for another instance of its code into itself because they are both the same child file, you need 
// to let them send their info to the parent so their work can be done here.

// !!!!!
//THAT IS TO SAY, CounterA and CounterB are not two seperate accessible places, they are just two different uses of the same tool
//or component so to use two seperate counts we cant have it so that any count made by a use of Counter sends its count to the Parent file, so
//it can all be used together there


//Safe area view is kinda like a space that is everything but certain phone features like a home button or status bar, good practice

//The reset makes shit more complicated because individual counts are only accessible within the private child file/component. So I had to make a setup that allows 
//the parent to reach into the child and reset those values on button press via another prop



const styles = StyleSheet.create({  //IMPORTANT: IMPORTED FILES WITH CONTAINERS NEED CONTAINERS (like this) FOR THEIR CONTAINERS
  counterN: {
    fontSize: 20, 
    marginBottom: 20, 
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    color: '#867899',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#000f14',
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 50,
  },
  title: { 
    fontSize: 33, 
    marginBottom: 20, 
    fontFamily: 'serif',
    color: '#363b51',
    textShadowColor: 'cyan',      // glow color
    textShadowOffset: { width: 0, height: 0 }, // centered
    textShadowRadius: 10,         // bigger = more blur
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20, // spacing between counters (if your RN version supports it)
    marginTop: 20,
    marginBottom: 20,
  },
  counterBox: {
    height: 200,
    width: 150, // narrower now since they’re side-by-side
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#12113d',
    borderRadius: 15,
    backgroundColor: '#363b51',
  },
  screenBackground: {
    flex: 1,
    backgroundColor: '#000f14', // now fills *all* background, including behind the top
  },
  button: {
    justifyContent: 'top',
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,  // this moves it UP by adding space below it
  },
  buttonText: {
    color: '#f2f8f8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ddContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    color: 'red',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomArea: {
    marginTop: 'auto',  // pushes this area to the bottom
    alignItems: 'center',
    paddingBottom: 30,
  },
  fighterInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsBox: {
    marginTop: 10,
    minHeight: 80, // ensures consistent space is reserved
    justifyContent: 'center',
  },
});
