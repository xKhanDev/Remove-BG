import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";

const processing = () => {
  return (
    <SafeAreaView className="flex-1 px-3 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />

      <ScrollView className="flex-1 px-3">

      <View className="items-center mt-2">
        <Text className="text-3xl font-bold text-textDark text-center my-2">
          BG Remover
        </Text>
      </View>

      {/* Share and More Apps */}
      <View className="flex-row justify-center gap-3 px-4 py-4">
       <Sharebutton />
        <Morebutton />
      </View>

      {/* Upload or Display Image */}
      <View
        className="bg-background rounded-lg m-3 items-center p-2"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        }}
      >
        <View className="w-24 h-24 rounded-full bg-[#EEF1FD] justify-center items-center">
          <AntDesign name="cloudupload" size={50} color="#5480ED" />
        </View>

        <Text className="font-bold text-2xl my-2">Processing...</Text>
        <Text className="text-xl text-textDark mb-4">
          Removing background from your image
        </Text>
        <View className="w-full h-1.5 bg-gray-200 rounded-full dark:bg-gray-700"></View>

        {/* Button changes based on state */}
      </View>

      </ScrollView>
      <Text className="text-center mb-5">Powered by AI Background Removal</Text>
    </SafeAreaView>
  );
};

export default processing;
