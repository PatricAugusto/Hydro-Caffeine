'use client';

import { useState, useCallback, useRef } from 'react';
import { randomFeedback } from '@/constants/feedback';
import type { DrinkType } from '@/types/tracker';

interface Bubble {
  id: string;
  text: string;
  type: DrinkType;
}

export function useFeedbackBubble() {
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const trigger = useCallback((type: DrinkType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setBubble({ id: crypto.randomUUID(), text: randomFeedback(type), type });

    timeoutRef.current = setTimeout(() => setBubble(null), 900);
  }, []);

  return { bubble, trigger };
}