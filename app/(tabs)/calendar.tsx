import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Text, Button, Modal, Portal, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useState, useRef } from "react";

const SCREEN_PADDING = 16;
const CELL_MARGIN = 4;
const NUM_COLS = 7;

const { width } = Dimensions.get("window");
const availableWidth = width - SCREEN_PADDING * 2 - CELL_MARGIN * 2 * NUM_COLS;
const DAY_SIZE = availableWidth / NUM_COLS; // fixed width
const DAY_HEIGHT = 70;

// Day Cell Component
function DayCell({ item, onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (item.empty) {
    return (
      <View
        style={{
          width: DAY_SIZE,
          height: DAY_HEIGHT,
          margin: CELL_MARGIN,
        }}
      />
    );
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: DAY_SIZE,
          height: DAY_HEIGHT,
          margin: CELL_MARGIN,
        },
      ]}
    >
      <TouchableOpacity
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={{
          flex: 1,
          borderRadius: 12,
          backgroundColor: item.novena
            ? "rgba(255,255,255,0.25)"
            : "rgba(255,255,255,0.15)",
          borderWidth: item.novena ? 2 : 1,
          borderColor: item.novena ? "#fff" : "rgba(255,255,255,0.3)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 4,
          paddingVertical: 6,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {item.day}
        </Text>

        {item.novena && (
          <View
            style={{
              marginTop: 4,
              height: 20, // fixed label area
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 8,
                textAlign: "center",
                lineHeight: 10,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.novena}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function CalendarScreen() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];

  for (let i = 0; i < firstDay; i++) {
    daysArray.push({ empty: true });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({
      day,
      dateString: `${year}-${month + 1}-${day}`,
      novena: day === 8 ? "Immaculate Conception" : null,
      image:
        day === 8
          ? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          : null,
    });
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Swipe detector
  const handleTouchStart = (e) => {
    touchStartX.current = e.nativeEvent.pageX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.nativeEvent.pageX;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      goToNextMonth(); // swipe left
    } else if (diff < -50) {
      goToPrevMonth(); // swipe right
    }
  };

  return (
    <LinearGradient
      colors={["#4b2e83", "#6a4c93", "#b185db"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ flex: 1, padding: SCREEN_PADDING }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Month Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={goToPrevMonth}>
            <Text
              style={{
                color: "white",
                fontSize: 40,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <Text
            variant="headlineMedium"
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </Text>

          <TouchableOpacity onPress={goToNextMonth}>
            <Text
              style={{
                color: "white",
                fontSize: 40,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weekday Labels */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 8,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <View
              key={d}
              style={{
                width: DAY_SIZE,
                marginHorizontal: CELL_MARGIN,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  opacity: 0.8,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {d}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <FlatList
          data={daysArray}
          numColumns={NUM_COLS}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <DayCell item={item} onPress={() => setSelectedDay(item)} />
          )}
          scrollEnabled={false}
        />

        {/* Bottom Sheet Preview */}
        <Portal>
          <Modal
            visible={!!selectedDay}
            onDismiss={() => setSelectedDay(null)}
            contentContainerStyle={{
              backgroundColor: "white",
              margin: 20,
              borderRadius: 20,
              padding: 20,
            }}
          >
            {selectedDay && (
              <Card style={{ borderRadius: 20 }}>
                {selectedDay.image && (
                  <Image
                    source={{ uri: selectedDay.image }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  />
                )}

                <Card.Content>
                  <Text variant="titleLarge" style={{ marginTop: 10 }}>
                    {selectedDay.novena || "No Novena"}
                  </Text>

                  <Text style={{ marginTop: 10, opacity: 0.7 }}>
                    {selectedDay.dateString}
                  </Text>

                  <Button
                    mode="contained"
                    style={{ marginTop: 20 }}
                    onPress={() => {
                      setSelectedDay(null);
                      router.push(`/novena/${selectedDay.dateString}`);
                    }}
                  >
                    Open Novena
                  </Button>
                </Card.Content>
              </Card>
            )}
          </Modal>
        </Portal>
      </SafeAreaView>
    </LinearGradient>
  );
}
