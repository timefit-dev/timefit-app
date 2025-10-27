import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";

export function RoomForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState("start");
  const [tempHour, setTempHour] = useState(9);
  const [tempMinute, setTempMinute] = useState(0);

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

  // ✅ Picker 열기
  const showPicker = (mode) => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  // ✅ 확인 버튼 클릭 시 동작
  const confirmTime = () => {
    const formatted = `${String(tempHour).padStart(2, "0")}:${String(
      tempMinute
    ).padStart(2, "0")}`;

    if (pickerMode === "start") {
      setStartTime(formatted);
      setPickerMode("end"); // ✅ 종료 Picker로 전환
      // 0.3초 뒤 자동으로 종료 시간 Picker 오픈
      setTimeout(() => {
        setPickerVisible(true);
      }, 300);
    } else {
      setEndTime(formatted);
      setPickerVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* 시간대 선택 */}
      <Text style={styles.label}>시간대 설정</Text>
      <TouchableOpacity
        style={styles.timeCard}
        onPress={() => showPicker("start")}
      >
        <View style={styles.timeRow}>
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>시작</Text>
            <Text style={styles.timeValue}>{startTime || "--:--"}</Text>
          </View>

          <Text style={styles.tilde}>~</Text>

          <TouchableOpacity
            onPress={() => showPicker("end")}
            style={styles.timeBox}
          >
            <Text style={styles.timeLabel}>종료</Text>
            <Text style={styles.timeValue}>{endTime || "--:--"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* ✅ Picker 모달 */}
      <Modal visible={pickerVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {pickerMode === "start" ? "시작 시간 설정" : "종료 시간 설정"}
            </Text>

            <View style={styles.pickerRow}>
              <Picker
                selectedValue={tempHour}
                onValueChange={(itemValue) => setTempHour(itemValue)}
                style={styles.picker}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={String(i).padStart(2, "0")}
                    value={i}
                  />
                ))}
              </Picker>
              <Text style={styles.colon}>:</Text>
              <Picker
                selectedValue={tempMinute}
                onValueChange={(itemValue) => setTempMinute(itemValue)}
                style={styles.picker}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={String(i).padStart(2, "0")}
                    value={i}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#eee" }]}
                onPress={() => setPickerVisible(false)}
              >
                <Text style={{ color: "#555" }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#6C63FF" }]}
                onPress={confirmTime}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 방 생성 버튼 */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          onSubmit({
            title,
            dates: Object.keys(selectedDates),
            startTime,
            endTime,
          })
        }
      >
        <Text style={styles.createButtonText}>방 생성 (테스트)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  selectedDates: {
    marginTop: 10,
    color: "#555",
  },
  timeCard: {
    backgroundColor: "#f9f9ff",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 12,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timeBox: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: { fontSize: 14, color: "#777" },
  timeValue: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 4 },
  tilde: { marginHorizontal: 10, fontSize: 18, fontWeight: "bold" },
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: { width: 100, height: 180 },
  colon: { fontSize: 28, marginHorizontal: 10, color: "#333" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
