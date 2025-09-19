import React, { useEffect, useRef } from "react";
import ringtone from "../../assets/audio/ringing.mp3"; // adjust relative path if needed

export default function IncomingToast({ show }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (show) {
      // create audio instance
      audioRef.current = new Audio(ringtone);
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction:", err);
      });
    } else {
      // stop audio when toast hidden
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    // cleanup when unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full px-4 py-3 border border-teal-500 flex items-center space-x-2 animate-slide-up">
      <span className="text-teal-600 font-semibold">📞 Incoming Call...</span>
    </div>
  );
}
