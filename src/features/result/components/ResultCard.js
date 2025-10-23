import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// 결과 화면 카드 및 관련 컴포넌트에서 사용하는 테마
export const resultTheme = {
  colors: {
    primary: "dodgerblue",
    secondary: "gray",
    text: "#333",
    textSecondary: "#555",
    textMuted: "#999",
    border: "#eee",
    background: "#f9f9f9",
    white: "#fff",
    success: "#e0f8e9",
    danger: "#fde2e2",
  },
  spacing: {
    xs: 4,
    sm: 8,
    smed: 6, // small-medium, 6px 간격
    md: 10,
    lg: 15,
    container: 20,
    section: 30,
    buttonVertical: 15,
    buttonBottom: 10,
  },
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    lg: 15,
    xl: 16,
    h3: 20,
    title: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    default: 10,
  },
};

// ResultCard 컴포넌트의 스타일
const cardStyles = StyleSheet.create({
  slotItem: {
    backgroundColor: resultTheme.colors.background,
    borderRadius: resultTheme.borderRadius.md,
    marginBottom: resultTheme.spacing.md,
    padding: resultTheme.spacing.lg,
    borderWidth: 1,
    borderColor: resultTheme.colors.border,
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotRank: {
    fontSize: resultTheme.fontSize.base,
    fontWeight: 'bold',
    color: resultTheme.colors.primary,
    width: 50,
  },
  slotDateTime: {
    flex: 1,
    fontSize: resultTheme.fontSize.lg,
    fontWeight: '500',
    color: resultTheme.colors.text,
  },
  slotCount: {
    fontSize: resultTheme.fontSize.base,
    color: resultTheme.colors.textSecondary,
  },
  slotDetails: {
    marginTop: resultTheme.spacing.lg,
    paddingTop: resultTheme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: resultTheme.colors.border,
  },
  participantSection: {
    marginBottom: resultTheme.spacing.md,
  },
  participantTitle: {
    fontSize: resultTheme.fontSize.base,
    fontWeight: '600',
    marginBottom: resultTheme.spacing.sm,
  },
  participantList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantName: {
    borderRadius: resultTheme.borderRadius.sm,
    paddingVertical: resultTheme.spacing.xs,
    paddingHorizontal: resultTheme.spacing.sm,
    marginRight: resultTheme.spacing.smed,
    marginBottom: resultTheme.spacing.smed,
    fontSize: resultTheme.fontSize.sm,
  },
  availableParticipantName: {
    backgroundColor: resultTheme.colors.success,
  },
  unavailableParticipantName: {
    backgroundColor: resultTheme.colors.danger,
  },
  noParticipantText: {
    color: resultTheme.colors.textMuted,
    fontSize: resultTheme.fontSize.sm,
  },
});

// 참여자 목록(가능/불가능)을 렌더링하는 함수
function renderParticipantList(title, participants, isAvailable) {
  const safeParticipants = Array.isArray(participants) ? participants : [];

  return (
    <View style={cardStyles.participantSection}>
      <Text style={cardStyles.participantTitle}>
        {title} ({safeParticipants.length}명)
      </Text>
      {safeParticipants.length > 0 ? (
        <View style={cardStyles.participantList}>
          {safeParticipants.map((participant) => (
            <Text
              key={participant.id}
              style={[
                cardStyles.participantName,
                isAvailable ? cardStyles.availableParticipantName : cardStyles.unavailableParticipantName,
              ]}
            >
              {participant.nickname}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={cardStyles.noParticipantText}>-</Text>
      )}
    </View>
  );
}

// 추천 시간대를 보여주는 카드 컴포넌트
export function ResultCard({ slot, index, isExpanded, onToggle, totalParticipants }) {
  if (!slot) {
    return null;
  }

  return (
    <View style={cardStyles.slotItem}>
      {/* 추천 시간 헤더 - 누르면 확장/축소 */}
      <Pressable
        style={({ pressed }) => [
          cardStyles.slotHeader,
          { opacity: pressed ? 0.7 : 1.0 },
        ]}
        onPress={() => onToggle(slot.dateTime)}
      >
        <Text style={cardStyles.slotRank}>{index + 1}</Text>
        <Text style={cardStyles.slotDateTime}>{slot.dateTime}</Text>
        <Text style={cardStyles.slotCount}>
          {slot.availableCount} / {totalParticipants} 명
        </Text>
      </Pressable>
      {/* 확장 시 보이는 정보 */}
      {isExpanded && (
        <View style={cardStyles.slotDetails}>
          {renderParticipantList("가능한 사람", slot.participants, true)}
          {renderParticipantList("불가능한 사람", slot.unavailableParticipants, false)}
        </View>
      )}
    </View>
  );
}

export default ResultCard;
