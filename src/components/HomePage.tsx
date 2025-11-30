import React, { useState } from 'react';
import { BackgroundMusic } from './BackgroundMusic';
import { Navigation } from './Navigation';
import { BannerPhotoWall } from './BannerPhotoWall';
import { GratitudePage } from './GratitudePage';
import { EnlightenmentPage } from './EnlightenmentPage';
import { GuidancePage } from './GuidancePage';
import { GrowthPage } from './GrowthPage';

export const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // 使用images文件夹中的所有照片创建滚动照片墙
  const photos = [
    '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg',
    '/images/6.jpg', '/images/7.jpg', '/images/8.jpg', '/images/9.jpg', '/images/10.jpg',
    '/images/11.jpg', '/images/12.jpg', '/images/13.jpg', '/images/14.jpg', '/images/15.jpg',
    '/images/16.jpg', '/images/17.jpg', '/images/18.jpg', '/images/19.jpg', '/images/20.jpg',
    '/images/21.jpg'
  ];

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'gratitude':
        return <GratitudePage />;
      case 'enlightenment':
        return <EnlightenmentPage />;
      case 'guidance':
        return <GuidancePage />;
      case 'growth':
        return <GrowthPage />;
      default:
        return null; // 显示主页
    }
  };

  // 如果不是主页，显示对应的子页面
  if (currentPage !== 'home') {
    return (
      <div className="relative">
        <BackgroundMusic />
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
          </div>
        </div>
        <div className="pt-16">
          {renderCurrentPage()}
        </div>
      </div>
    );
  }

  // 主页内容
  return (
    <div className="relative">
      <BackgroundMusic />
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
      </div>
      {/* 固定标题区域 - 优化位置和间距 */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center animate-fade-in">

            <div className="w-24 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="pt-24">
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* 新增文字描述 */}
            <div className="text-center mb-12 animate-fade-in-up">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                展开记忆的画卷，每一帧温暖的片段里，都有您点亮的光芒。
              </p>
            </div>

            {/* 横幅式照片墙 */}
            <div className="my-8">
              <BannerPhotoWall
                photos={photos}
                className="py-6 px-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};