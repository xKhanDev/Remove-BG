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
      <Stack.Screen
        name="processing"
        options={{
          headerShown: false,
          title: "Remove Background",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="output"
        options={{
          headerShown: false,
          title: "Output",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
