import React, { useState } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';

const weightClasses = [
  'WSW', "WFLW", "WBW", 'FLW', 'BW', 'FW', 'LW',
  'WW', 'MW', 'LHW', 'HW'
];

export default function WeightClassSelector() {
  const [selected, setSelected] = useState(null); // For visual feedback only

  return (
    <View style={{ height: 66}}>
      <FlatList
        data={weightClasses}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelected(item)}
            style={[
              styles.item,
              selected === item && styles.selectedItem
            ]}
          >
            <Text style={selected === item ? styles.selectedText : styles.text}>
              {item}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

    //Flatlist renders scrollable lists
    //data is a predefined prop that will store the list of what will be rendered
    //keyextractor basically is just telling the tool how to id the items, like an array dictionary using keywords, in this case just telling it to be directly used?
    //horizontal... 
    //buncha UI shit self explanatory
    //renderItem... renders the chosen item, in this case through a button

    //for the next part, this revelation is helpful:
    //so every time that you select a new item, it doesnt just change the item, it rerenders 
    //the whole list and iterates through until it reaches the new selected item, that
    //by being selected, caused the rerender and updates the UI visuals appropriately

    //this front end logic is confusing, but sorta makes sense. so 'selected === item && styles.selectedItem' basically says
    //if the item you just selected is the same as what is now being rendered in this rerender, it must use this style
    //and then the text part below that is basically the same thing except it doesnt use a base style it is just either one or the other

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  item: {
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
    height: 66,
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#1e90ff',
  },
  text: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
