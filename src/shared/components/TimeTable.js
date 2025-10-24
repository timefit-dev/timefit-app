import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

const TimeCell = React.memo(function TimeCell({
  date,
  time,
  isSelected,
  availability,
  readOnly,
  onPress,
}) {
  const dateTime = `${date} ${time}`;

  // 참여 가능 인원 수에 따라 셀의 배경색 투명도를 계산합니다.
  // availability나 dateTime이 변경될 때만 재계산하여 성능을 최적화합니다.
  const cellStyle = React.useMemo(() => {
    if (availability?.counts.has(dateTime)) {
      const count = availability.counts.get(dateTime);
      const total = availability.total || 1;
      // 0으로 나누는 것을 방지하고, 최소 투명도를 보장합니다.
      const opacity = total > 0 ? Math.max(0.1, count / total) : 0.1;
      return {
        backgroundColor: `rgba(30, 144, 255, ${opacity})`,
      };
    }
    return {};
  }, [availability, dateTime]);

  return (
    <Pressable
      disabled={readOnly}
      onPress={() => onPress && onPress(dateTime)}
      style={[styles.cell, cellStyle, isSelected && styles.selectedCell]}
    />
  );
});

export function TimeTable({
  times,
  selected = new Set(),
  toggle,
  readOnly = false,
  availability,
}) {
  // 1. `times` 배열을 날짜(dates)와 시간(timeSlots)으로 분리하여 그리드 구조로 가공합니다.
  // `useMemo`를 사용하여 `times` prop이 변경될 때만 이 비싼 연산을 수행하도록 최적화합니다.
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

  // 선택 가능한 시간이 없으면 메시지를 표시합니다.
  if (dates.length === 0) {
    return <Text>선택 가능한 시간이 없습니다.</Text>;
  }

  // 2. 가공된 데이터를 기반으로 시간표 그리드를 렌더링합니다.
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
              // `TimeCell` 컴포넌트를 사용하여 각 시간대별 셀을 렌더링합니다.
              const dateTime = `${date} ${time}`;
              return (
                <TimeCell
                  key={dateTime}
                  date={date}
                  time={time}
                  isSelected={selected.has(dateTime)}
                  availability={availability}
                  readOnly={readOnly}
                  onPress={toggle}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// --- 스타일 정의 ---

// 그리드 레이아웃 관련 상수
const DAY_CELL_WIDTH = 65;
const TIME_LABEL_CELL_WIDTH = 60;
const CELL_HEIGHT = 40;
const DEFAULT_PADDING = 10;

// 테두리 두께 관련 상수
const HEADER_BORDER_WIDTH = 1;
const TIME_LABEL_BORDER_WIDTH = 1;
const CELL_BORDER_WIDTH = 0.5;

// 색상 및 폰트 관련 상수
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
    borderColor: CELL_BORDER_COLOR,
  },
  selectedCell: {
    backgroundColor: SELECTED_CELL_BACKGROUND,
  },
});