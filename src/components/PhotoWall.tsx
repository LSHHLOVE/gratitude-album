import React, { useEffect, useRef, useState } from 'react';

interface PhotoWallProps {
  photos: string[];
  className?: string;
}

export const PhotoWall: React.FC<PhotoWallProps> = ({ photos, className = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    let animationId: number;

    const scroll = () => {
      if (!isPaused) {
        scrollAmount += 0.5;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-32 md:w-64 md:h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={photo}
              alt={`照片 ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 渐变遮罩效果 */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};