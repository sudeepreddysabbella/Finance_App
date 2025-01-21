import React from "react";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Finance App!</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

export default Home;
