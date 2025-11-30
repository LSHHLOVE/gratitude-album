import React, { useEffect, useRef, useState } from 'react';

interface BannerPhotoWallProps {
  photos: string[];
  className?: string;
}

export const BannerPhotoWall: React.FC<BannerPhotoWallProps> = ({ photos, className = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollAmountRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;

    const scroll = () => {
      if (!isPaused) {
        scrollAmountRef.current += 3; // 更快的滚动速度
        if (scrollAmountRef.current >= scrollContainer.scrollWidth / 2) {
          scrollAmountRef.current = 0;
        }
        scrollContainer.scrollLeft = scrollAmountRef.current;
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
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 横幅式照片墙 */}
      <div
        ref={scrollRef}
        className="flex overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* 复制两份照片以实现无缝循环 */}
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 h-56 md:w-96 md:h-64 lg:w-[28rem] lg:h-72 relative group"
          >
            <img
              src={photo}
              alt={`感恩照片 ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* 悬浮时的暗色遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* 照片描述（可选） */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium drop-shadow-lg">
                {index < photos.length ? `珍贵瞬间 ${index + 1}` : `珍贵瞬间 ${index + 1 - photos.length}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 左右渐变遮罩，营造无缝循环效果 */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-orange-50 via-orange-50/70 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-orange-50 via-orange-50/70 to-transparent z-10"></div>
    </div>
  );
};