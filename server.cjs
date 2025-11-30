const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用Gzip压缩
app.use(compression());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 处理所有路由，返回index.html（SPA支持）- 使用更简单的方式
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 感恩之旅服务器已启动`);
  console.log(`📍 本地访问: http://localhost:${PORT}`);
  console.log(`🌐 公共访问: http://您的服务器IP:${PORT}`);
  console.log(`⚡ Gzip压缩: 已启用`);
});

process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在优雅关闭服务器...');
  process.exit(0);
});