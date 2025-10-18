import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

export function TimeSelector({ times, selected, toggle }) {
  // 1. 데이터를 그리드에 맞게 가공
  const { dates, timeSlots } = React.useMemo(() => {
    if (!times || times.length === 0) {
      return { dates: [], timeSlots: [] };
    }

    const dateSet = new Set();
    const timeSlotSet = new Set();

    times.forEach((dateTime) => {
      const [date, time] = dateTime.split(" ");
      dateSet.add(date);
      timeSlotSet.add(time);
    });

    return {
      dates: Array.from(dateSet).sort(),
      timeSlots: Array.from(timeSlotSet).sort(),
    };
  }, [times]);

  if (dates.length === 0) {
    return <Text>선택 가능한 시간이 없습니다.</Text>;
  }

  // 2. 그리드 렌더링
  return (
    <ScrollView horizontal>
      <View>
        {/* 날짜 헤더 */}
        <View style={styles.row}>
          <View style={styles.timeLabelCell} />
          {dates.map((date) => (
            <View key={date} style={styles.headerCell}>
              <Text style={styles.headerText}>{date.substring(5)}</Text>
            </View>
          ))}
        </View>

        {/* 시간대별 선택 셀 */}
        {timeSlots.map((time) => (
          <View key={time} style={styles.row}>
            <View style={styles.timeLabelCell}>
              <Text>{time}</Text>
            </View>
            {dates.map((date) => {
              const dateTime = `${date} ${time}`;
              const isSelected = selected.has(dateTime);
              return (
                <Pressable
                  key={dateTime}
                  onPress={() => toggle(dateTime)}
                  style={[styles.cell, isSelected && styles.selectedCell]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const DAY_CELL_WIDTH = 65;
const TIME_LABEL_CELL_WIDTH = 60;
const CELL_HEIGHT = 40;
const DEFAULT_PADDING = 10;

const HEADER_BORDER_WIDTH = 1;
const TIME_LABEL_BORDER_WIDTH = 1;
const CELL_BORDER_WIDTH = 0.5;

const GRID_BORDER_COLOR = "#ccc";
const CELL_BORDER_COLOR = "#eee";
const SELECTED_CELL_BACKGROUND = "dodgerblue";
const HEADER_FONT_WEIGHT = "bold";

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  headerCell: {
    width: DAY_CELL_WIDTH,
    padding: DEFAULT_PADDING,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: HEADER_BORDER_WIDTH,
    borderColor: GRID_BORDER_COLOR,
  },
  headerText: { fontWeight: HEADER_FONT_WEIGHT },
  timeLabelCell: {
    width: TIME_LABEL_CELL_WIDTH,
    padding: DEFAULT_PADDING,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: TIME_LABEL_BORDER_WIDTH,
    borderColor: GRID_BORDER_COLOR,
  },
  cell: { 
    width: DAY_CELL_WIDTH, 
    height: CELL_HEIGHT, 
    borderWidth: CELL_BORDER_WIDTH, 
    borderColor: CELL_BORDER_COLOR 
  },
  selectedCell: { 
    backgroundColor: SELECTED_CELL_BACKGROUND 
  },
});