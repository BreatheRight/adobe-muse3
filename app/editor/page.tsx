"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react";
// Video asset is referenced via public URL for best compatibility.
const defaultVideo = "/video/demo2_no_audio.mp4";
import { useTimelineStore, TimelineState } from "../lib/useTimelineStore";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Plus,
  Folder,
  Scissors,
  RefreshCw,
  RotateCw,
  Layout,
  Maximize,
  Trash2,
  MonitorSmartphone,
  ListVideo,
  Mic,
  Upload,
  AlignJustify,
  X,
  File,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { Waveform } from "@/components/waveform"
import Link from "next/link"



export default function EditorPage() {
  const addClip = useTimelineStore((s: TimelineState) => s.addClip);
  const clips = useTimelineStore((s: TimelineState) => s.clips);

  useEffect(() => {
    console.log('Timeline clips:', clips);
  }, [clips]);

  useEffect(() => {
    if (!clips.some(c => c.id === "demo_video")) {
      addClip({
        id: "demo_video",
        type: "video",
        src: "/video/demo2_no_audio.mp4",
        start: 0,
      });
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clips, addClip]);

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // in seconds
  const [duration, setDuration] = useState(86) // 01:26 in seconds
  const timelineRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isSfxPanelOpen, setIsSfxPanelOpen] = useState(false)
  const [sfxPrompt, setSfxPrompt] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)
  const [videoTrackHeight, setVideoTrackHeight] = useState(80); // Default 80px (was h-20)
  const [audioTrackHeight, setAudioTrackHeight] = useState(48); // Default 48px (was h-12)
  const [isResizingVideo, setIsResizingVideo] = useState(false);
  const [isResizingAudio, setIsResizingAudio] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [isProjectsPanelOpen, setIsProjectsPanelOpen] = useState(false);

  // Sync video/audio currentTime when state changes
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 0.1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Sync play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Add audio clip to timeline and close SFX panel
  const [isGenerating, setIsGenerating] = useState(false);
  async function handleGenerate() {
    setIsGenerating(true);
    addClip({
      id: `gen_audio_${Date.now()}`,
      type: "audio",
      src: "/audio/demo2.mp3",
      start: 0
    });
    setIsGenerating(false);
    setIsSfxPanelOpen(false);
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const position = (e.clientX - rect.left) / rect.width
      setCurrentTime(Math.floor(position * duration))
    }
  }

  const timeMarkers = [".01", ".02", ".03", ".04", ".05", ".06", ".07", ".08", ".09"]
  const progress = currentTime / duration

  const toggleSfxPanel = () => {
    setIsSfxPanelOpen(!isSfxPanelOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSfxPanelOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsSfxPanelOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSfxPanelOpen])

  // Handle resize start for video track
  const handleVideoResizeStart = (e: React.MouseEvent) => {
    setIsResizingVideo(true);
    setStartY(e.clientY);
    setStartHeight(videoTrackHeight);
    e.preventDefault();
  };
  
  // Handle resize start for audio track
  const handleAudioResizeStart = (e: React.MouseEvent) => {
    setIsResizingAudio(true);
    setStartY(e.clientY);
    setStartHeight(audioTrackHeight);
    e.preventDefault();
  };
  
  // Handle mouse move while resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingVideo) {
        const diff = e.clientY - startY;
        const newHeight = Math.max(40, startHeight + diff); // Minimum 40px height
        setVideoTrackHeight(newHeight);
      } else if (isResizingAudio) {
        const diff = e.clientY - startY;
        const newHeight = Math.max(30, startHeight + diff); // Minimum 30px height
        setAudioTrackHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      setIsResizingVideo(false);
      setIsResizingAudio(false);
    };
    
    if (isResizingVideo || isResizingAudio) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingVideo, isResizingAudio, startY, startHeight]);

  const toggleProjectsPanel = () => {
    setIsProjectsPanelOpen(!isProjectsPanelOpen);
  };
  
  // Recent projects data
  const recentProjects = [
    { name: "Brand Identity_NIKE_v1.0.prproj", date: "2 days ago" },
    { name: "Eternal Sunshine Short Film.prproj", date: "1 week ago" },
    { name: "RuslanTOPSECRET.prproj", date: "2 weeks ago" },
    { name: "Musings.prproj", date: "1 month ago" }
  ];

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
                {formatTime(currentTime)} <span className="text-gray-500">/ {formatTime(duration)}</span>
              </div>

              <div
                ref={timelineRef}
                className="flex-1 mx-4 h-1 bg-[#444444] relative cursor-pointer"
                onClick={handleTimelineClick}
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
              <button className="p-2 hover:bg-[#333333] rounded mx-1" onClick={togglePlayPause}>
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
              {timeMarkers.map((marker, index) => (
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
                onMouseDown={handleVideoResizeStart}
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
                    {/* Optionally, show a waveform for each audio clip */}
                    <Waveform progress={progress} />
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
                  onMouseDown={handleAudioResizeStart}
                >
                  <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right toolbar */}
        <div className="w-12 bg-[#232323] flex flex-col items-center py-2 space-y-4 z-20 relative">
          <button className="p-2 hover:bg-[#333333] rounded">
            <Plus size={20} />
          </button>
          <button 
            className={`p-2 hover:bg-[#333333] rounded ${isProjectsPanelOpen ? "bg-[#333333]" : ""} relative overflow-hidden group`}
            onClick={toggleProjectsPanel}
            id="folder-icon"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep" />
            <Folder size={20} />
          </button>
          <button className="p-2 hover:bg-[#333333] rounded">
            <Scissors size={20} />
          </button>
          <button className="p-2 hover:bg-[#333333] rounded">
            <RefreshCw size={20} />
          </button>
          <button className="p-2 hover:bg-[#333333] rounded" id="trash-icon">
            <Layout size={20} />
          </button>
          <button
            className={`p-2 hover:bg-[#333333] rounded ${isSfxPanelOpen ? "bg-[#333333]" : ""} relative overflow-hidden group`}
            onClick={toggleSfxPanel}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep" />
            <Image src="/images/circular-icon.png" alt="Generate SFX" width={32} height={32} />
          </button>
          <div className="flex-1"></div>
          <button className="p-2 hover:bg-[#333333] rounded">
            <MonitorSmartphone size={20} />
          </button>
          <button className="p-2 hover:bg-[#333333] rounded">
            <ListVideo size={20} />
          </button>
        </div>
        
        {/* Recent Projects Sliding Panel */}
        <div 
          className={`fixed bg-[#1e1e1e] border-l border-[#333333] shadow-lg transition-transform duration-300 ease-in-out z-10
            ${isProjectsPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            width: '16rem',
            right: '3rem',
            top: '3.7rem', // aligns with folder icon
            height: '18.5rem', // matches screenshot height (about 216px)
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}
        >
          <div className="p-4 border-b border-[#333333]">
            <h3 className="text-lg font-medium">Recent Projects</h3>
          </div>
          
          <div className="overflow-y-auto py-2">
            {recentProjects.map((project, index) => (
              project.name === "Musings.prproj" ? (
                <Link href="/editor/musings" key={index} legacyBehavior>
                  <a className="px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer flex items-start">
                    <File size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white leading-tight">{project.name}</p>
                      <p className="text-xs text-gray-400">{project.date}</p>
                    </div>
                  </a>
                </Link>
              ) : (
                <div 
                  key={index} 
                  className="px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer flex items-start"
                >
                  <File size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white leading-tight">{project.name}</p>
                    <p className="text-xs text-gray-400">{project.date}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* SFX Generation Panel */}
      {isSfxPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={panelRef} className="bg-[#1a1a1a] rounded-lg w-full max-w-lg mx-4 shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium">Generate SFX</h2>
                <button className="text-gray-400 hover:text-white" onClick={() => setIsSfxPanelOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-lg mb-2">Prompt</label>
                <textarea
                  className="w-full bg-[#121212] border border-[#333333] rounded-md p-4 text-white/70 focus:text-white h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/70"
                  placeholder="What do you hear?"
                  value={sfxPrompt}
                  onChange={(e) => setSfxPrompt(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <button className="w-full bg-[#1e1e1e] border border-[#333333] rounded-md p-3 flex items-center justify-between text-left">
                  <div className="flex items-center">
                    <AlignJustify className="mr-2" size={18} />
                    <span>Subject Selection</span>
                  </div>
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-lg mb-2">Reference Audio</label>
                <div className="border border-dashed border-[#444444] rounded-md p-8 flex flex-col items-center justify-center text-gray-400">
                  <Upload size={24} className="mb-2" />
                  <p>Drop file here to upload</p>
                </div>
              </div>

              <div className="mb-6 flex justify-center">
                <button className="bg-[#1e1e1e] border border-[#333333] rounded-full py-2 px-6 flex items-center">
                  <Mic className="mr-2" size={18} />
                  <span>Record Audio</span>
                </button>
              </div>

              <div className="flex justify-end items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#232323] hover:bg-[#333] border border-[#333333] transition-colors"
                  title="Magic"
                >
                  <Sparkles size={16} className="text-yellow-300" />
                </button>
                <button
                  className="bg-blue-600 rounded-full py-2 px-8 hover:bg-blue-700"
                  onClick={handleGenerate}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
