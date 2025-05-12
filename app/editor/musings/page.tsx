"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react";
import { useTimelineStore, TimelineState } from "../../lib/useTimelineStore";
import {
  Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, Plus, Folder, Scissors, RefreshCw, RotateCw, Layout, Maximize, Trash2, MonitorSmartphone, ListVideo, Mic, Upload, AlignJustify, X, File, Sparkles
} from "lucide-react"
import Image from "next/image"
import { Waveform } from "@/components/waveform"
import Link from "next/link"

export default function MusingsEditorPage() {
  const addClip = useTimelineStore((s: TimelineState) => s.addClip);
  const clips = useTimelineStore((s: TimelineState) => s.clips);

  useEffect(() => {
    if (!clips.some(c => c.id === "demo_video")) {
      addClip({
        id: "demo_video",
        type: "video",
        src: "/video/demo3_no_audio.mp4",
        start: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clips, addClip]);

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(86)
  const timelineRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isSfxPanelOpen, setIsSfxPanelOpen] = useState(false)
  const [sfxPrompt, setSfxPrompt] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)
  const [videoTrackHeight, setVideoTrackHeight] = useState(80);
  const [audioTrackHeight, setAudioTrackHeight] = useState(48);
  const [isResizingVideo, setIsResizingVideo] = useState(false);
  const [isResizingAudio, setIsResizingAudio] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  // ... (rest of the editor logic is the same as in the main editor page)

  // For brevity, you can copy the rest of the editor logic from app/editor/page.tsx
  // and replace the video src as above.

  // You may want to add a "Back" link for navigation:
  // <Link href="/editor" className="absolute left-4 top-4 z-30 text-blue-400 hover:underline">Back to Editor</Link>

  // ...

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      {/* Main content area */}
      <div className="flex flex-1 relative">
        {/* Main video area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative flex items-center justify-center">
            {clips.length > 0 && clips[0].type === "video" ? (
              <video
                ref={videoRef}
                src={clips[0].src}
                controls
                className="object-contain w-full max-h-[70vh]"
                style={{ background: '#000' }}
                autoPlay={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={e => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                onLoadedMetadata={e => setDuration((e.target as HTMLVideoElement).duration)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-black text-white">No video loaded</div>
            )}
          </div>

          {/* Timeline and controls */}
          <div className="bg-[#232323] border-t border-[#333333] flex flex-col">
            {/* Playback time and scrubber */}
            <div className="flex items-center px-4 h-12 border-b border-[#333333]">
              <div className="text-sm font-mono">
                {`${Math.floor(currentTime / 60).toString().padStart(2, "0")}:${Math.floor(currentTime % 60).toString().padStart(2, "0")}`} <span className="text-gray-500">/ {`${Math.floor(duration / 60).toString().padStart(2, "0")}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</span>
              </div>
              <div
                ref={timelineRef}
                className="flex-1 mx-4 h-1 bg-[#444444] relative cursor-pointer"
                onClick={e => {
                  if (timelineRef.current) {
                    const rect = timelineRef.current.getBoundingClientRect()
                    const position = (e.clientX - rect.left) / rect.width
                    setCurrentTime(Math.floor(position * duration))
                  }
                }}
              >
                <div
                  className="absolute h-full bg-blue-500"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full -mt-1"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex justify-center items-center h-12 border-b border-[#333333]">
              <button className="p-2 hover:bg-[#333333] rounded mx-1">
                <SkipBack size={20} />
              </button>
              <button className="p-2 hover:bg-[#333333] rounded mx-1">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 hover:bg-[#333333] rounded mx-1" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="p-2 hover:bg-[#333333] rounded mx-1">
                <ChevronRight size={20} />
              </button>
              <button className="p-2 hover:bg-[#333333] rounded mx-1">
                <SkipForward size={20} />
              </button>
              <div className="flex ml-auto mr-4 space-x-2">
                <button className="p-2 hover:bg-[#333333] rounded">
                  <Maximize size={16} />
                </button>
                <button className="p-2 hover:bg-[#333333] rounded">
                  <Layout size={16} />
                </button>
                <button className="p-2 hover:bg-[#333333] rounded">
                  <RotateCw size={16} />
                </button>
              </div>
            </div>

            {/* Timeline markers */}
            <div className="flex text-xs text-gray-500 px-4 h-6">
              {[".01", ".02", ".03", ".04", ".05", ".06", ".07", ".08", ".09"].map((marker, index) => (
                <div key={index} className="flex-1 text-center">
                  {marker}
                </div>
              ))}
            </div>

            {/* Video track: show video clips */}
            <div 
              className="mx-4 mt-1 bg-[#0c4a6e] border-2 border-orange-500 overflow-hidden relative" 
              style={{ height: `${videoTrackHeight}px` }}
            >
              <div className="flex h-full relative">
                {clips.filter(c => c.type === "video").map((clip, idx) => (
                  <div key={clip.id} className="h-full w-full relative flex items-center justify-center border-r border-blue-700">
                    <span className="text-sm font-medium text-white px-2">Muse Demo Reel</span>
                  </div>
                ))}
                <div
                  className="absolute h-full w-1 bg-blue-500"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              {/* Resize handle for video track */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-2 bg-[#333333] hover:bg-blue-500 cursor-ns-resize flex items-center justify-center"
                onMouseDown={e => {
                  setIsResizingVideo(true);
                  setStartY(e.clientY);
                  setStartHeight(videoTrackHeight);
                  e.preventDefault();
                }}
              >
                <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Audio track: show audio clips and play audio in sync */}
            {clips.some(c => c.type === "audio") && (
              <div 
                className="mx-4 mt-1 bg-[#232323] relative" 
                style={{ height: `${audioTrackHeight}px` }}
              >
                <div className="absolute left-0 top-0 text-xs text-green-400 px-1 z-10">🎵 Audio Clip</div>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-full bg-[#232323] overflow-hidden flex items-center">
                    <Waveform progress={currentTime / duration} />
                  </div>
                </div>
                {/* Render and sync the audio element */}
                {clips.filter(c => c.type === "audio").map((clip, idx) => (
                  <audio
                    key={clip.id}
                    ref={audioRef}
                    src={clip.src}
                    style={{ display: 'none' }}
                  />
                ))}
                {/* Resize handle for audio track */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2 bg-[#333333] hover:bg-blue-500 cursor-ns-resize flex items-center justify-center"
                  onMouseDown={e => {
                    setIsResizingAudio(true);
                    setStartY(e.clientY);
                    setStartHeight(audioTrackHeight);
                    e.preventDefault();
                  }}
                >
                  <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 