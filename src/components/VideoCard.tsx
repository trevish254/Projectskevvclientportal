import React, { useState } from 'react';
import {
  Camera,
  Headphones,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GlassCard } from './GlassCard.tsx';
import { BlobContainer } from './BlobContainer.tsx';
import { RecorderBlob } from './RecorderBlob.tsx';
import { StudentThumb } from '../types.ts';

const STUDENTS: StudentThumb[] = [
  {
    id: 'sophia',
    name: 'Sophia',
    avatar:
      'https://framerusercontent.com/images/UdLuwJVnNqzikbdCbwoMH6YMu4.png',
  },
  {
    id: 'jack',
    name: 'Jack',
    avatar:
      'https://framerusercontent.com/images/k69zlZLfKDyfEsIVIyZYZwUH9wQ.png',
  },
  {
    id: 'liam-student',
    name: 'Liam',
    avatar:
      'https://framerusercontent.com/images/rjQedfhqIeAXdy1x3CVVTKXCzk.png',
  },
];

export const VideoCard: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcription' | 'subtitle'>('transcription');
  const [isRecording, setIsRecording] = useState(false);

  // Generate 40 waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
    const raw = Math.sin(i * 0.4) * 10 + 12 + Math.sin(i * 1.2) * 5;
    return Math.max(4, Math.round(raw));
  });

  return (
    <div className="w-full h-full flex flex-col min-h-0" id="video-card-container">
      <GlassCard className="w-full h-full flex flex-col p-2 min-h-0 overflow-hidden shadow-sm">
        {/* Media Area */}
        <div className="flex gap-2 flex-1 min-h-0">
          {/* Thumbnails Column (hidden on mobile, visible md+) */}
          <div className="hidden md:flex w-[180px] lg:w-[200px] xl:w-[220px] flex-col gap-2 flex-shrink-0 min-h-0">
            {STUDENTS.map((student) => (
              <div
                key={student.id}
                id={`student-tile-${student.id}`}
                className="flex-1 rounded-[14px] overflow-hidden relative min-h-0 group cursor-pointer shadow-sm"
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {/* Student Name Chip */}
                <div
                  className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-md text-white text-[12px] font-medium px-2 py-0.5 rounded-[6px] select-none"
                  style={{
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  {student.name}
                </div>
              </div>
            ))}
          </div>

          {/* Main Video Stream */}
          <div className="flex-1 rounded-[14px] overflow-hidden relative shadow-lg bg-neutral-900 min-h-0">
            {callEnded ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-black/80 gap-3 p-6 text-center">
                <p className="text-[18px] font-semibold">Lesson Video Call Paused</p>
                <button
                  id="rejoin-call-button"
                  onClick={() => setCallEnded(false)}
                  className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors cursor-pointer text-[14px]"
                >
                  Rejoin Class
                </button>
              </div>
            ) : (
              <img
                src="https://framerusercontent.com/images/ojrVd1wjK92ZEBpdjPkR9uc.png"
                alt="Isabella Teacher Live Stream"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Coach live badge in top-left */}
            <div
              className="absolute top-2.5 left-2.5 bg-black/30 backdrop-blur-md text-white text-[12px] font-medium px-2.5 py-1 rounded-[8px] flex items-center gap-1.5"
              style={{ WebkitBackdropFilter: 'blur(16px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#29c012] animate-pulse" />
              <span>Isabella (Host)</span>
            </div>

            {/* Centered Bottom Overlay Video Controls */}
            {!callEnded && (
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center bg-black/80 backdrop-blur-md rounded-[20px] p-1.5 px-3 sm:px-4 gap-3 sm:gap-4 shadow-md">
                {/* Camera Toggle */}
                <button
                  id="video-control-camera"
                  onClick={() => setCameraActive(!cameraActive)}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  title={cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
                  aria-label="Toggle Camera"
                >
                  {cameraActive ? (
                    <Camera size={20} strokeWidth={2} />
                  ) : (
                    <VideoOff size={20} strokeWidth={2} className="text-[#f95555]" />
                  )}
                </button>

                {/* Headphones Toggle */}
                <button
                  id="video-control-headphones"
                  onClick={() => setAudioActive(!audioActive)}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  title={audioActive ? 'Mute Audio' : 'Unmute Audio'}
                  aria-label="Toggle Audio"
                >
                  {audioActive ? (
                    <Headphones size={20} strokeWidth={2} />
                  ) : (
                    <VolumeX size={20} strokeWidth={2} className="text-[#f95555]" />
                  )}
                </button>

                {/* Microphone Toggle */}
                <button
                  id="video-control-mic"
                  onClick={() => setMicActive(!micActive)}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
                  aria-label="Toggle Microphone"
                >
                  {micActive ? (
                    <Mic size={20} strokeWidth={2} />
                  ) : (
                    <MicOff size={20} strokeWidth={2} className="text-[#f95555]" />
                  )}
                </button>

                {/* PhoneOff Hang Up */}
                <button
                  id="video-control-hangup"
                  onClick={() => setCallEnded(true)}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-[#f95555] hover:bg-[#e04444] rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                  style={{
                    boxShadow: '0 4px 10px rgba(249,85,85,0.4)',
                  }}
                  title="Leave Call"
                  aria-label="Leave Call"
                >
                  <PhoneOff size={18} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Transcript Quote */}
        <div className="p-3 sm:p-4 pb-2 flex-shrink-0" id="video-transcript-area">
          <p className="text-[15px] sm:text-[17px] font-medium text-black leading-relaxed">
            &ldquo;Hi everyone, and welcome to your very first English lesson! My
            name is Isabella, and I&apos;m so excited to help you start your
            English journey. In this lesson, we&apos;ll learn how to say hello,
            introduce yourself, and ask simple questions. Let&apos;s begin!&rdquo;
          </p>
        </div>

        {/* Bottom Controls Row */}
        <div className="px-2 sm:px-3 pb-1 flex items-center justify-between flex-shrink-0 gap-2" id="video-bottom-controls">
          {/* Left: Transcription / Subtitle Blob */}
          <BlobContainer width={220} lobes={2} height={48} blur={false} id="transcript-toggle-blob">
            <button
              id="toggle-transcription-btn"
              onClick={() => setActiveTab('transcription')}
              className={`flex-1 h-[48px] text-[13px] sm:text-[14px] font-semibold rounded-[16px] transition-all duration-200 cursor-pointer flex items-center justify-center ${
                activeTab === 'transcription'
                  ? 'bg-black text-white inset-glow'
                  : 'text-black hover:bg-black/5'
              }`}
              style={
                activeTab === 'transcription'
                  ? {
                      boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                    }
                  : undefined
              }
            >
              Transcription
            </button>
            <button
              id="toggle-subtitle-btn"
              onClick={() => setActiveTab('subtitle')}
              className={`flex-1 h-[48px] text-[13px] sm:text-[14px] font-semibold rounded-[16px] transition-all duration-200 cursor-pointer flex items-center justify-center ${
                activeTab === 'subtitle'
                  ? 'bg-black text-white inset-glow'
                  : 'text-black hover:bg-black/5'
              }`}
              style={
                activeTab === 'subtitle'
                  ? {
                      boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                    }
                  : undefined
              }
            >
              Subtitle
            </button>
          </BlobContainer>

          {/* Right: Audio Waveform & Record Button (hidden on very small screens) */}
          <div className="hidden sm:block relative w-[240px] lg:w-[260px] h-[48px] flex-shrink-0" id="audio-recorder-widget">
            <RecorderBlob />
            <div className="absolute inset-0 flex items-center justify-between px-2.5 z-10">
              {/* Waveform area */}
              <div
                className="flex-1 h-full flex items-center justify-center gap-[2.5px] pr-2 relative cursor-pointer"
                title="Voice Activity Monitor"
                onClick={() => setIsRecording(!isRecording)}
              >
                {waveformBars.slice(0, 32).map((height, i) => (
                  <span
                    key={i}
                    className={`w-[2px] rounded-full transition-all duration-300 ${
                      i < 18 ? 'bg-black/50' : 'bg-black/15'
                    }`}
                    style={{
                      height: `${isRecording ? Math.max(4, height * 0.8 + (i % 3) * 2) : height * 0.8}px`,
                    }}
                  />
                ))}
                {/* Red playhead marker */}
                <span
                  className="absolute h-[26px] w-[1.5px] bg-red-500 rounded-full"
                  style={{
                    left: '50%',
                  }}
                />
              </div>

              {/* Record Action Button */}
              <button
                id="voice-record-button"
                onClick={() => setIsRecording(!isRecording)}
                className="w-10 h-10 bg-black rounded-[12px] flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform inset-glow"
                style={{
                  boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                }}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                aria-label="Voice Record"
              >
                <span
                  className={`w-2.5 h-2.5 bg-red-500 rounded-full ${
                    isRecording ? 'animate-ping' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
