import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";

export default function SaintsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium">Saints</Text>
    </SafeAreaView>
  );
}
