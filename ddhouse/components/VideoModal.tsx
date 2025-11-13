import React from 'react';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl aspect-video m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the video player
      >
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors"
          aria-label="Close video player"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
