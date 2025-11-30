import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 页面加载后自动播放音乐
    const autoPlayMusic = () => {
      audio.play().catch((error) => {
        console.log('自动播放被阻止，需要用户交互:', error);
        // 如果自动播放被阻止，显示提示让用户手动播放
      });
    };

    // 添加用户交互事件监听器，用于自动播放
    const handleUserInteraction = () => {
      autoPlayMusic();
      // 移除事件监听器，避免重复触发
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // 循环播放
      audio.currentTime = 0;
      audio.play().catch(console.error);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // 尝试自动播放
    autoPlayMusic();
    
    // 如果自动播放失败，监听用户交互事件
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  
  return (
    <>
      {/* 背景音频元素 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/11.mp3" type="audio/mpeg" />
        您的浏览器不支持音频元素。
      </audio>

      {/* 音乐控制按钮 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 flex items-center space-x-2">
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg transition-all duration-300"
            title={isPlaying ? "暂停音乐" : "播放音乐"}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* 播放状态指示器 */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* 初始提示 */}
      {!isPlaying && (
        <div className="fixed bottom-20 right-6 z-40 max-w-xs">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-purple-200">
            <p className="text-sm text-gray-700 flex items-center">
              <span className="mr-2">🎵</span>
              点击右下角按钮播放温馨背景音乐
            </p>
          </div>
        </div>
      )}
    </>
  );
};