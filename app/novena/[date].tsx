import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

export default function NovenaDetailScreen() {
  const { date } = useLocalSearchParams();

  // Later: fetch novena content based on date
  // For now: placeholder
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium">Novena for {date}</Text>

      <Text style={{ marginTop: 20 }}>
        This is where the novena content for this date will appear.
      </Text>
    </SafeAreaView>
  );
}
