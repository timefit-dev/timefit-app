import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { useTimeSetting } from "../hooks/useTimeSetting";
import { useDragSelection } from "../hooks/useDragSelection";
import {
  TimeTable,
  DAY_CELL_WIDTH,
  CELL_HEIGHT,
  CELL_BORDER_WIDTH,
  CELL_BORDER_COLOR,
  SELECTED_CELL_BACKGROUND,
} from "../../../shared/components/TimeTable";

// 선택된 셀을 표시하는 컴포넌트
const SelectableCell = React.memo(function SelectableCell({
  date,
  time,
  isSelected,
  onPress,
}) {
  const dateTime = `${date} ${time}`;
  return (
    <Pressable
      onPress={() => onPress(dateTime)}
      style={[styles.cell, isSelected && styles.selectedCell]}
    />
  );
});

export function TimeSettingScreen({ route }) {
  const { roomId = 1 } = route.params || {};
  const {
    room,
    times,
    dates,
    timeSlots,
    selected,
    toggle,
    setSelectionForCells,
    submit,
  } = useTimeSetting(roomId) || {};

  const { scrollRef, dragSelectionGesture, handleHeaderLayout, handleScroll } =
    useDragSelection({
      dates,
      timeSlots,
      selected,
      setSelectionForCells,
    });

  const handleSubmit = () => {
    submit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{room ? room.title : "방 제목"}</Text>
        {room && (
          <Text style={styles.participants}>
            {room.respondedCount} / {room.totalParticipants} 명 참여
          </Text>
        )}
      </View>
      <View style={styles.selectorContainer}>
        <GestureDetector gesture={dragSelectionGesture}>
          <View style={styles.gestureWrapper}>
            <TimeTable
              times={times}
              renderCell={({ date, time }) => {
                const dateTime = `${date} ${time}`;
                return (
                  <SelectableCell
                    key={dateTime}
                    date={date}
                    time={time}
                    isSelected={selected.has(dateTime)}
                    onPress={toggle}
                  />
                );
              }}
              onHeaderLayout={handleHeaderLayout}
              onScroll={handleScroll}
              scrollRef={scrollRef}
            />
          </View>
        </GestureDetector>
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>등록하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#eee" },
  title: { fontSize: 24, fontWeight: "bold" },
  participants: { fontSize: 16, color: "gray", marginTop: 4 },
  selectorContainer: { flex: 1, padding: 0 },
  gestureWrapper: { flex: 1 },
  cell: {
    width: DAY_CELL_WIDTH,
    height: CELL_HEIGHT,
    borderWidth: CELL_BORDER_WIDTH,
    borderColor: CELL_BORDER_COLOR,
  },
  selectedCell: {
    backgroundColor: SELECTED_CELL_BACKGROUND,
  },
  submitButton: {
    backgroundColor: "dodgerblue",
    padding: 15,
    margin: 20,
    bottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
