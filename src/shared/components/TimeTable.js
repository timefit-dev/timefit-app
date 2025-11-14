import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function TimeTable({
  times,
  renderCell,
  onHeaderLayout,
  onScroll,
  scrollRef,
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
    <ScrollView
      horizontal
      ref={scrollRef}
      onScroll={onScroll}
      scrollEventThrottle={16}
      bounces={false}
      alwaysBounceHHorizontal={false}
      overScrollMode="never"
      scrollEnabled={true}
      contentContainerStyle={{
        minWidth: dates.length * DAY_CELL_WIDTH + TIME_LABEL_CELL_WIDTH,
      }}
    >
      <View>
        {/* 날짜 헤더 */}
        <View style={styles.row} onLayout={onHeaderLayout}>
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
              return renderCell({ date, time });
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// --- 스타일 정의 ---

// 그리드 레이아웃 관련 상수
export const DAY_CELL_WIDTH = 65;
export const TIME_LABEL_CELL_WIDTH = 60;
export const CELL_HEIGHT = 40;
export const DEFAULT_PADDING = 10;

// 테두리 두께 관련 상수
export const HEADER_BORDER_WIDTH = 1;
export const TIME_LABEL_BORDER_WIDTH = 1;
export const CELL_BORDER_WIDTH = 0.5;

// 색상 및 폰트 관련 상수
export const GRID_BORDER_COLOR = "#ccc";
export const CELL_BORDER_COLOR = "#eee";
export const SELECTED_CELL_BACKGROUND = "dodgerblue";
export const HEADER_FONT_WEIGHT = "bold";

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
