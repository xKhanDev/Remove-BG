import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Buttons/CustomButton";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";

import BeforeAfterSlider from "react-native-before-after-slider-v2";

const Output = () => {
  // ✅ Dummy Images from Unsplash (these always work)
  const beforeImage = {
    uri: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&h=1000&fit=crop", // with background
  };
  const afterImage = {
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop", // suppose bg removed
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Status bar  */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />
      <ScrollView className="flex-1 px-3">
        {/* App Title */}
        <View className="items-center mt-2 bg-background">
          <Text className="text-3xl font-bold text-textDark text-center my-2">
            BG Remover
          </Text>
        </View>

        {/* Share and More Apps */}
        <View className="flex-row justify-center gap-3 px-4 py-4">
          <Sharebutton />
          <Morebutton />
        </View>

        {/* Display Before and After Images */}
        <View className="flex-1 justify-center w-full mb-3 items-center">
          <Text className="text-xl font-bold mb-3">Before / After</Text>
          <View className="w-full h-72 rounded-lg overflow-hidden">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              width={350}
              height={300}
            />
          </View>
        </View>

        {/* Download and Upload Buttons */}
        <View className="w-full space-y-3 gap-3">
          <CustomButton
            title="Download Image"
            onPress={() => {
              Alert.alert("Download button pressed");
            }}
            icon={<FontAwesome6 name="download" size={20} color="white" />}
            iconPosition="left"
            className="w-full py-4 rounded-md bg-primary"
            textClassName="text-white text-xl"
            disabled={false}
            loading={false}
            activeOpacity={0.8}
          />

          <CustomButton
            title="Upload New Image"
            onPress={() => {
              router.push("/");
            }}
            activeOpacity={0.8}
            className="w-full bg-gray-400 py-4 rounded-md"
            icon={<MaterialIcons name="add" size={20} color="white" />}
            iconPosition="left"
            textClassName="text-white text-xl"
            disabled={false}
            loading={false}
          />
        </View>
      </ScrollView>

      <Text className="text-center mb-5">
        Powered by AI Background Removal
      </Text>
    </SafeAreaView>
  );
};

export default Output;
