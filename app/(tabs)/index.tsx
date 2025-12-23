import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, View } from "react-native";
import { Text, Button } from "react-native-paper";

const background = require("../../assets/images/bg.jpg");

export default function HomeScreen() {
  return (
    <ImageBackground source={background} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <Text
            variant="headlineMedium"
            style={{
              marginBottom: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Welcome to Novenas
          </Text>

          <Button
            mode="contained"
            buttonColor="#6a4c93"
            textColor="white"
            style={{ borderRadius: 8 }}
          >
            Start Novena
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
