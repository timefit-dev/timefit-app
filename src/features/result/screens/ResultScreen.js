import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TimeTable,
  DAY_CELL_WIDTH,
  CELL_HEIGHT,
  CELL_BORDER_WIDTH,
  CELL_BORDER_COLOR,
} from "../../../shared/components/TimeTable";
import { useResult } from "../hooks/useResult";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const ResultCell = React.memo(function ResultCell({ dateTime, availability }) {
  const cellStyle = React.useMemo(() => {
    const count = availability?.counts.get(dateTime);
    // count가 undefined이면 0으로 처리, 0보다 크면 색상 표시
    if (count != null && count > 0) {
      const total = availability.total || 1;
      // 최소 투명도 0.2 보장
      const opacity = Math.max(0.2, count / total);
      return {
        backgroundColor: `rgba(30, 144, 255, ${opacity})`,
      };
    }
    return {};
  }, [availability, dateTime]);

  return <View style={[styles.cell, cellStyle]} />;
});

export function ResultScreen({ route }) {
  const navigation = useNavigation();
  const { roomId = 1 } = route.params || {};

  const {
    isLoading,
    error,
    resultData,
    availabilityData,
    allTimes,
    detailData,
    sortOption,
    setSortOption,
  } = useResult(roomId);

  const [activeTab, setActiveTab] = useState("timetable"); // 'timetable' | 'detail'

  const sortOptions = [
    { title: "날짜순", value: "date" },
    { title: "가능인원 순", value: "count" },
  ];

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>데이터를 불러오는 데 실패했습니다.</Text>
      </View>
    );
  }

  const renderDetailView = () => {
    return (
      <View style={styles.detailContainer}>
        <SelectDropdown
          data={sortOptions}
          onSelect={(selectedItem, index) => {
            setSortOption(selectedItem.value);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem
                    ? selectedItem.title
                    : sortOption === "date"
                    ? "날짜 순"
                    : "가능인원 순"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        {detailData.map((slot, index) => (
          <View key={index} style={styles.detailCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.detailDate}>
                {slot.date.substring(5)} {slot.time}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.participantSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.participantLabel}>
                  가능한 사람 ({slot.availableCount}명)
                </Text>
              </View>
              <View style={styles.chipContainer}>
                {slot.participants.map((p) => (
                  <View key={p.id} style={[styles.chip, styles.availableChip]}>
                    <Image
                      source={{ uri: p.profileImage }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.availableChipText}>{p.nickname}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.participantSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.participantLabel]}>
                  불가능한 사람 ({slot.unavailableCount}명)
                </Text>
              </View>
              <View style={styles.chipContainer}>
                {slot.unavailableParticipants.length > 0 ? (
                  slot.unavailableParticipants.map((p) => (
                    <View
                      key={p.id}
                      style={[styles.chip, styles.unavailableChip]}
                    >
                      <Image
                        source={
                          p.profileImage
                            ? { uri: p.profileImage }
                            : p.avatar || { uri: "https://via.placeholder.com/150" }
                        }
                        style={styles.profileImage}
                      />
                      <Text style={styles.unavailableChipText}>
                        {p.nickname || p.name}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>없음</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>결과</Text>
        <Text style={styles.roomName}>
          {resultData ? resultData.title : "방 제목"}
        </Text>
      </View>

      {/* 탭 UI */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "timetable" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("timetable")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "timetable" && styles.activeTabText,
            ]}
          >
            시간표
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "detail" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("detail")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "detail" && styles.activeTabText,
            ]}
          >
            자세히 보기
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === "timetable" ? (
          <View s tyle={styles.timetableContainer}>
            <TimeTable
              times={allTimes}
              renderCell={({ date, time }) => {
                const dateTime = `${date} ${time}`;
                return (
                  <ResultCell
                    key={dateTime}
                    dateTime={dateTime}
                    availability={availabilityData}
                  />
                );
              }}
            />
          </View>
        ) : (
          renderDetailView()
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate("TimeSetting", { roomId })}
        >
          <Text style={styles.editButtonText}>수정하기</Text>
        </Pressable>
        <Pressable
          style={styles.toDashboardButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.toDashboardButtonText}>목록으로</Text>
        </Pressable>
      </View>
    </View>
  );
}

// 색상
const COLOR_PRIMARY = "dodgerblue";
const COLOR_SECONDARY = "gray";
const COLOR_WHITE = "#fff";
const COLOR_LIGHT_GRAY = "#f9f9f9"; // 탭 배경 등

// 폰트
const FONT_SIZE_TITLE = 24;
const FONT_SIZE_BUTTON = 16;
const FONT_WEIGHT_BOLD = "bold";

// 간격
const SPACING_CONTAINER = 20;
const SPACING_BUTTON_VERTICAL = 15;
const SPACING_BUTTON_BOTTOM = 10;

// 테두리
const BORDER_RADIUS_DEFAULT = 10;

const styles = StyleSheet.create({
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#eee" },
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  roomName: { fontSize: 16, color: "gray", marginTop: 4 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timetableContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  cell: {
    width: DAY_CELL_WIDTH,
    height: CELL_HEIGHT,
    borderWidth: CELL_BORDER_WIDTH,
    borderColor: CELL_BORDER_COLOR,
  },

  // 탭 스타일
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: COLOR_PRIMARY,
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: COLOR_PRIMARY,
    fontWeight: "bold",
  },
  detailContainer: {
    padding: 20,
  },
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e6e6e6ff",
  },
  detailDate: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 15,
  },
  participantSection: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  participantLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  chip: {
    flexDirection: "row", // 가로 정렬 → 이미지 왼쪽 / 텍스트 오른쪽
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "flex-start",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
    backgroundColor: "#e6e6e6",
  },
  emptyText: {
    fontSize: 14,
    color: "gray",
  },
  editButton: {
    backgroundColor: COLOR_PRIMARY,
    padding: SPACING_BUTTON_VERTICAL,
    marginHorizontal: SPACING_CONTAINER,
    marginBottom: SPACING_BUTTON_BOTTOM,
    borderRadius: BORDER_RADIUS_DEFAULT,
    alignItems: "center",
  },
  editButtonText: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_BUTTON,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  toDashboardButton: {
    backgroundColor: COLOR_SECONDARY,
    padding: SPACING_BUTTON_VERTICAL,
    marginHorizontal: SPACING_CONTAINER,
    marginBottom: SPACING_CONTAINER,
    borderRadius: BORDER_RADIUS_DEFAULT,
    alignItems: "center",
  },
  toDashboardButtonText: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_BUTTON,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  buttonContainer: { marginTop: 20, marginBottom: 20 },
});

export default ResultScreen;
