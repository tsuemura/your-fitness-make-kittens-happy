import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  const [fitnessName, setFitnessName] = useState("");
  const [fitnessMinutes, setFitnessMinutes] = useState("");
  const [fitnessLogs, setFitnessLogs] = useState([]);

  useEffect(() => {
    const loadFitnessLogs = async () => {
      const storedFitnessLogs = await AsyncStorage.getItem("fitnessLogs");
      if (storedFitnessLogs) {
        setFitnessLogs(JSON.parse(storedFitnessLogs));
      }
    };
    loadFitnessLogs();
  }, []);

  const handleAddFitness = async () => {
    const newFitnessLog = {
      name: fitnessName,
      minutes: fitnessMinutes,
      date: new Date().toISOString(),
    };
    const updatedFitnessLogs = [...fitnessLogs, newFitnessLog];
    setFitnessLogs(updatedFitnessLogs);
    await AsyncStorage.setItem('fitnessLogs', JSON.stringify(updatedFitnessLogs));
    console.log(`Added ${fitnessMinutes} minutes of ${fitnessName} to your fitness record!`);
    setFitnessName('');
    setFitnessMinutes('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Recorder</Text>
      <View style={styles.inputContainer}>
        <Icon name="dumbbell" type="font-awesome-5" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Fitness Name"
          value={fitnessName}
          onChangeText={setFitnessName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="clock" type="font-awesome-5" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Minutes"
          keyboardType="numeric"
          value={fitnessMinutes}
          onChangeText={setFitnessMinutes}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddFitness}>
        <Text style={styles.buttonText}>Add Fitness</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
