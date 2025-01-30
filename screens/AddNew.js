import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";


const BASE_URL = "http://192.168.55.103:3000";

const AddNew = () => {
  const [formData, setFormData] = useState({
    serialnumber: "",
    name: "",
    date: "",
    phonenumber: "",
    principalnumber: "",
    totalamount: "",
    numberofinstallments: "",
    address: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async () => {
    // Check for empty fields
    for (let key in formData) {
      if (!formData[key].toString().trim()) {
        Alert.alert("Validation Error", `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        return;
      }
    }
  
    // Validate input fields
    if (!/^\d{4}$/.test(formData.serialnumber)) {
      Alert.alert("Validation Error", "Serial number must be a unique 4-digit number.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phonenumber)) {
      Alert.alert("Validation Error", "Phone number must be a 10-digit number.");
      return;
    }
    if (
      isNaN(formData.principalnumber) ||
      isNaN(formData.totalamount) ||
      isNaN(formData.numberofinstallments) ||
      formData.principalnumber <= 0 ||
      formData.totalamount <= 0 ||
      formData.numberofinstallments <= 0
    ) {
      Alert.alert("Validation Error", "Principal, total amount, and installments must be positive numbers.");
      return;
    }
  
    try {
      // Convert numeric values to numbers
      const requestData = {
        ...formData,
        principalnumber: Number(formData.principalnumber),
        totalamount: Number(formData.totalamount),
        numberofinstallments: Number(formData.numberofinstallments),
      };
  
      console.log("Sending Data:", requestData); // Debugging log
  
      const response = await fetch(`${BASE_URL}/add-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const responseData = await response.json(); // Parse JSON response
  
      if (response.ok) {
        Alert.alert("Success", "Customer added successfully!");
        setFormData({
          serialnumber: "",
          name: "",
          date: "",
          phonenumber: "",
          principalnumber: "",
          totalamount: "",
          numberofinstallments: "",
          address: "",
        });
      } else {
        console.error("Server Error:", responseData);
        Alert.alert("Error", responseData.error || "Failed to add customer. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Network issue. Please check your connection and try again.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Customer</Text>
      <TextInput
        style={styles.input}
        placeholder="Serial Number (4-digit)"
        keyboardType="numeric"
        value={formData.serialnumber}
        onChangeText={(value) => handleChange("serialnumber", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={formData.date}
        onChangeText={(value) => handleChange("date", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number (10-digit)"
        keyboardType="numeric"
        value={formData.phonenumber}
        onChangeText={(value) => handleChange("phonenumber", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Principal Amount"
        keyboardType="numeric"
        value={formData.principalnumber}
        onChangeText={(value) => handleChange("principalnumber", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        keyboardType="numeric"
        value={formData.totalamount}
        onChangeText={(value) => handleChange("totalamount", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Installments"
        keyboardType="numeric"
        value={formData.numberofinstallments}
        onChangeText={(value) => handleChange("numberofinstallments", value)}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Address"
        multiline
        value={formData.address}
        onChangeText={(value) => handleChange("address", value)}
        placeholderTextColor={'#000000'}
      />
      <Button title="Add Customer" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
});

export default AddNew;
