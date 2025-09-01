import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";


const Morebutton = () => {
  const Morepressed = () => {
    // Logic to open more apps or a link to more apps
    Alert.alert("More Apps button pressed");
  }

  return (
    <TouchableOpacity
    onPress={Morepressed}
      activeOpacity={0.4}
      className="bg-textprimary px-4 py-1 rounded-md flex-row justify-center items-center gap-3"
    >
      <MaterialIcons name="window" size={20} color="black" />
      <Text>More Apps</Text>
    </TouchableOpacity>
  );
};

export default Morebutton;

const styles = StyleSheet.create({});
