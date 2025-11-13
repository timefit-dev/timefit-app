import { useRef, useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  DAY_CELL_WIDTH,
  CELL_HEIGHT,
  TIME_LABEL_CELL_WIDTH,
} from "../../../shared/components/TimeTable";

const DRAG_ACTIVATION_THRESHOLD = 6; // 드래그로 간주하기 위한 최소 이동 거리 (픽셀 단위)

// 시간표(TimeTable)에서 드래그하여 셀을 선택하는 로직을 관리하는 커스텀 훅
export function useDragSelection({
  dates,
  timeSlots,
  selected,
  setSelectionForCells,
}) {
  // ScrollView 컴포넌트를 참조하여 스크롤 위치 등을 제어
  const scrollRef = useRef(null);
  // 드래그 상태(모드, 시작 셀, 방문한 셀 등)를 관리. 리렌더링을 유발하지 않기 위해 ref 사용
  const dragStateRef = useRef({
    mode: null,
    visited: new Set(),
    startCell: null,
    activated: false,
  });
  // 시간표 헤더의 높이를 저장하여 셀 좌표 계산에 사용
  const headerHeightRef = useRef(CELL_HEIGHT);
  // 수평 스크롤의 현재 위치를 저장
  const scrollOffsetRef = useRef(0);

  // --- 드래그 상태 관리 ---
  // 드래그 상태를 초기화하는 함수
  const resetDragState = useCallback(() => {
    dragStateRef.current = {
      mode: null,
      visited: new Set(),
      startCell: null,
      activated: false,
    };
  }, []);

  // --- 이벤트 핸들러 ---
  // 시간표 헤더의 레이아웃이 결정될 때 높이를 저장
  const handleHeaderLayout = useCallback((event) => {
    headerHeightRef.current = event.nativeEvent.layout.height;
  }, []);

  const handleScroll = useCallback((event) => {
    scrollOffsetRef.current = event.nativeEvent.contentOffset.x;
  }, []);

  // --- 핵심 로직 ---
  // 터치 이벤트의 좌표(x, y)를 기반으로 해당하는 셀의 고유 키(예: "2025-01-01 10:00")를 반환
  const getCellKey = useCallback(
    (nativeEvent) => {
      if (
        !dates ||
        dates.length === 0 ||
        !timeSlots ||
        timeSlots.length === 0
      ) {
        return null;
      }

      const { x, y } = nativeEvent;
      const adjustedX = x + scrollOffsetRef.current;
      const adjustedY = y;
      const headerHeight = headerHeightRef.current;

      if (adjustedX < TIME_LABEL_CELL_WIDTH || adjustedY < headerHeight) {
        return null;
      }

      const columnIndex = Math.floor(
        (adjustedX - TIME_LABEL_CELL_WIDTH) / DAY_CELL_WIDTH
      );
      const rowIndex = Math.floor((adjustedY - headerHeight) / CELL_HEIGHT);

      if (
        columnIndex < 0 ||
        columnIndex >= dates.length ||
        rowIndex < 0 ||
        rowIndex >= timeSlots.length
      ) {
        return null;
      }

      const date = dates[columnIndex];
      const time = timeSlots[rowIndex];
      return `${date} ${time}`;
    },
    [dates, timeSlots]
  );

  // 주어진 셀 키에 대해 선택 또는 해제 로직을 적용
  const applyDragSelection = useCallback(
    (cellKey) => {
      if (!cellKey) return;

      const dragState = dragStateRef.current;
      // if (!dragState.mode) {
      //   dragState.mode = selected.has(cellKey) ? "deselect" : "select";
      // }

      // 한 번의 드래그 동안 동일한 셀을 중복 처리하지 않도록 방지
      if (dragState.visited.has(cellKey)) return;

      dragState.visited.add(cellKey);
      const shouldSelect = dragState.mode === "select";
      setSelectionForCells([cellKey], shouldSelect);
    },
    [selected, setSelectionForCells]
  );

  // --- 제스처 정의 ---
  // Pan(드래그) 제스처를 정의하고 각 단계별 콜백을 설정
  const dragSelectionGesture = useMemo(
    () =>
      Gesture.Pan()
        // 제스처가 시작될 때: 드래그 상태를 초기화하고 시작 셀을 기록
        .onBegin((event) => {
          resetDragState();
          const cellKey = getCellKey(event);
          if (!cellKey) return;

          const isAlreadySelected = selected.has(cellKey);
          dragStateRef.current.mode = isAlreadySelected ? "deselect" : "select";
          dragStateRef.current.startCell = cellKey;
        })

        // 제스처가 진행 중일 때: 드래그가 일정 거리 이상 움직이면 활성화하고, 셀 선택 로직을 적용
        .onUpdate((event) => {
          const { translationX = 0, translationY = 0 } = event;
          const dragState = dragStateRef.current;

          // 사용자가 약간만 움직였을 경우(단순 터치) 드래그로 간주하지 않음
          if (!dragState.activated) {
            const traveled = Math.max(
              Math.abs(translationX),
              Math.abs(translationY)
            );
            if (traveled >= DRAG_ACTIVATION_THRESHOLD) {
              dragState.activated = true;
              // 드래그가 활성화되면 시작점이었던 셀부터 선택/해제 적용
              if (dragState.startCell) {
                applyDragSelection(dragState.startCell);
              }
            } else {
              return;
            }
          }

          const cellKey = getCellKey(event);
          applyDragSelection(cellKey);
        })

        // 제스처가 끝났을 때: 드래그 상태를 초기화
        .onEnd(resetDragState)

        // 모든 콜백을 JS 스레드에서 실행하도록 설정 (React 상태 업데이트를 위함)
        .runOnJS(true),
    [getCellKey, applyDragSelection, resetDragState]
  );

  return {
    scrollRef,
    dragSelectionGesture,
    handleHeaderLayout,
    handleScroll,
  };
}
