import React, { useState } from 'react'; //import react for JSX and UI components and logic 
import { Button, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components 
import Counter from './Counter';

export default function App() {    //basically just "put this file on my app; it is the app itself really" 
  return (
    <View style={styles.appContainer}>
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
