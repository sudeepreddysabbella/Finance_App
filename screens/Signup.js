import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";


const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL =
  Platform.OS === "android" ? "http://192.168.55.101:3000" : "http://localhost:3000";


  const handleSignup = async () => {
    try {
      console.log('Sending signup data:', { name, email, password });
      console.log(BASE_URL);
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      console.log('Server response:', response.data);
      
      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      console.error('Signup error:', error);
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
        placeholderTextColor={"#000000"}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholderTextColor={"#000000"}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholderTextColor={"#000000"}
        
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
