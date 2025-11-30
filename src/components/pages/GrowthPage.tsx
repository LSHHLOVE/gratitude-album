import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Heart, Smile, Sparkles, Activity } from 'lucide-react';

export const GrowthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-16 h-16 text-purple-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            成长之乐
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* 主要内容 */}
        <Card className="mb-8 shadow-lg border-pink-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">快乐成长</h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="animate-fade-in-up">
                感谢部门支持我们全面发展，营造了活跃的文艺氛围。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                参与文艺晚会、学习舞蹈等经历，不仅丰富了工作生活，也让我在身心愉悦中不断进步。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                每一次的文艺活动都让我感受到团队大家庭的温暖，这份珍贵的回忆将永远珍藏心底。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 文艺活动展示 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-pink-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <Music className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">文艺晚会</h3>
              <p className="text-gray-600 mb-4">
                精彩纷呈的文艺表演，展现团队风采与才艺
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">歌曲演唱</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">舞蹈表演</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">小品相声</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-pink-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
                <Activity className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">舞蹈学习</h3>
              <p className="text-gray-600 mb-4">
                系统的舞蹈训练，培养艺术气质与团队协作
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">形体训练</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">舞蹈编排</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">舞台表演</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 成长收获 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">身心健康</h3>
              <p className="text-gray-600 text-sm">
                文艺活动释放工作压力，保持身心健康平衡
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">团队凝聚</h3>
              <p className="text-gray-600 text-sm">
                通过共同排练增进同事友谊，提升团队凝聚力
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">全面发展</h3>
              <p className="text-gray-600 text-sm">
                培养艺术素养，实现工作与生活的和谐发展
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 活动照片墙 */}
        <Card className="shadow-lg border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Music className="w-8 h-8 text-indigo-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">精彩瞬间</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="aspect-square bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};