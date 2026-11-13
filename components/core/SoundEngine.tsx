"use client";

import { useEffect, useRef } from "react";
import { useTypingStore } from "@/store/useTypingStore";

// Browsers block audio until the user has interacted with the page, so every
// play() can reject. Swallow that rejection instead of surfacing a runtime error.
const play = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => { /* blocked before first interaction */ });
};

export const SoundEngine = () => {
  const { totalKeystrokes, isFinished, isHesitating, accuracy } = useTypingStore();

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

  // 1. Play Click or Error on every keystroke.
  // Keyed on the keystroke count (not the typed letter) so repeated letters
  // like "ששש" each make a sound.
  useEffect(() => {
    if (totalKeystrokes === 0) return;
    const { lastStrokeCorrect } = useTypingStore.getState();
    play(lastStrokeCorrect === false ? errorRef.current : clickRef.current);
  }, [totalKeystrokes]);

  // 2. Play Success Ritual
  useEffect(() => {
    if (isFinished && accuracy >= 95) play(successRef.current);
  }, [isFinished, accuracy]);

  // 3. Play Hint Whisper
  useEffect(() => {
    if (isHesitating) play(hintRef.current);
  }, [isHesitating]);

  return null; // Headless
};
