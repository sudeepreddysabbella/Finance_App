
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import LinesList from "./screens/LinesList";
import Lines from "./screens/Lines";
import AddNew from "./screens/AddNew";
import Customers from "./screens/Customers";
import Collections from "./screens/Collections";
import CollectionData  from "./screens/CollectionData";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="LinesList" component={LinesList} />
        <Stack.Screen name="Lines" component={Lines} />
        <Stack.Screen name="AddNew" component={AddNew} />
        <Stack.Screen name="Customers" component={Customers} />
        <Stack.Screen name="Collections" component={Collections} />
        <Stack.Screen name="CollectionData" component={CollectionData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
