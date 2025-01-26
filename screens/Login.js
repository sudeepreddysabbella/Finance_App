import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "http://192.168.55.101:3000";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/Login`, {
        email,
        password,
      });
      // Navigate to LinesList page
      navigation.navigate("LinesList");
    } catch (error) {
      // Handle error during login
      Alert.alert("Error"+error, error.response?.data?.error );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        placeholderTextColor="#A9A9A9"
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16 ,color:'#000000'}}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Signup Instead"
        onPress={() => navigation.navigate("Signup")}
        color="#6c757d"
      />
    </View>
  );
};

export default Login;
