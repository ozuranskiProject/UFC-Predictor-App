import React, { useState } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';

export const weightClasses = [  // this should make it so that I can add and edit weightclasses easier in the future
  { code: 'WSW', label: "Women's Strawweight" },
  { code: 'WFLW', label: "Women's Flyweight" },
  { code: 'WBW', label: "Women's Bantamweight" },
  { code: 'FLW',  label: 'Flyweight' },
  { code: 'BW',   label: 'Bantamweight' },
  { code: 'FW',   label: 'Featherweight' },
  { code: 'LW',   label: 'Lightweight' },
  { code: 'WW',   label: 'Welterweight' },
  { code: 'MW',   label: 'Middleweight' },
  { code: 'LHW',  label: 'Light Heavyweight' },
  { code: 'HW',   label: 'Heavyweight' },
];

export default function WeightClassSelector({ selectedLabel, onSelect }) {
  //MOVED TO PARENT -> const [selected, setSelected] = useState('WSW'); // Preselected first item now so that search without selection is impossible

  const selectedCode = weightClasses.find(o => o.label === selectedLabel)?.code;
  //.find is super useful for finding elements in an array without manual iteration
  //o is the variable for object. basically just saying to match the label of the object with the matching selected label to get the oobject we want
  // and then once the object is found ?.code takes the matching code value

  return (
    <View style={{ height: 66}}>
      <FlatList
        data={weightClasses}
        keyExtractor={(o) => o.code}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          <Pressable
            testID={`weight-${item.code}`}
            onPress={() => onSelect(item.label)}
            style={[
              styles.item,
              selectedCode === item.code && styles.selectedItem
            ]}
          >
            <Text style={selectedCode === item.code ? styles.selectedText : styles.text}>
              {item.code}
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
