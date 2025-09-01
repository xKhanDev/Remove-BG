import React from "react";
import {
  StatusBar,
  Text,
  View
} from "react-native";
import BeforeAfterSlider from "react-native-before-after-slider-v2";
import { SafeAreaView } from "react-native-safe-area-context";
import Morebutton from "../components/Buttons/Morebutton";
import Sharebutton from "../components/Buttons/Sharebutton";

const Output = () => {
  // ✅ Dummy Images from Unsplash (these always work)
  const beforeImage = {
    uri: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&h=1000&fit=crop", // with background
  };
  const afterImage = {
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop", // suppose bg removed
  };

  return (
    <SafeAreaView className="flex-1 px-3 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFF" />

      <View className="items-center mt-2">
        <Text className="text-3xl font-bold text-black text-center my-2">
          BG Remover
        </Text>
      </View>

       {/* Share and More Apps */}
      <View className="flex-row justify-center gap-3 px-4 py-4">
       <Sharebutton />
        <Morebutton />
      </View>

      {/* Before After Slider */}
      <View className="flex-1 justify-center items-center">
        <BeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          width={320}
          height={400}
          initialPosition={0.5} // middle
          dividerWidth={3}
          dividerColor="#5480ED"
        />
      </View>

      <Text className="text-center mt-5">
        Powered by AI Background Removal
      </Text>
    </SafeAreaView>
  );
};

export default Output;
