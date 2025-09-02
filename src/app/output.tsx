import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Buttons/CustomButton";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";

const Output = () => {
  const { image } = useLocalSearchParams(); // ✅ get image from params
  const decodedImage = image ? decodeURIComponent(image as string) : null;

  // const { image } = useLocalSearchParams();

  // ✅ No need to decode, just cast it
  const imageUri = image as string | undefined;


const downloadImage = async () => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Storage permission is needed!");
      return;
    }

    if (!image) {
      Alert.alert("No image", "Please select an image first.");
      return;
    }

    // Pick file extension (jpg/png)
    const fileUri = FileSystem.documentDirectory + "downloadedImage.jpg";

    // ✅ Instead of downloadAsync, copy the local file
    await FileSystem.copyAsync({
      from: image, // must be "file://" uri
      to: fileUri,
    });

    await MediaLibrary.saveToLibraryAsync(fileUri);

    Alert.alert("✅ Success", "Image saved to gallery!");
  } catch (error) {
    console.error(error);
    Alert.alert("❌ Error", "Download failed!");
  }
};

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Status bar */}
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

        {/* Display Selected Image */}
        {/* Upload or Display Image */}
        <View
          className="bg-background rounded-lg items-center flex-1 justify-center w-full "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          }}
        >
            <Image
              source={{ uri: imageUri }}
              className="w-full rounded-lg mb-4"
              style={{ aspectRatio: 1.5 }} // keeps same ratio like before
              resizeMode="cover"
            />
        </View>

        {/* Download and Upload Buttons */}
        <View className="w-full space-y-3 gap-2">
          <CustomButton
            title="Download Image"
            onPress={downloadImage} // ✅ updated
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
