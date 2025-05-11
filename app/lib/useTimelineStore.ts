import { create } from "zustand";

export type Clip = {
  id: string;
  type: "video" | "audio";
  src: string;
  start: number; // seconds
  prompt?: string; // optional: store prompt for audio clips
};

export interface TimelineState {
  clips: Clip[];
  addClip: (clip: Clip) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  clips: [],
  addClip: (clip) =>
    set((s) => ({ clips: [...s.clips, clip] }))
}));
