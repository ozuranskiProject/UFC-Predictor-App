import React, { useState } from 'react'; //import react for JSX and UI components and logic 
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'; //specific mobile UI components

export default function Counter( {count = 0, onValueChange, testID}) {    //This is the function "Counter"    //startValue is a "prop" (can change variable from App.js)
  //const [count, setCount] = useState(startValue);
  //blank var, blank update function = "static variable that remembers value between rerender to UI, start at 10" 
  //const makes it so that only setCount will update count 
  //setCount(x) -> x is where it looks for update and is how react will let you update the variable with useState 

  const trackCount = () => {    //This function will track the count in order to relay it in a prop to the parent or App.js
    //newVal = count + 1;         //We will use newVal to track activiley, we are putting the current value in a box
    //setCount(newVal);           //updating the visual counter with the real value
    onValueChange(prev => prev + 1);      //ship box off to parent via onValueChange express shipping lol //!!! prev means prev state, so here just previous value of onValueChange
  }

  return ( //*-_-_-in react, return is mostly UI outputs for components to render. here its all in JSX, a layout syntax-_-_-*  
    //-_-_-NOTE: IN JSX, "//" ISNT COMMENT, ITS {/* blah blah blah */}-_-_- 
    <View style={styles.container}>                                                 
      <Text style={styles.counterText} testID={`${testID}-label`}>Count: {count}</Text>                 
      <Pressable style={styles.button} onPress={trackCount} testID={testID}>
        <Text style={styles.buttonText}>Increase</Text>
      </Pressable>       
    </View>                                                               

    //Confusing but testID basically makes it so that when testing you can distinguish between repeated components!!! 
    // just another prop really but refer to documentation if needed because its weird and you wont remember how to do it likely :/

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
    backgroundColor: '#363b51',         //white background 
  }, 
  counterText: {                      //this 'preset' is called 'counterText' 
    fontSize: 15,                       //fontsize 
    marginBottom: 40,                   //space underneath text (in this case between button and text), since centered, both will be pushed evenly 
    color: '#f2f8f8',                   //black text
    fontFamily: 'monospace',
  }, 
  button: {
    backgroundColor: '#867899',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2f8f8',
    fontWeight: 'bold',
    fontSize: 13,
  },
});