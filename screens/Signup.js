import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });
      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Signup</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
