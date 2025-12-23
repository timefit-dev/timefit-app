import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GestureDetector, ScrollView } from "react-native-gesture-handler";
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

  const {
    horizontalScrollRef,
    verticalScrollRef,
    dragSelectionGesture,
    handleHeaderLayout,
    handleHorizontalScroll,
    handleVerticalScroll,
  } = useDragSelection({
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
        <View style={styles.titleRow}>
          {room && (
            <Text style={styles.participants}>
              {room.respondedCount} / {room.totalParticipants} 명 참여
            </Text>
          )}
          <Text style={styles.headerSubText}>
            짧게 눌러서 하나씩 선택, 길게 눌러서 드레그 선택
          </Text>
        </View>
      </View>

      <View style={styles.selectorContainer}>
        <GestureDetector gesture={dragSelectionGesture}>
          <View style={styles.gestureWrapper}>
            <ScrollView
              ref={verticalScrollRef}
              onScroll={handleVerticalScroll}
              scrollEventThrottle={16}
            >
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
                onScroll={handleHorizontalScroll}
                scrollRef={horizontalScrollRef}
              />
            </ScrollView>
          </View>
        </GestureDetector>
      </View>
      <View style={styles.submitButtonContainer}>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#eee" },
  title: { fontSize: 24, fontWeight: "bold" },
  participants: { fontSize: 16, color: "gray", marginTop: 4 },
  headerSubText: {
    fontSize: 10,
    color: "gray",
    textAlign: "right",
    alignItems: "flex-end",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  submitButtonContainer: {
    marginTop: 30,
    marginBottom: 3,
  },
  submitButton: {
    backgroundColor: "dodgerblue",
    paddingVertical: 15,
    marginHorizontal: 20,
    bottom: 20,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
