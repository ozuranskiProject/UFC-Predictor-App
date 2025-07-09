import React, { useState } from 'react'; //import react for JSX and UI components and logic 
import { Button, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components 
import Counter from './Counter';

export default function App() {    //basically just "put this file on my app; it is the app itself really" 
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Total Count: {countA + countB}</Text>

      {/* First Counter */}
      <View style={styles.counterBox}>
        <Text>Counter A</Text>
        <Counter startValue={0} onValueChange={(val) => setCountA(val)} />
      </View>

      {/* Second Counter */}
      <View style={styles.counterBox}>
        <Text>Counter B</Text>
        <Counter startValue={0} onValueChange={(val) => setCountB(val)} />
      </View>
    </View>
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

const styles = StyleSheet.create({  //IMPORTANT: IMPORTED FILES WITH CONTAINERS NEED CONTAINERS (like this) FOR THEIR CONTAINERS
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 100,
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
  counterBox: {
    height: 200,               // <- makes the container taller
    width: '80%',
    padding: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,            // helps visualize container size  //SUPER USEFUL AND SHOULD BE STANDARD AS I DEVELOP UI!!!
    borderColor: '#ccc',
  },
});
