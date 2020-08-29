import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from 'expo-notifications';

// The days at which the user will be notified.
const FIRST_REPITITION = 7;
const SECOND_REPITITION = 28;
const THIRD_REPITITION = 84;

// Creates a notification with "message" in "days".
const makeNotif = (message, days) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to recap!",
      body: message,
    },
    trigger: {
      seconds: 60*60*24*days,
    },
  });
}

const saveEntry = async (entry, index) => {
  try {
    await AsyncStorage.setItem(String(index), entry);
    console.log("Entry successfully saved.");
  } catch(e) {
    console.log("Entry failed to save.");
  }
}

// Reads "count" entries from local storage.
const readEntry = async (count) => {
  let result = new Array(count+1);
  try {
    for (let i = 0; i <= count; i++) {
      result[i] = await AsyncStorage.getItem(String(i));
    }
  } catch (e) {
    result = "Error";
    console.log("Failed to fetch.")
  }
  return result.map(a => b = {key: a});
}

// Saves an entry to local storage, and creates notifications.
const handleEntry = (entry, entryCount, setEntryCount, setEntryList) => {
  saveEntry(entry, entryCount);
  makeNotif(entry, FIRST_REPITITION);
  makeNotif(entry, SECOND_REPITITION);
  makeNotif(entry, THIRD_REPITITION);
  readEntry(entryCount).then(function(result) {
    setEntryList(result);
  }, function(err) {
    console.log(err);
  })
  setEntryCount(entryCount + 1);
}

const EntryCard = ({item}) => <Text>{item.key}</Text>

// Form allowing the user to add data, and read data.
const EntryForm = () => {
  const [entry, setEntry] = useState("Entry"); // The current user input.
  const [entryList, setEntryList] = useState([]); // The list of all inputs.
  const [entryCount, setEntryCount] = useState(0); // The number of inputs.

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
          handleEntry(entry, entryCount, setEntryCount, setEntryList);
        }}
      />
      <FlatList
        data={entryList}
        renderItem={EntryCard}
      />
    </View>
  );
}

export default function App() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

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
