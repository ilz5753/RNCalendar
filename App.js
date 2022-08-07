import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SM from "./src/sm";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SM />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
