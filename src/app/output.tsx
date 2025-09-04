import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BeforeAftericon from "../assets/icons/BeforeAftericon";
import CustomButton from "../components/Buttons/CustomButton";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";
import Header from "../components/Header";

const Output = () => {
  const { image } = useLocalSearchParams();
  // Dummy + original image state
  const dummyImage =
    "https://www.theloverspoint.com/wp-content/uploads/2025/05/attitude-girl-pic.jpg"; // replace with your dummy image
  let initialUri: string | undefined;
  
  if (typeof image === "string") {
    if (
      image.startsWith("file://") ||
      image.startsWith("http") ||
      image.startsWith("data:image")
    ) {
      initialUri = image; // ✅ handles base64 too
    } else {
      initialUri = `file://${image}`;
    }
  }

  // ✅ Manage image state
  const [imageUri, setImageUri] = useState(initialUri);

  const downloadImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Storage permission is needed!");
        return;
      }

      if (!imageUri) {
        Alert.alert("No image", "Please select an image first.");
        return;
      }

      const folderUri = FileSystem.documentDirectory + "RemoveBG/";
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
      }

      const fileUri = folderUri + `output_${Date.now()}.png`;

      if (imageUri.startsWith("data:image")) {
        // Base64 → file
        const base64Data = imageUri.split(",")[1];
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } else {
        // Normal file path
        await FileSystem.copyAsync({
          from: imageUri,
          to: fileUri,
        });
      }

      await MediaLibrary.saveToLibraryAsync(fileUri);

      Alert.alert("✅ Success", "Image saved in gallery!");
    } catch (error) {
      console.error("❌ Download error:", error);
      Alert.alert("❌ Error", "Download failed!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />
      <ScrollView className="flex-1 px-3">
        <Header />

        {/* Share and More Apps */}
        <View className="flex-row justify-center gap-3 px-4 py-4">
          <Sharebutton />
          <Morebutton />
        </View>

        {/* Display Selected Image */}
        <View
          className="bg-background rounded-lg items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            position: "relative",
          }}
        >
          {/* Custom button in top right */}
          <View
            style={{
              position: "absolute",
              bottom: 10,
              right: 5,
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-gray-400 p-2 rounded-full"
              onLongPress={() => setImageUri(dummyImage)}
              onPressOut={() => setImageUri(initialUri)}
              delayLongPress={5}
            >
              <BeforeAftericon />
            </TouchableOpacity>
          </View>

          {!imageUri ? (
            <View className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 justify-center items-center mb-4">
              <Text className="font-bold text-2xl my-2">No Image</Text>
              <Text className="text-xl text-textDark mb-4">
                Please upload an image first
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: imageUri }}
              className="w-full rounded-lg mb-2"
              style={{ aspectRatio: 1.5 }}
              resizeMode="contain" // 👈 better for base64 images
            />
          )}
        </View>

        {/* Download and Upload Buttons */}
        <View className="w-full gap-2">
          <CustomButton
            title="Download Image"
            onPress={downloadImage}
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

      <Text className="text-center mb-5">Powered by AI Background Removal</Text>
    </SafeAreaView>
  );
};

export default Output;
