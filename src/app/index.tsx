import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { encode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Buttons/CustomButton";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";
import Header from "../components/Header";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Save base64 string to a file and return its file:// URI */
  const saveBase64ToFile = async (base64: string) => {
    const filename =
      FileSystem.documentDirectory + `processed_${Date.now()}.png`;
    await FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return filename; // -> file:///... URI
  };

  const pickImage = async () => {
    setSelectedImage(null);
    setLoading(false);
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
      const pickedUri = result.assets[0].uri;
      // create a unique name
      const uniqueName = `selectedImage_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + uniqueName;
      await FileSystem.copyAsync({ from: pickedUri, to: newPath });
      setSelectedImage(newPath);
    }
  };

  const removeBackground = async () => {
    if (!selectedImage) return;

    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert("No Internet", "Please connect to the internet first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    try {
      const res = await axios.post(
        "https://ihtesham0345-remove-bg-in-huggingface.hf.space/process/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "arraybuffer",
        }
      );

      // binary -> base64 (no data: prefix)
      const base64Raw = encode(res.data);
      // Save to file and get local URI
      const processedUri = await saveBase64ToFile(base64Raw);
      router.push({
        pathname: "/output",
        params: { image: processedUri, original: selectedImage },
      });
    } catch (error) {
      console.error("🚨 Upload Failed:", error);
      Alert.alert(
        "😢 Oops!",
        "Looks like our server is taking a little nap. We'll wake it up soon!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />
      <ScrollView className="flex-1 px-3">
        <Header />

        {/* Upload or Display Image */}
        <View
          className="bg-background rounded-lg items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          }}
        >
          {!selectedImage ? (
            <View className="w-full h-60 rounded-lg border-2 border-dashed border-gray-300 justify-center items-center mb-4 ">
              <View className="w-24 h-24 rounded-full bg-[#EEF1FD] justify-center items-center">
                <AntDesign name="cloudupload" size={50} color="#5480ED" />
              </View>
              <Text className="font-bold text-2xl my-2">Upload Image</Text>
              <Text className="text-xl text-textDark mb-4">
                Choose an image to remove background
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: selectedImage }}
              className="w-full rounded-lg mb-2"
              style={{ aspectRatio: 1.5 }}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Buttons */}
        <View className="w-full space-y-3 gap-2">
          <CustomButton
            title={selectedImage ? "Remove BG" : "Upload Image"}
            onPress={selectedImage ? removeBackground : pickImage}
            icon={
              <FontAwesome6
                name={selectedImage ? "scissors" : "add"}
                size={20}
                color="white"
              />
            }
            iconPosition="left"
            className={`w-full py-4 rounded-md ${
              selectedImage ? "bg-green-600" : "bg-primary"
            }`}
            textClassName="text-white text-xl"
            disabled={loading}
            loading={loading}
            activeOpacity={0.8}
          />

          {selectedImage && (
            <CustomButton
              title="Change Image"
              onPress={pickImage}
              activeOpacity={0.8}
              className="w-full bg-gray-400 py-4 rounded-md"
              icon={<MaterialIcons name="image" size={20} color="white" />}
              iconPosition="left"
              textClassName="text-white text-xl"
              disabled={false}
              loading={false}
            />
          )}
        </View>

        {/* Share and More Apps */}
        <View className="flex-row justify-center gap-3 px-4 py-4">
          <Sharebutton />
          <Morebutton />
        </View>
      </ScrollView>
      <Text className="text-center mb-5 ">
        Powered by AI Background Removal
      </Text>
    </SafeAreaView>
  );
}
