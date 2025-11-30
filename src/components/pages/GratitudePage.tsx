import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Handshake } from 'lucide-react';

export const GratitudePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            知遇之恩
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* 主要内容 */}
        <Card className="mb-8 shadow-lg border-orange-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Handshake className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">感恩之心</h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="animate-fade-in-up">
                衷心感谢您当初给予我宝贵的博士后机会，将我招入团队。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                那段时光是我职业生涯的坚实起点，您的信任与认可对我而言是莫大的鼓励与支持。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                每当回想起那段初入职场的日子，心中总是充满感激之情。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 照片展示区域 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-orange-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">团队合影</h3>
              <p className="text-gray-600 text-sm">
                难忘的入职时刻，与优秀的同事们初次见面
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-orange-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                <Handshake className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">面试交流</h3>
              <p className="text-gray-600 text-sm">
                深入的交流与了解，开启人生新的篇章
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 感言区域 */}
        <Card className="shadow-lg border-red-100 bg-gradient-to-br from-red-50 to-orange-50">
          <CardContent className="p-8">
            <blockquote className="text-lg italic text-gray-700 text-center">
              "知遇之恩，当永生难忘。您的慧眼识珠，给了我展示自己的舞台。"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};