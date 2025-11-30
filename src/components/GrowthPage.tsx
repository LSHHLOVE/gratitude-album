import React from 'react';
import { Card } from '@/components/ui/card';
import { Music } from 'lucide-react';

export const GrowthPage: React.FC = () => {
  const photos = [
    '/images/3.jpg', // 使用3.jpg照片
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* 固定标题区域 - 优化位置和间距 */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              春风化雨，润我华年
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* 主要内容 */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {/* 主要感谢内容 - 添加滚动显示 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6 animate-fade-in-up">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 text-pink-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">全面发展</h3>
              </div>
              <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 rounded">
                <p className="text-gray-700 leading-relaxed text-base pr-3">
                  感谢部门支持我们全面发展，营造了活跃的文艺氛围，
                  鼓励我参与文艺活动，登上晚会的舞台展示自己——
                  那些起舞的日子，至今仍是我心中温暖而闪亮的回忆。
                </p>
              </div>
            </Card>

            {/* 照片展示 - 优化布局 */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-400 mx-auto max-w-3xl"
                >
                  <img
                    src={photo}
                    alt={`文艺照片 ${index + 1}`}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};