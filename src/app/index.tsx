import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle sharing the app
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hey! Check this out 🚀", // message to share
        url: "https://example.com", // link (optional)
        title: "Share With Friends", // title (Android only)
      });

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

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery.");
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images
      allowsEditing: true, // allow crop
      quality: 1, // best quality
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // save selected image
    }
  };

  return (
    <SafeAreaView className="flex-1 px-3 bg-background">
      {/* StatusBar component to set the status bar style */}
      <StatusBar barStyle="default" backgroundColor="#3b063b" />

      <View className="items-center mt-2">
        <Text className="text-3xl font-bold text-textDark text-center my-2">
          Remove Background
        </Text>
      </View>

      {/* Shere and More Apps buttons */}
      <View className="flex-row justify-center gap-3 px-4 py-4 ">
        <TouchableOpacity
          className="bg-textprimary px-4 py-1 rounded-md flex-row justify-center items-center gap-3"
          activeOpacity={0.4}
          onPress={onShare}
        >
          <Entypo name="share" size={20} color="black" />
          <Text>Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          className="bg-textprimary px-4 py-1 rounded-md flex-row justify-center items-center gap-3"
        >
          <MaterialIcons name="window" size={20} color="black" />
          <Text>More Apps</Text>
        </TouchableOpacity>
      </View>

      {/* image upload section */}
      <View
        className="bg-background rounded-lg m-3 items-center p-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <View className="w-24 h-24 rounded-full bg-[#EEF1FD] justify-center items-center ">
          <AntDesign name="cloudupload" size={50} color="#5480ED" />
        </View>
        <Text className="font-bold text-2xl my-2">Upload Image</Text>
        <Text className="text-xl text-textDark mb-4">
          Choose an image to remove background
        </Text>
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.8}
          className="bg-primary px-4 py-4  rounded-md w-full flex-row gap-4 justify-center items-center "
        >
          <FontAwesome6 name="add" size={20} color="white" />
          <Text className="text-textprimary text-xl ">Upload Image</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center mt-5">Powered by AI Background Removal</Text>
    </SafeAreaView>
  );
}
