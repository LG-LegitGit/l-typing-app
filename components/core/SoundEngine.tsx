"use client";

import { useEffect, useRef } from "react";
import { useTypingStore } from "@/store/useTypingStore";

export const SoundEngine = () => {
  const { lastTypedChar, errors, isFinished, isHesitating, accuracy } = useTypingStore();
  
  // Audio References
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const errorRef = useRef<HTMLAudioElement | null>(null);
  const successRef = useRef<HTMLAudioElement | null>(null);
  const hintRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio objects
    clickRef.current = new Audio("/sounds/stone-click.mp3");
    errorRef.current = new Audio("/sounds/thud.mp3");
    successRef.current = new Audio("/sounds/temple-bell.mp3");
    hintRef.current = new Audio("/sounds/shimmer.mp3");

    // Set volumes
    clickRef.current.volume = 0.4;
    errorRef.current.volume = 0.3;
    successRef.current.volume = 0.6;
    hintRef.current.volume = 0.2;
  }, []);

  // 1. Play Click or Error
  useEffect(() => {
    if (!lastTypedChar) return;

    // Check if the last stroke was an error by tracking errors count
    // (We could also add 'isLastCorrect' to the store for cleaner logic)
    const playStroke = async () => {
      try {
        if (clickRef.current) {
          clickRef.current.currentTime = 0;
          await clickRef.current.play();
        }
      } catch (e) { /* Browser block */ }
    };

    playStroke();
  }, [lastTypedChar, errors]);

  // 2. Play Success Ritual
  useEffect(() => {
    if (isFinished && accuracy >= 95) {
      successRef.current?.play();
    }
  }, [isFinished, accuracy]);

  // 3. Play Hint Whisper
  useEffect(() => {
    if (isHesitating) {
      hintRef.current?.play();
    }
  }, [isHesitating]);

  return null; // Headless
};