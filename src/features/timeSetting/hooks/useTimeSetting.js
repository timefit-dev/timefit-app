import { useEffect, useState } from "react";
import { getRoomInfo, postAvailableTimes } from "../services/timeSettingApi";

export function useTimeSetting(roomId) {
  const [room, setRoom] = useState(null);
  const [times, setTimes] = useState([]);
  const [selected, setSelected] = useState(new Set());

  // 방 정보 불러오기
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const data = await getRoomInfo(roomId);
      
      setRoom(data);

      if (data && data.dates && data.timeSlots) {
        const generatedTimes = data.dates.flatMap((date) =>
          data.timeSlots.map((time) => `${date} ${time}`)
        );
        console.log(generatedTimes);
        setTimes(generatedTimes);
      }
    };

    fetchRoomInfo();
  }, [roomId]);

  // 시간 토글
  const toggle = (t) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  // 등록하기
  const submit = async () => {
    const result = await postAvailableTimes(roomId, Array.from(selected));
    return result.success;
  };

  return { room, times, selected, toggle, submit };
}