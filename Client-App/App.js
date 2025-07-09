import React, { useState, useRef } from 'react'; //import react for JSX and UI components and logic 
import { Button, Animated, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components 
import Counter from './Counter';

export default function App() {    //basically just "put this file on my app; it is the app itself really" 
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const resetCounters = () => {
  setCountA(0);
  setCountB(0);
  };

  const scaleAnim = useRef(new Animated.Value(1)).current; //idk wtf this means its 3am but i think animating a button will be cool (famous last words!) ^-^

  const animateResetButton = () => {
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
    ]).start(resetCounters); // reset when the bounce is done
  };

  return (
    <SafeAreaView style={styles.screenBackground}>
      <View style={styles.appContainer}>
        <Text style={styles.title}>Total Count: {countA + countB}</Text>

        {/* First Counter */}
        <View style={styles.counterBox}>
          <Text style={styles.counterN}>Counter A</Text>
          <Counter count={countA} onValueChange={setCountA} />
        </View>

        {/* Second Counter */}
        <View style={styles.counterBox}>
          <Text style={styles.counterN}>Counter B</Text>
          <Counter count={countB} onValueChange={setCountB} />
        </View>

        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <Pressable onPress={animateResetButton} hitSlop={25}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </Animated.View>
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
    fontSize: 24, 
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
    marginTop: 100,
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
  counterBox: {
    height: 200,               // <- makes the container taller
    width: '80%',
    padding: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,            // helps visualize container size  //SUPER USEFUL AND SHOULD BE STANDARD AS I DEVELOP UI!!!
    borderColor: '#12113d',
    borderRadius: 15,
    marginTop: 25,
    backgroundColor: '#363b51',
  },
  screenBackground: {
    flex: 1,
    backgroundColor: '#000f14', // now fills *all* background, including behind the top
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2f8f8',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
