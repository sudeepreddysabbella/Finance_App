import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Lines = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Features</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddNew')}> 
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Customers')}>
        <Text style={styles.buttonText}>Customers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Collections')}>
        <Text style={styles.buttonText}>Collections</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Lines;