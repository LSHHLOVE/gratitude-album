import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, FileText, Search, Award, PenTool } from 'lucide-react';

export const GuidancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Compass className="w-16 h-16 text-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            指路之师
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-400 mx-auto rounded-full"></div>
        </div>

        {/* 主要内容 */}
        <Card className="mb-8 shadow-lg border-green-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Compass className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">悉心指导</h2>
            </div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="animate-fade-in-up">
                在课题研究的道路上，深深感谢您从项目申报、报告撰写到开题论证等各个环节所给予的悉心指导与宝贵建议。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                您的点拨让我在研究能力上获得了显著成长，每一个建议都如灯塔般指引着我前进的方向。
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                正是您的耐心教导，让我在学术研究的道路上越走越坚定。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 研究阶段展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                <Search className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">文献查阅</h3>
              <p className="text-gray-600 text-sm">
                系统性的文献调研与分析
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <FileText className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">项目申报</h3>
              <p className="text-gray-600 text-sm">
                精心准备研究项目申请书
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-square bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
                <PenTool className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">报告撰写</h3>
              <p className="text-gray-600 text-sm">
                反复修改完善研究报告
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Award className="w-10 h-10 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">开题论证</h3>
              <p className="text-gray-600 text-sm">
                顺利通过开题报告答辩
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 成长收获 */}
        <Card className="shadow-lg border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Award className="w-8 h-8 text-emerald-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">成长收获</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">研究能力提升</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">系统性思维和分析能力</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">学术论文写作规范</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">研究方法和工具运用</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">学术素养培养</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">批判性思维培养</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">学术道德和规范意识</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-700">创新意识和探索精神</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};