import { useRef, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
}

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe
const SWIPE_VELOCITY_THRESHOLD = 0.3; // Minimum velocity (px/ms)
const MAX_VERTICAL_RATIO = 0.75; // Max vertical/horizontal ratio to count as horizontal swipe

export function useTouchSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const touchState = useRef<TouchState | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchState.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocity = absX / deltaTime;

    // Check if it's a valid horizontal swipe
    const isHorizontalSwipe = 
      absX > SWIPE_THRESHOLD && 
      velocity > SWIPE_VELOCITY_THRESHOLD &&
      absY / absX < MAX_VERTICAL_RATIO;

    if (isHorizontalSwipe) {
      if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      }
    }

    touchState.current = null;
  }, [onSwipeLeft, onSwipeRight]);

  const handleTouchCancel = useCallback(() => {
    touchState.current = null;
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  };
}
