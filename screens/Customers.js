import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";

const Customers = () => {
  const BASE_URL = "http://192.168.19.140:3000";
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

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
              <Text style={styles.cell}>{item.address}</Text>
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Serial</Text>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Phone</Text>
              <Text style={styles.headerCell}>Total Amount</Text>
              <Text style={styles.headerCell}>Address</Text>
            </View>
          }
        />
      )}
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
  cell: { flex: 1, textAlign: "center" },
});

export default Customers;
