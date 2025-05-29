import React, { useState } from 'react'; //import react for JSX and UI components and logic
import { Button, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components

export default function App() {    //basically just "put this file on my app; it is the app itself really"
  const [count, setCount] = useState<number>(0);
  //blank var, blank update function = "static variable that remembers value between rerender to UI, start at 0"
  //const makes it so that only setCount will update count

  //setCount(x) -> x is where it looks for update and is how react will let you update the variable with useState

  return ( //*-_-_-in react, return is mostly UI outputs for components to render. here its all in JSX, a layout syntax-_-_-* 
    //-_-_-NOTE: IN JSX, "//" ISNT COMMENT, ITS {/* blah blah blah */}-_-_-

    <View style={styles.container}>                                                
      <Text style={styles.counterText}>Count: {count}</Text>                
      <Button title="Increase" onPress={() => setCount(count + 1)} />       
    </View>                                                              

    //*Okay so commenting in JSX is difficult and giving me errors so heres those four lines with comments:*

    //<View style={styles.container}>                                      "show following stuff in the style of 'container,' defined below"      
      //<Text style={styles.counterText}>Count: {count}</Text>                "show text, 'Count: (count number)', display it in the style of 'counterText' defined below" 
      //<Button title="Increase" onPress={() => setCount(count + 1)} />       "display this button that says 'increase' and when pressed, call the update function for var count"
    //</View>                                                              "similar to </Text>, closing 'tag' for styling display of that type (when nthng inside, use /> )"
  );
}

const styles = StyleSheet.create({  //"here we are going to create a 'stylesheet' of styles that will have certain visual properties that we can apply to future visual UI components, like presets" 
  container: {                        //this 'preset' is called 'container'
    flex: 1,                            //allows centering content by giving the container full space to work with, flex "n" allows for different amounts of space to be taken up between containers
    justifyContent: 'center',           //vertical allignment within container
    alignItems: 'center',               //horizontal allignment within container
    backgroundColor: '#ffffff',         //white background
  },
  counterText: {                      //this 'preset' is called 'counterText'
    fontSize: 24,                       //fontsize
    marginBottom: 50,                   //space underneath text (in this case between button and text), since centered, both will be pushed evenly
    color: '#000000',                   //black text
  },
});

















/*import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
}); */

