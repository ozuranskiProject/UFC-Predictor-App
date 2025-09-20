import React, { useState } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';

// this should make it so that I can add and edit weightclasses easier in the future. I cant fit them all in the scrollview at once so I need acronyms that match json
export const weightClasses = [  
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

export default function WeightClassSelector({ selectedWCLabel, onSelectWC }) {

  // find the matching weight class code from the label
  const selectedCode = weightClasses.find(o => o.label === selectedWCLabel)?.code;

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
            onPress={() => onSelectWC(item.label)}
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
