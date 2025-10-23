import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TimeTable } from "../../../shared/components/TimeTable";
import { ResultCard } from "../components/ResultCard";
import { useResult } from "../hooks/useResult";

export function ResultScreen({ route }) {
  const navigation = useNavigation();
  const {
    roomId = 1,
  } = route.params || {};

  const {
    isLoading,
    error,
    resultData,
    availabilityData,
    availableTimes,
    topAvailableSlots,
    expandedSlotId,
    toggleExpand,
  } = useResult(roomId);

  return (
    <ResultView
      navigation={navigation}
      isLoading={isLoading}
      error={error}
      availableTimes={availableTimes}
      availabilityData={availabilityData}
      topAvailableSlots={topAvailableSlots}
      expandedSlotId={expandedSlotId}
      toggleExpand={toggleExpand}
      totalParticipants={resultData?.roomInfo.totalParticipants}
      roomId={roomId}
    />
  );
}

function ResultView({ navigation, isLoading, error, availableTimes, availabilityData, topAvailableSlots, expandedSlotId, toggleExpand, totalParticipants, roomId }) {
  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text>데이터를 불러오는 데 실패했습니다.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>결과</Text>
        {/* 전체 시간표를 결과 모드로 렌더링 */}
        <TimeTable
          times={availableTimes}
          availability={availabilityData}
          readOnly={true}
        />

        <View style={styles.recommendationContainer}>
          {/* 추천 시간 목록 */}
          <Text style={styles.recommendationTitle}>추천 시간 Top 3</Text>
          {topAvailableSlots.map((slot, index) => (
            <ResultCard
              key={slot.dateTime}
              slot={slot}
              index={index}
              isExpanded={expandedSlotId === slot.dateTime}
              onToggle={toggleExpand}
              totalParticipants={totalParticipants}
            />
          ))}
        </View>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => navigation.navigate("TimeSetting", { roomId })}>
        <Text style={styles.editButtonText}>수정하기</Text>
      </Pressable>
      <Pressable style={styles.toDashboardButton} onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.toDashboardButtonText}>목록으로</Text>
      </Pressable>
    </ScrollView>
  );
}


// 색상
const COLOR_PRIMARY = "dodgerblue";
const COLOR_SECONDARY = "gray";
const COLOR_WHITE = "#fff";

// 폰트
const FONT_SIZE_TITLE = 24;
const FONT_SIZE_RECOMMENDATION_TITLE = 20;
const FONT_SIZE_BUTTON = 16;
const FONT_WEIGHT_BOLD = "bold";

// 간격
const SPACING_CONTAINER = 20;
const SPACING_SECTION_TOP = 30;
const SPACING_RECOMMENDATION_BOTTOM = 15;
const SPACING_BUTTON_VERTICAL = 15;
const SPACING_BUTTON_BOTTOM = 10;

// 테두리
const BORDER_RADIUS_DEFAULT = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    paddingTop: SPACING_CONTAINER,
  },
  contentContainer: {
    padding: SPACING_CONTAINER,
  },
  title: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: FONT_WEIGHT_BOLD,
    marginBottom: SPACING_CONTAINER,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationContainer: {
    marginTop: SPACING_SECTION_TOP,
    paddingBottom: SPACING_CONTAINER,
  },
  recommendationTitle: {
    fontSize: FONT_SIZE_RECOMMENDATION_TITLE,
    fontWeight: FONT_WEIGHT_BOLD,
    marginBottom: SPACING_RECOMMENDATION_BOTTOM,
  },
  editButton: {
    backgroundColor: COLOR_PRIMARY,
    padding: SPACING_BUTTON_VERTICAL,
    marginHorizontal: SPACING_CONTAINER,
    marginBottom: SPACING_BUTTON_BOTTOM,
    borderRadius: BORDER_RADIUS_DEFAULT,
    alignItems: "center",
  },
  editButtonText: { color: COLOR_WHITE, fontSize: FONT_SIZE_BUTTON, fontWeight: FONT_WEIGHT_BOLD },
  toDashboardButton: {
    backgroundColor: COLOR_SECONDARY,
    padding: SPACING_BUTTON_VERTICAL,
    marginHorizontal: SPACING_CONTAINER,
    marginBottom: SPACING_CONTAINER,
    borderRadius: BORDER_RADIUS_DEFAULT,
    alignItems: "center",
  },
  toDashboardButtonText: { color: COLOR_WHITE, fontSize: FONT_SIZE_BUTTON, fontWeight: FONT_WEIGHT_BOLD },
});

export default ResultScreen;
