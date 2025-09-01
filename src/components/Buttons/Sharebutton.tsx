import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity } from "react-native";

const Sharebutton = () => {
  const onShare = async () => {
    try {
      const message =
        "Hey! Check this out 🚀" +
        "\n\n" + // new line for readability
        "Title: Share With Friends" +
        "\n" +
        "Link: https://example.com";

      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <TouchableOpacity
      className="bg-textprimary px-4 py-1 rounded-md flex-row justify-center items-center gap-3"
      activeOpacity={0.4}
      onPress={onShare}
    >
      <Entypo name="share" size={20} color="black" />
      <Text>Share App</Text>
    </TouchableOpacity>
  );
};

export default Sharebutton;

const styles = StyleSheet.create({});
