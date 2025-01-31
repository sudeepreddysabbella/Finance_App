import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Collections = () => {
  const navigation = useNavigation();
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    generateWeekDates();
  }, []);

  const generateWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({ day: getDayName(i), date: formatDate(date) });
    }
    setWeekDates(dates);
  };

  const getDayName = (dayIndex) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDaySelect = (day) => {
    navigation.navigate("CollectionData", { selectedDay: day });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Collections</Text>
      <ScrollView style={{ width: "100%" }}>
        {weekDates.map((item, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handleDaySelect(item.day)}>
            <Text style={styles.buttonText}>
              {item.day} - {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Collections;
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Collections = () => {
  const navigation = useNavigation();
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    generateWeekDates();
  }, []);

  const generateWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({ day: getDayName(i), date: formatDate(date) });
    }
    setWeekDates(dates);
  };

  const getDayName = (dayIndex) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    navigation.navigate("CollectionData", { selectedDay: day });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Collections</Text>
      <ScrollView style={{ width: "100%" }}>
        {weekDates.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.button, selectedDay === item.day && styles.selectedButton]} onPress={() => handleDaySelect(item.day)}>
            <Text style={[styles.buttonText, selectedDay === item.day && styles.selectedButtonText]}>
              {item.day} - {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3e8e41",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  selectedButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Collections;