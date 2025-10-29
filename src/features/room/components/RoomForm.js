import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  Animated,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as Haptics from "expo-haptics";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

export function RoomForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState("start");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const insets = useSafeAreaInsets();

  const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0~23
  const MINUTES = Array.from({ length: 60 }, (_, i) => i); // 0~59

  // ✅ 날짜 선택
  const handleDayPress = (day) => {
    const newDates = { ...selectedDates };
    if (newDates[day.dateString]) delete newDates[day.dateString];
    else
      newDates[day.dateString] = {
        selected: true,
        marked: true,
        selectedColor: "#6C63FF",
      };
    setSelectedDates(newDates);
  };

  // ✅ 시간 선택 모달 열기
  const showPicker = (mode) => {
    setPickerMode(mode);
    setPickerVisible(true);
    setHour(0);
    setMinute(0);

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // FlatList 기본 위치
    setTimeout(() => {
      hourRef.current?.scrollToOffset({ offset: 0, animated: false });
      minuteRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 50);
  };

  // ✅ 시간 확정
  const handleConfirm = async () => {
    const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;

    if (pickerMode === "start") {
      setStartTime(formatted);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // 종료시간 선택으로 자연스럽게 이동
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setPickerMode("end");
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          fadeAnim.setValue(0);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          // 종료 시간도 기본 00:00 위치
          hourRef.current?.scrollToOffset({ offset: 0, animated: false });
          minuteRef.current?.scrollToOffset({ offset: 0, animated: false });
        }, 250);
      });
    } else {
      if (startTime && formatted <= startTime) {
        Alert.alert("⚠️ 종료 시간은 시작 시간보다 늦어야 합니다.");
        return;
      }
      setEndTime(formatted);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPickerVisible(false);
    }
  };

  // ✅ 폼 제출
  const handleSubmit = () => {
    if (!title.trim() || !Object.keys(selectedDates).length || !startTime || !endTime) {
      Alert.alert("⚠️ 모든 항목을 입력해주세요.");
      return;
    }

    onSubmit({
      title,
      dates: Object.keys(selectedDates),
      startTime,
      endTime,
    });
  };

  // ✅ 드래그 시 중앙 인덱스 감지 (톡 효과)
  const onScroll = (e, setValue, list, currentValue) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    // 리스트 범위 초과 방지
    if (index >= 0 && index < list.length) {
      if (list[index] !== currentValue) {
        setValue(list[index]);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      {/* 제목 입력 */}
      <Text style={styles.label}>모임 제목</Text>
      <TextInput
        style={styles.input}
        placeholder="예: TimeFit 스터디 날짜 정해요"
        value={title}
        onChangeText={setTitle}
      />

      {/* 날짜 선택 */}
      <Text style={styles.label}>날짜 선택</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        theme={{
          selectedDayBackgroundColor: "#6C63FF",
          todayTextColor: "#FF6B6B",
          arrowColor: "#6C63FF",
        }}
      />
      <Text style={styles.selectedDates}>
        선택된 날짜:{" "}
        {Object.keys(selectedDates).length
          ? Object.keys(selectedDates).join(", ")
          : "없음"}
      </Text>

      {/* 시간 설정 */}
      <Text style={styles.label}>시간 설정</Text>
      <View style={styles.timeCard}>
        <TouchableOpacity style={styles.timeBox} onPress={() => showPicker("start")}>
          <Text style={styles.timeLabel}>시작</Text>
          <Text style={[styles.timeValue, startTime && styles.activeValue]}>
            {startTime || "00:00"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.colon}>~</Text>
        <TouchableOpacity style={styles.timeBox} onPress={() => showPicker("end")}>
          <Text style={styles.timeLabel}>종료</Text>
          <Text style={[styles.timeValue, endTime && styles.activeValue]}>
            {endTime || "00:00"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 휠형 시간 선택기 */}
      <Modal visible={pickerVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Text style={styles.modalTitle}>
              {pickerMode === "start" ? "시작 시간 선택" : "종료 시간 선택"}
            </Text>

            {/* 중앙선 가이드 */}
            <View style={styles.centerLine} />

            <View style={styles.wheelContainer}>
              {/* 시 */}
              <FlatList
                ref={hourRef}
                data={HOURS}
                keyExtractor={(item) => `h-${item}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                bounces={false}
                onScroll={(e) => onScroll(e, setHour, HOURS, hour)}
                scrollEventThrottle={16}
                contentContainerStyle={{
                  paddingTop: (VISIBLE_ITEMS / 2 - 0.6) * ITEM_HEIGHT,
                  paddingBottom: (VISIBLE_ITEMS / 2 - 0.4) * ITEM_HEIGHT,
                }}
                snapToOffsets={HOURS.map((_, i) => i * ITEM_HEIGHT)}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={[styles.item, item === hour && styles.selected]}>
                      {String(item).padStart(2, "0")}
                    </Text>
                  </View>
                )}
                style={styles.wheel}
              />

              {/* 콜론 */}
              <Text style={[styles.colon, {marginBottom: 5}]}>:</Text>

              {/* 분 */}
              <FlatList
                ref={minuteRef}
                data={MINUTES}
                keyExtractor={(item) => `m-${item}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                bounces={false}
                onScroll={(e) => onScroll(e, setMinute, MINUTES, minute)}
                scrollEventThrottle={16}
                contentContainerStyle={{
                  paddingTop: (VISIBLE_ITEMS / 2 - 0.6) * ITEM_HEIGHT,
                  paddingBottom: (VISIBLE_ITEMS / 2 - 0.4) * ITEM_HEIGHT,
                }}
                snapToOffsets={MINUTES.map((_, i) => i * ITEM_HEIGHT)}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={[styles.item, item === minute && styles.selected]}>
                      {String(item).padStart(2, "0")}
                    </Text>
                  </View>
                )}
                style={styles.wheel}
              />
            </View>

            {/* 버튼 */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#eee" }]}
                onPress={() => setPickerVisible(false)}
              >
                <Text style={{ color: "#555" }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#6C63FF" }]}
                onPress={handleConfirm}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>확인</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* 생성 버튼 */}
      <TouchableOpacity style={[styles.createButton, { marginBottom: insets.bottom + 10 }]} onPress={handleSubmit}>
        <Text style={styles.createButtonText}>방 생성</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  selectedDates: { marginTop: 10, color: "#555" },
  timeCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9ff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    marginVertical: 10,
  },
  timeBox: { alignItems: "center", flex: 1 },
  timeLabel: { fontSize: 13, color: "#888" },
  timeValue: { fontSize: 20, fontWeight: "600", color: "#aaa", marginTop: 5 },
  activeValue: { color: "#333" },
  colon: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#555",
    marginHorizontal: 8,
    marginTop: -8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: -10 },
  centerLine: {
    position: "absolute",
    top: "50%",
    left: "10%",
    right: "10%",
    height: 1,
    transform: [{ translateY: -0.5 }],
  },
  wheelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    gap: -10,
  },
  wheel: { height: ITEM_HEIGHT * VISIBLE_ITEMS, width: 80 },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 22,
    color: "#bbb",
    textAlign: "center",
  },
  selected: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 28,
    transform: [{ scale: 1.08 }],
  },
  modalButtons: { flexDirection: "row", marginTop: 15 },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
