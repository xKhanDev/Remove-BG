import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Buttons/CustomButton";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";
import Header from "../components/Header";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const newPath = FileSystem.documentDirectory + "selectedImage.jpg";

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
      const pickedUri = result.assets[0].uri;

      // 👇 create a unique name for each upload
      const uniqueName = `selectedImage_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + uniqueName;

      await FileSystem.copyAsync({
        from: pickedUri,
        to: newPath,
      });

      setSelectedImage(newPath); // ✅ now always new image shows
    }
  };
  const removeBackground = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      // Navigate to output screen with image param
      router.push({
        pathname: "/output",
        params: { image: selectedImage },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Status bar  */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />
      <ScrollView className="flex-1 px-3">
        {/* App Title */}
        <Header />
        {/* Share and More Apps */}
        <View className="flex-row justify-center gap-3 px-4 py-4">
          <Sharebutton />
          <Morebutton />
        </View>

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
          {/* If no image selected → show upload icon */}
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
              style={{ aspectRatio: 1.5 }} // 1.5 = width:height ratio
              resizeMode="cover"
            />
          )}
        </View>

        {/* Button changes based on state */}
        <View className="w-full space-y-3 gap-2">
          <CustomButton
            title={selectedImage ? "Remove Background" : "Upload Image"}
            onPress={selectedImage ? removeBackground : pickImage}
            icon={
              <FontAwesome6
                name={selectedImage ? "scissors" : "add"}
                size={20}
                color="white"
              />
            }
            iconPosition="left"
            className={`w-full py-4 rounded-md  ${selectedImage ? "bg-green-600" : "bg-primary"}`}
            textClassName="text-white text-xl"
            disabled={false}
            loading={false}
            activeOpacity={0.8}
          />

          {/* Change Image button (only when image is uploaded) */}
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
      </ScrollView>
      <Text className="text-center mb-5 ">
        Powered by AI Background Removal
      </Text>
    </SafeAreaView>
  );
}
