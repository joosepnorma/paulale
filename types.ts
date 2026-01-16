import React from 'react';

export interface KeyConfig {
  label: string;
  code: string; // e.g., "KeyA", "Space"
  finger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
  hand: 'left' | 'right';
  width?: number; // relative width, default 1
}

export interface Level {
  id: number;
  title: string;
  description: string;
  characters: string[]; // Characters introduced/focused in this level
  content: string[]; // Hardcoded practice strings
  icon: string;
  color: string;
  isAI?: boolean; // If true, we fetch content from Gemini
}

export interface GameState {
  screen: 'menu' | 'playing' | 'results';
  currentLevelId: number;
  score: number;
  wpm: number;
  accuracy: number;
  history: { wpm: number; accuracy: number; date: string }[];
}

export interface KeyboardRow {
  keys: KeyConfig[];
  style?: React.CSSProperties;
}