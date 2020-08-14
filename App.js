import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What did you learn today?</Text>
      <StatusBar style="auto" />
      <TextInput
        style = {styles.TextInput}
        defaultValue = "Title"
      />
      <TextInput
        style = {styles.TextInput}
        defaultValue = "Description"
      />
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
