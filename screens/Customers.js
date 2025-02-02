import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";

const Customers = () => {
  const BASE_URL = "http://192.168.63.140:3000";
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.serialnumber.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer List</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or serial number..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={"#000000"}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.serialnumber.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item.serialnumber}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.phonenumber}</Text>
              <Text style={styles.cell}>{item.totalamount}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => openDetails(item)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Serial</Text>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Phone</Text>
              <Text style={styles.headerCell}>Total Amount</Text>
              <Text style={styles.headerCell}>Action</Text>
            </View>
          }
        />
      )}

      {/* Customer Details Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetails}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCustomer && (
              <>
                <Text style={styles.profileTitle}>Customer Details</Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Serial Number:</Text> {selectedCustomer.serialnumber}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Name:</Text> {selectedCustomer.name}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Date:</Text> {selectedCustomer.date}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Phone Number:</Text> {selectedCustomer.phonenumber}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Principal Number:</Text> {selectedCustomer.principalnumber}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Total Amount:</Text> {selectedCustomer.totalamount}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Number of Installments:</Text> {selectedCustomer.numberofinstallments}
                </Text>
                <Text style={styles.profileItem}>
                  <Text style={styles.label}>Address :</Text> {selectedCustomer.address}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeDetails}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  tableHeader: { flexDirection: "row", backgroundColor: "#ddd", padding: 10 },
  tableRow: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  headerCell: { flex: 1, fontWeight: "bold", textAlign: "center" },
  cell: { flex: 1, textAlign: "center", paddingVertical: 5 },
  detailsButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    height:35
  },
  buttonText: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    paddingTop:"center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Customers;
