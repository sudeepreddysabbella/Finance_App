import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TextInput
} from "react-native";
import { useRoute } from "@react-navigation/native";

const API_URL = "http://192.168.55.101:5000"; // Update the URL to match the backend server port

const CollectionData = () => {
  const route = useRoute();
  const { selectedDay } = route.params;

  const [dayData, setDayData] = useState([]);
  const [totalSum, setTotalSum] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", amount_paid: "" });

  useEffect(() => {
    fetchDayData();
  }, []);

  const fetchDayData = async () => {
    try {
      const response = await fetch(`${API_URL}/getData/${selectedDay.toLowerCase()}`);
      const data = await response.json();
      setDayData(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    }
  };

  const handleGetTotalSum = () => {
     let sum = dayData.reduce((acc, entry) => acc + entry.amount_paid, 0);
    setTotalSum(sum.toFixed(2)); // Rounding to 2 decimal places
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.amount_paid) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }
  
    const serialnumber = Math.floor(Math.random() * 9000 + 1000); // Generate a 4-digit serial number
  
    const customerData = {
      serialnumber,
      name: newCustomer.name,
      amount_paid: parseFloat(newCustomer.amount_paid),
    };
  
    try {
      const response = await fetch(`${API_URL}/addData/${selectedDay.toLowerCase()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
  
      if (response.ok) {
        Alert.alert("Success", "Customer added successfully");
        setModalVisible(false);
        setNewCustomer({ name: "", amount_paid: "" });
        fetchDayData(); // Refresh data
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to add customer");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to server");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data for {selectedDay}</Text>

      <ScrollView style={styles.table}>
        {dayData.length > 0 ? (
          dayData.map((entry, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{entry.serialnumber}</Text>
              <Text style={styles.cell}>{entry.name}</Text>
              <Text style={styles.cell}>₹{entry.amount_paid}</Text>
            </View>
          ))
        ) : (
          <Text>No data available.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.sumButton} onPress={handleGetTotalSum}>
        <Text style={styles.buttonText}>Calculate Total Sum</Text>
      </TouchableOpacity>

      {totalSum !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Total Sum: ₹{totalSum}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Customer</Text>
      </TouchableOpacity>

      {/* Modal for Adding Customer */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Customer</Text>

            <TextInput
              style={styles.input}
              placeholder="Serial Number (4-digit)"
              value={newCustomer.serialnumber}
              onChangeText={(text) => setNewCustomer({ ...newCustomer, serialnumber: text })}
              placeholderTextColor={"#000000"}
              editable={false} // Serial number is auto-generated
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={newCustomer.name}
              onChangeText={(text) => setNewCustomer({ ...newCustomer, name: text })}
              placeholderTextColor={"#000000"}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Amount Paid"
              keyboardType="numeric"
              value={newCustomer.amount_paid}
              onChangeText={(text) => setNewCustomer({ ...newCustomer, amount_paid: text })}
              placeholderTextColor={"#000000"}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.addCustomerButton} onPress={handleAddCustomer}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  table: { width: "100%", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: { fontSize: 16 },
  sumButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  resultText: { fontSize: 18, fontWeight: "bold" },

  /* Modal Styles */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  addCustomerButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#DC3545",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
});

export default CollectionData;
