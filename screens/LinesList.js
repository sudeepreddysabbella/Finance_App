import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const LinesPage = ({ navigation }) => {
  const handlePress = (line) => {
    Alert.alert(`You pressed ${line}`);
    // Uncomment this if navigation to a new page is needed
    // navigation.navigate(line); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Line</Text>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("Line 1")}>
        <Text style={styles.buttonText}>Line 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("Line 2")}>
        <Text style={styles.buttonText}>Line 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("Line 3")}>
        <Text style={styles.buttonText}>Line 3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("Line 4")}>
        <Text style={styles.buttonText}>Line 4</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LinesPage;
