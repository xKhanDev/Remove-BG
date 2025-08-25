import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Remove Background",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
