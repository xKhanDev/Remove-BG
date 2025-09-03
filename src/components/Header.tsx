import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View className="items-center mt-2 bg-background">
      <Text className="text-3xl font-bold text-textDark text-center my-2">
        BG Remover
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
