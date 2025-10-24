import { useState, useEffect, useMemo } from 'react';
import { LayoutAnimation } from 'react-native';
import { getRoomResult } from '../services/resultApi';

 // 약속 결과 데이터를 가져오고 UI에 맞게 가공하는 커스텀 훅
export function useResult(roomId) {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const [expandedSlotId, setExpandedSlotId] = useState(null); 

  // roomId가 변경될 때마다 서버에서 약속 결과 데이터를 가져옴
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getRoomResult(roomId);
        setResultData(data);
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
    if (!resultData) return null;
    return {
      counts: new Map(
        resultData.participantsInfo.map((slot) => [
          `${slot.date} ${slot.time}`,
          slot.availableCount,
        ])
      ),
      total: resultData.roomInfo.totalParticipants,
    };
  }, [resultData]);

  // TimeTable 컴포넌트에 전달할 전체 시간 목록을 생성
  const availableTimes = useMemo(() => {
    if (!resultData) return [];
    return resultData.dates.flatMap((date) =>
      resultData.timeSlots.map((time) => `${date} ${time}`)
    );
  }, [resultData]);


  // 가장 참여율이 높은 상위 3개의 시간대를 계산하고 각 시간대별 불참자 명단을 추가
  const topAvailableSlots = useMemo(() => {
    if (!resultData || !resultData.participantsInfo) return [];

    const allParticipants = resultData.allParticipants || [];

    return [...resultData.participantsInfo]
      .sort((a, b) => b.availableCount - a.availableCount)
      .slice(0, 3)
      .map((slot) => {
        const availableIds = new Set(slot.participants.map((p) => p.id));
        const unavailableParticipants = allParticipants.filter(
          (p) => !availableIds.has(p.id)
        );

        return {
          ...slot,
          dateTime: `${slot.date} ${slot.time}`,
          unavailableParticipants,
        };
      });
  }, [resultData]);

  // 추천 시간 카드의 확장/축소 상태를 토글
  const toggleExpand = (slotId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSlotId(expandedSlotId === slotId ? null : slotId);
  };

  return {
    isLoading,
    error,
    resultData,
    availabilityData,
    availableTimes,
    topAvailableSlots,
    expandedSlotId,
    toggleExpand
  };
}