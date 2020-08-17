import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from 'expo-notifications';

const testNotif = () => {
  console.log("testNotif");
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },
    trigger: {
      seconds: 3,
    },
  });
}

const addEntry = async (entry, z) => {
  try {
    await AsyncStorage.setItem(String(z), entry);
    alert("Entry successfully saved.");
  } catch(e) {
    alert("Entry failed to save.");
  }
}

const readEntry = async (z) => {
  let result = new Array(z);
  try {
    for (let i = 0; i < z; i++) {
      result[i] = await AsyncStorage.getItem(String(i));
    }
  } catch (e) {
    result = "Error";
    alert("Failed to fetch.")
  }
  return result;
}

const EntryForm = () => {
  const [entry, setEntry] = useState("Entry");
  const [y, setY] = useState([]);
  const [z, setZ] = useState(0);
  return (
    <View>
      <TextInput
        style = {styles.TextInput}
        defaultValue = {entry}
        onChangeText = {entry => setEntry(entry)}
      />
      <Button
        title="Add Entry"
        onPress={() => {
          addEntry(entry, z);
          let p = z + 1;
          setZ(p);
        }}
      />
      <Button
        title="Read Data"
        onPress={() => {
          readEntry(z).then(function(result) {
            setY(result);
          }, function(err) {
            console.log(err);
          })
        }}
      />
      <Text>{JSON.stringify(y)}</Text>
    </View>
  );
}

export default function App() {
  console.log("App");
  testNotif();
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
