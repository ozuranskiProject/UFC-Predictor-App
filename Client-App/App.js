import React, { useState } from 'react'; //import react for JSX and UI components and logic 
import { Button, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components 
import Counter from './Counter';

export default function App() {    //basically just "put this file on my app; it is the app itself really" 
  return (
    <View style={styles.appContainer}>
      <Counter startValue={10} />     
    </View>
  );
      //still cant figure out how to comment in jsx without getting errors so here:
      //<Counter startValue={10} />   "import Counter.js in this container and set prop to value to initialize counter" 
}

const styles = StyleSheet.create({  //IMPORTANT: IMPORTED FILES WITH CONTAINERS NEED CONTAINERS (like this) FOR THEIR CONTAINERS
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
