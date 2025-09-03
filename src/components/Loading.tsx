import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingProps {
  text?: string;
  size?: "small" | "large";
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  size = "large",
  color = "#2563eb",
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size={size} color={color} />
      <Text className="mt-3 text-base font-medium text-gray-700">{text}</Text>
    </View>
  );
};

export default Loading;
