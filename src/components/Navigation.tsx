import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Lightbulb, Compass, Sparkles, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navigationItems = [
    {
      id: 'home',
      label: '主页',
      icon: Home,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'hover:bg-gray-50'
    },
    {
      id: 'gratitude',
      label: '知遇之恩',
      icon: Heart,
      color: 'from-red-400 to-orange-400',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'enlightenment',
      label: '引路之光',
      icon: Lightbulb,
      color: 'from-blue-400 to-purple-400',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'guidance',
      label: '倾囊相授',
      icon: Compass,
      color: 'from-green-400 to-teal-400',
      bgColor: 'hover:bg-green-50'
    },
    {
      id: 'growth',
      label: '春风化雨',
      icon: Sparkles,
      color: 'from-pink-400 to-purple-400',
      bgColor: 'hover:bg-pink-50'
    }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border shadow-lg sticky top-4 z-40">
      <div className="flex justify-center items-center p-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-300
                  ${isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                    : `${item.bgColor} text-gray-700 hover:shadow-md`
                  }
                `}
              >
                <IconComponent className="w-5 h-5 md:w-6 md:h-6 mb-1" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};