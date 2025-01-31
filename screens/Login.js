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
      console.log("Login Successful:", response.data);
      navigation.navigate("LinesList");
    } catch (error) {
      console.log("Axios Error:", error.toJSON());
      Alert.alert("Login Failed", error.message);
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
        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16 }}
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
