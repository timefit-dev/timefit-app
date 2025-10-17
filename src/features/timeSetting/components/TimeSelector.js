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

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  headerCell: {
    width: 65,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerText: { fontWeight: "bold" },
  timeLabelCell: {
    width: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  cell: { width: 65, height: 40, borderWidth: 0.5, borderColor: "#eee" },
  selectedCell: { backgroundColor: "dodgerblue" },
});
