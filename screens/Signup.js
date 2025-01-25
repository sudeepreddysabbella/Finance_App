import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";



const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "http://192.168.55.1:3000";


  const handleSignup = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            name,
            email,
            password,
        });
        Alert.alert("Success", response.data.message);
        navigation.navigate("Login");
    } catch (error) {
      console.log(error);
        Alert.alert("Error"+error, error.response?.data?.error );
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
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 ,color:'#000000'}}
        placeholderTextColor="#A9A9A9"
        
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
