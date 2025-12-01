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
                      source={{ uri: p.profileImage }}
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
          style={[styles.commonButton, styles.editButton]}
          onPress={() => navigation.navigate("TimeSetting", { roomId })}
        >
          <Text style={styles.buttonText}>수정하기</Text>
        </Pressable>
        <Pressable
          style={[styles.commonButton, styles.toDashboardButton]}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.buttonText}>목록으로</Text>
        </Pressable>
      </View>
    </View>
  );
}

// --- Constants ---
// Colors
const COLOR_PRIMARY = "dodgerblue";
const COLOR_SECONDARY = "gray";
const COLOR_WHITE = "#fff";
const COLOR_LIGHT_GRAY = "#f9f9f9";
const COLOR_BORDER = "#eee";
const COLOR_BORDER_DARK = "#ccc";
const COLOR_TEXT_PRIMARY = "#151E26";
const COLOR_TEXT_SECONDARY = "gray";
const COLOR_CHIP_BG_AVAILABLE = "#e3f2fd";
const COLOR_CHIP_BG_UNAVAILABLE = "#ffebee";
const COLOR_PROFILE_BG = "#e6e6e6";

// Fonts
const FONT_SIZE_XS = 12;
const FONT_SIZE_SM = 14;
const FONT_SIZE_MD = 16;
const FONT_SIZE_LG = 18;
const FONT_SIZE_XL = 24;
const FONT_WEIGHT_BOLD = "bold";
const FONT_WEIGHT_SEMIBOLD = "600";
const FONT_WEIGHT_MEDIUM = "500";

// Spacing
const SPACING_XS = 4;
const SPACING_SM = 8;
const SPACING_MD = 12;
const SPACING_LG = 20;
const SPACING_XL = 24;

// Dimensions
const BORDER_RADIUS_SM = 8;
const BORDER_RADIUS_MD = 10;
const BORDER_RADIUS_LG = 16;
const PROFILE_SIZE = 24;
const BUTTON_HEIGHT = 50; // Unified button height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  contentContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Header
  header: {
    padding: SPACING_LG,
    borderBottomWidth: 1,
    borderColor: COLOR_BORDER,
  },
  title: {
    fontSize: FONT_SIZE_XL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: COLOR_TEXT_PRIMARY,
  },
  roomName: {
    fontSize: FONT_SIZE_MD,
    color: COLOR_TEXT_SECONDARY,
    marginTop: SPACING_XS,
  },

  // Tab
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: COLOR_BORDER,
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
    fontSize: FONT_SIZE_MD,
    color: COLOR_TEXT_SECONDARY,
  },
  activeTabText: {
    color: COLOR_PRIMARY,
    fontWeight: FONT_WEIGHT_BOLD,
  },

  // Timetable
  timetableContainer: {
    marginTop: SPACING_LG,
    marginBottom: SPACING_LG,
  },
  cell: {
    width: DAY_CELL_WIDTH,
    height: CELL_HEIGHT,
    borderWidth: CELL_BORDER_WIDTH,
    borderColor: CELL_BORDER_COLOR,
  },

  // Detail View
  detailContainer: {
    padding: SPACING_LG,
  },
  
  // Dropdown
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    backgroundColor: COLOR_WHITE,
    borderRadius: BORDER_RADIUS_SM,
    borderWidth: 1,
    borderColor: COLOR_BORDER_DARK,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING_MD,
    marginBottom: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: COLOR_TEXT_PRIMARY,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
    color: COLOR_TEXT_PRIMARY,
  },
  dropdownMenuStyle: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BORDER_RADIUS_SM,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: SPACING_MD,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING_SM,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: COLOR_TEXT_PRIMARY,
  },

  // Detail Card
  detailCard: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BORDER_RADIUS_LG,
    padding: SPACING_LG,
    marginBottom: SPACING_LG,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  cardHeader: {
    marginBottom: SPACING_MD,
  },
  detailDate: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: SPACING_MD,
  },
  participantSection: {
    marginBottom: SPACING_MD,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING_SM,
  },
  participantLabel: {
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    color: COLOR_TEXT_PRIMARY,
  },
  
  // Chips
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING_SM,
    justifyContent: "flex-start",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  availableChip: {
    backgroundColor: COLOR_CHIP_BG_AVAILABLE,
  },
  unavailableChip: {
    backgroundColor: COLOR_CHIP_BG_UNAVAILABLE,
  },
  availableChipText: {
    fontSize: FONT_SIZE_SM,
    color: "#1565c0",
    fontWeight: "500",
  },
  unavailableChipText: {
    fontSize: FONT_SIZE_SM,
    color: "#c62828",
    fontWeight: "500",
  },
  profileImage: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE / 2,
    marginRight: SPACING_SM,
    backgroundColor: COLOR_PROFILE_BG,
  },
  emptyText: {
    fontSize: FONT_SIZE_SM,
    color: COLOR_TEXT_SECONDARY,
    fontStyle: "italic",
  },

  // Buttons
  buttonContainer: {
    marginTop: SPACING_LG,
    marginBottom: SPACING_LG,
  },
  commonButton: {
    paddingVertical: 15,
    marginHorizontal: SPACING_LG,
    borderRadius: BORDER_RADIUS_MD,
    alignItems: "center",
    justifyContent: "center",
    height: BUTTON_HEIGHT,
  },
  editButton: {
    backgroundColor: COLOR_PRIMARY,
    marginBottom: 10,
  },
  toDashboardButton: {
    backgroundColor: COLOR_SECONDARY,
    marginBottom: SPACING_LG,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_BOLD,
  },
});

export default ResultScreen;
