import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Lightbulb, Compass, Sparkles, Users } from 'lucide-react';

interface ThemeCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay?: string;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  delay = '0s'
}) => {
  return (
    <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
          style={{ animationDelay: delay }}>
      {/* 背景渐变 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* 内容区域 */}
      <div className="relative p-6 text-center">
        {/* 图标区域 */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
          {title}
        </h3>

        {/* 描述 */}
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* 装饰性元素 */}
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-gradient-to-br ${gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* 悬浮效果的光芒 */}
      <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-white to-transparent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
    </Card>
  );
};

export const ThemeIntroduction: React.FC = () => {
  const themes = [
    {
      title: "知遇之恩",
      description: "在茫茫人海中相遇，是命运最珍贵的馈赠。感谢每一次邂逅，每一段缘分，都让生命变得更加丰富多彩。",
      icon: Heart,
      gradient: "from-red-400 to-pink-400",
      delay: "0s"
    },
    {
      title: "启迪之光",
      description: "思想的火花照亮前行的道路，智慧的话语如灯塔指引方向。感谢每一位为我点亮心灯的导师。",
      icon: Lightbulb,
      gradient: "from-blue-400 to-purple-400",
      delay: "0.2s"
    },
    {
      title: "指路之师",
      description: "在迷茫时给予指引，在困惑时提供方向。感谢所有为我指点迷津的良师益友，让我找到前进的路。",
      icon: Compass,
      gradient: "from-green-400 to-teal-400",
      delay: "0.4s"
    },
    {
      title: "成长之乐",
      description: "每一个挑战都是成长的机会，每一次突破都带来无限的喜悦。感谢成长路上的风景，让我成为更好的自己。",
      icon: Sparkles,
      gradient: "from-yellow-400 to-orange-400",
      delay: "0.6s"
    },
    {
      title: "同行之伴",
      description: "人生的旅途中，有您们同行便不再孤单。感谢每一位朋友的陪伴与支持，让温暖充满整个旅程。",
      icon: Users,
      gradient: "from-purple-400 to-indigo-400",
      delay: "0.8s"
    }
  ];

  return (
    <div className="w-full py-12 px-4">
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          主题介绍
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          五个感恩主题，五个美好篇章，共同谱写生命中最珍贵的情感乐章
        </p>
      </div>

      {/* 卡片网格 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {themes.map((theme, index) => (
          <ThemeCard
            key={index}
            title={theme.title}
            description={theme.description}
            icon={theme.icon}
            gradient={theme.gradient}
            delay={theme.delay}
          />
        ))}
      </div>
    </div>
  );
};