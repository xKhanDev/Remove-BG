import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeBackground = () => {
    router.push("/processing"); // first go to processing screen

    // stay for 3 seconds, then move to result screen
    setTimeout(() => {
      router.push("/output"); // 👉 change "result" to your actual screen
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 px-3 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />

      <View className="items-center mt-2">
        <Text className="text-3xl font-bold text-textDark text-center my-2">
          BG Remover
        </Text>
      </View>

      {/* Share and More Apps */}
      <View className="flex-row justify-center gap-3 px-4 py-4">
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
        {/* If no image selected → show upload icon */}
        {!selectedImage ? (
          <View className="w-24 h-24 rounded-full bg-[#EEF1FD] justify-center items-center">
            <AntDesign name="cloudupload" size={50} color="#5480ED" />
          </View>
        ) : (
          <Image
            source={{ uri: selectedImage }}
            className="w-full rounded-lg mb-4"
            style={{ aspectRatio: 1.5 }} // 1.5 = width:height ratio
            resizeMode="cover"
          />
        )}

        {/* Show only if no image uploaded */}
        {!selectedImage && (
          <>
            <Text className="font-bold text-2xl my-2">Upload Image</Text>
            <Text className="text-xl text-textDark mb-4">
              Choose an image to remove background
            </Text>
          </>
        )}

        {/* Button changes based on state */}
        <TouchableOpacity
          onPress={selectedImage ? removeBackground : pickImage}
          activeOpacity={0.8}
          className={`px-4 py-4 rounded-md w-full flex-row gap-4 justify-center items-center ${
            selectedImage ? "bg-green-600" : "bg-primary"
          }`}
        >
          <FontAwesome6
            name={selectedImage ? "scissors" : "add"}
            size={20}
            color="white"
          />
          <Text className="text-white text-xl">
            {selectedImage ? "Remove Background" : "Upload Image"}
          </Text>
        </TouchableOpacity>

        {/* Change Image button (only when image is uploaded) */}
        {selectedImage && (
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            className="bg-gray-400 px-4 py-4 rounded-md w-full flex-row gap-4 justify-center items-center mt-3"
          >
            <MaterialIcons name="image" size={20} color="white" />
            <Text className="text-white text-xl">Change Image</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-center mt-5">Powered by AI Background Removal</Text>
    </SafeAreaView>
  );
}
