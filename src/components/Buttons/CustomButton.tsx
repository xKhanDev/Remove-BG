import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type IconPosition = "left" | "right";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  activeOpacity?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  className = "",
  textClassName = "",
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center
        ${disabled || loading ? "bg-gray-400" : "bg-blue-500"} ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View className="flex-row items-center">
          {icon && iconPosition === "left" && (
            <View className="mr-2">{icon}</View>
          )}
          <Text className={`text-white text-base font-medium ${textClassName}`}>
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <View className="ml-2">{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
