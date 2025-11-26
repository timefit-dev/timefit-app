import { useState, useEffect, useMemo } from "react";
import { LayoutAnimation } from "react-native";
import {
  mockResultData,
  mockRoomConfig,
} from "../../../data/mockData";

// 약속 결과 데이터를 가져오고 UI에 맞게 가공하는 커스텀 훅
export function useResult(roomId) {
  const [resultData, setResultData] = useState(null);
  const [roomConfig, setRoomConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSlotId, setExpandedSlotId] = useState(null);
  const [sortOption, setSortOption] = useState("date"); // 'date' | 'count'

  // roomId가 변경될 때마다 서버에서 약속 결과 데이터를 가져옴
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        setError(null);

        setResultData(mockResultData);
        setRoomConfig(mockRoomConfig);
      } catch (err) {
        console.error("Failed to fetch result data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchResult();
    }
  }, [roomId]);

  // TimeTable 컴포넌트에 전달할 참여 가능 인원수 데이터를 가공
  const availabilityData = useMemo(() => {
    if (!resultData || !resultData.bestSlots) return null;
    return {
      counts: new Map(
        resultData.bestSlots.map((slot) => [
          `${slot.date} ${slot.time}`,
          slot.participants.length,
        ])
      ),
      total: resultData.totalParticipants,
    };
  }, [resultData]);

  // TimeTable 컴포넌트에 전달할 전체 시간 목록을 생성 (mockRoomConfig 기준)
  const allTimes = useMemo(() => {
    if (!roomConfig) return [];
    const times = [];
    roomConfig.dates.forEach((date) => {
      roomConfig.timeSlots.forEach((time) => {
        times.push(`${date} ${time}`);
      });
    });
    return times;
  }, [roomConfig]);

  // 상세 보기 데이터를 가공 (불참자 계산 및 정렬)
  const detailData = useMemo(() => {
    if (!resultData || !resultData.timeSlots) return [];
    
    const allParticipants = resultData.bestSlots && resultData.bestSlots.length > 0
      ? resultData.bestSlots[0].participants
      : [];

    const processedData = resultData.timeSlots.map((slot) => {
      const availableParticipantIds = new Set(
        slot.participants.map((p) => p.id)
      );

      // 불참자 계산: 전체 참가자 중 availableParticipantIds에 없는 사람
      const unavailableParticipants = allParticipants.filter(
        (p) => !availableParticipantIds.has(p.id)
      );

      return {
        ...slot,
        unavailableParticipants,
        unavailableCount: unavailableParticipants.length,
      };
    });

    // 정렬
    if (sortOption === "count") {
      // 가능 인원 순 (내림차순)
      return processedData.sort((a, b) => b.availableCount - a.availableCount);
    } else {
      // 날짜 순 (오름차순)
      return processedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }, [resultData, sortOption]);

  // 추천 시간 카드의 확장/축소 상태를 토글
  const toggleExpand = (slotId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSlotId(expandedSlotId === slotId ? null : slotId);
  };

  return {
    isLoading,
    error,
    resultData,
    roomConfig,
    availabilityData,
    allTimes,
    expandedSlotId,
    toggleExpand,
    detailData, // 상세 보기 데이터
    sortOption, // 정렬 옵션
    setSortOption, // 정렬 옵션 설정 함수
  };
}
