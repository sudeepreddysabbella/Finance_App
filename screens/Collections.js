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
    const dates = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push({ day: getDayName(date.getDay()), date: formatDate(date) });
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
      <ScrollView style={{ width: "100%",paddingLeft: "20%" }}>
        {weekDates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, index === 6 && styles.todayButton]}
            onPress={() => handleDaySelect(item.day)}
          >
            <Text style={styles.buttonText}>
              {item.day} - {item.date} {index === 6 ? "(Today)" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" ,paddingTop: "25%"},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 25 ,marginTop:25,alignItems: "center"},
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  todayButton: {
    backgroundColor: "#FF5733", // Highlight color for today's button
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Collections;
