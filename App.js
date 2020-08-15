import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"

const STORAGE_KEY = "example";

const addEntry = async (title) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, title);
    alert("Entry successfully saved.");
  } catch(e) {
    alert("Entry failed to save.");
  }
}

const readEntry = async () => {
  let x;
  try {
    x = await AsyncStorage.getItem(STORAGE_KEY);
  } catch (e) {
    x = "Error";
    alert("Failed to fetch.")
  }
  return x;
}

const EntryForm = () => {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  return (
    <View>
      <TextInput
        style = {styles.TextInput}
        defaultValue = {title}
        onChangeText = {title => setTitle(title)}
      />
      <TextInput
        style = {styles.TextInput}
        defaultValue = {description}
        onChangeText = {description => setDescription(description)}
      />
      <Button
        title="Add Entry"
        onPress={() => {
          readEntry().then(function(result) {
            console.log(result);
          }, function(err) {
            console.log(err);
          })
          addEntry(title);
        }}
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
