# 感恩之旅 - 温馨回顾网页

这是一个温馨雅致的感恩主题网页，用于回顾珍贵的成长记忆和表达感激之情。

## 🎨 页面特色

### 整体风格
- **温馨雅致**：暖色系配色，柔和过渡效果
- **动态交互**：流畅的动画和微交互
- **响应式设计**：完美适配桌面和移动设备

### 页面结构

#### 主页
- ✨ 动态标题动画："感恩之旅，感谢有您"
- 🖼️ 横幅式照片墙：自动循环滚动展示
- 🎵 背景音乐：温馨轻音乐，自动循环播放
- 🧭 四个主题导航按钮

#### 四个主题页面

1. **知遇之恩** (橙色调)
   - 感谢给予博士后机会的珍贵经历
   - 团队合影和面试交流照片展示
   - 深情的感恩寄语

2. **启迪之光** (蓝紫色调)
   - 劳动STEM教育学习经历回顾
   - 课程学习和同仁交流展示
   - 教育理念和收获总结

3. **指路之师** (绿色调)
   - 课题研究路上的悉心指导
   - 研究阶段和成长收获展示
   - 学术能力提升历程

4. **成长之乐** (粉紫色调)
   - 文体活动和文艺表演回顾
   - 身心健康和全面发展
   - 精彩瞬间照片墙

## 🛠 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式系统**：Tailwind CSS
- **UI组件**：Radix UI
- **图标库**：Lucide React
- **动画效果**：CSS Animations + Transitions

## 📁 项目结构

```
src/
├── components/
│   ├── PhotoWall.tsx          # 照片墙滚动组件
│   ├── Navigation.tsx         # 导航组件
│   ├── BackgroundMusic.tsx    # 背景音乐组件
│   ├── HomePage.tsx          # 主页组件
│   └── pages/                # 子页面组件
│       ├── GratitudePage.tsx     # 知遇之恩
│       ├── EnlightenmentPage.tsx # 启迪之光
│       ├── GuidancePage.tsx     # 指路之师
│       └── GrowthPage.tsx       # 成长之乐
├── lib/
│   └── utils.ts              # 工具函数
├── App.tsx                   # 主应用组件
└── index.css                 # 全局样式和动画

public/
├── music/                    # 背景音乐文件夹
└── images/                   # 照片文件夹
```

## 🚀 使用方法

### 1. 安装依赖
```bash
pnpm install
```

### 2. 添加内容
- **照片**：将照片文件放入 `public/images/` 目录
- **音乐**：将背景音乐文件放入 `public/music/` 目录，命名为 `gratitude-music.mp3`

### 3. 更新照片路径
在 `src/components/HomePage.tsx` 中更新照片URL：

```typescript
const samplePhotos = [
  '/images/team/group-photo-1.jpg',
  '/images/education/class-discussion.jpg',
  '/images/research/presentation.jpg',
  // 添加更多照片...
];
```

### 4. 启动开发服务器
```bash
pnpm dev
```

### 5. 构建生产版本
```bash
pnpm build
```

## 🎯 自定义配置

### 更新主题颜色
在 `src/index.css` 中修改渐变色配置：

```css
/* 主页背景 */
.bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50

/* 知遇之恩页面 */
.bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50

/* 启迪之光页面 */
.bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
```

### 调整动画效果
在 `src/index.css` 中修改动画参数：

```css
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out; /* 调整时长 */
}
```

### 自定义音乐设置
在 `src/components/BackgroundMusic.tsx` 中修改：
- 音频文件路径
- 播放控制方式
- 音量设置

## 📱 功能特点

### 照片墙效果
- 自动横向滚动
- 鼠标悬停暂停
- 渐变边缘遮罩
- 响应式布局

### 导航交互
- 页面切换动画
- 活动状态指示
- 悬停效果
- 图标标识

### 背景音乐
- 自动循环播放
- 可视化控制按钮
- 播放状态指示
- 静音功能

### 动画效果
- 淡入淡出
- 滑动效果
- 缩放动画
- 脉冲效果

## 🎨 设计理念

- **温馨色调**：采用暖色系营造温馨氛围
- **简洁布局**：清晰的视觉层次和信息组织
- **情感表达**：通过设计语言传递感恩之情
- **交互体验**：流畅的动画提升用户体验

## 📝 注意事项

1. **照片优化**：建议压缩照片以提高加载速度
2. **音乐版权**：确保使用的音乐具有合法版权
3. **浏览器兼容**：已优化现代浏览器支持
4. **响应式测试**：建议在不同设备上测试显示效果

## ❤️ 致谢

这个网页承载着真挚的感恩之情，愿它能成为美好回忆的见证，也是对未来的美好祝愿。

---

*"再次感谢您的认可与邀请，珍视过往，祝福未来！"*