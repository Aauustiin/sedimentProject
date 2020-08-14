import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const EntryForm = () => {
  return (
    <View>
      <TextInput
        style = {styles.TextInput}
        defaultValue = "Title"
      />
      <TextInput
        style = {styles.TextInput}
        defaultValue = "Description"
      />
      <Button
        onPress={() => {
          //Do Thing
        }}
        title="Add Entry"
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What did you learn today?</Text>
      <StatusBar style="auto" />
      <EntryForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
});
