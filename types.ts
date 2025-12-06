import React from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgImage: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isError?: boolean;
}

export enum AppState {
  HOME = 'HOME',
  MATH_SOLVER = 'MATH_SOLVER',
  EXAMS = 'EXAMS',
  GAMES = 'GAMES',
  SCIENTISTS = 'SCIENTISTS',
  ERROR_ANALYSIS = 'ERROR_ANALYSIS'
}