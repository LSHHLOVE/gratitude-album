import React from 'react';
import { Card } from '@/components/ui/card';
import { Music } from 'lucide-react';

export const GuidancePage: React.FC = () => {
  const photos = [
    '/images/1.jpg', // 使用本地照片
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      {/* 固定标题区域 - 优化位置和间距 */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              倾囊相授，授之以渔
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto rounded-full"></div>
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
                <Music className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">倾囊相授</h3>
              </div>
              <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100 rounded">
                <p className="text-gray-700 leading-relaxed text-base pr-3">
                  感谢您毫无保留地分享您的知识和经验，
                  让我在短时间内获得了巨大的成长。
                  您的耐心指导让我学会了如何思考问题，
                  如何分析情况，如何做出决策。
                  这份倾囊相授之恩，我将永远珍惜。
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
                    alt={`研究照片 ${index + 1}`}
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