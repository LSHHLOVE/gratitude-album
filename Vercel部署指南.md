# 感恩之旅 - Vercel免费部署指南

## 🎯 Vercel部署优势

✅ **完全免费** - 个人项目免费使用  
✅ **自动HTTPS** - 无需配置SSL证书  
✅ **全球CDN** - 全球加速，访问速度快  
✅ **自动部署** - GitHub推送自动部署  
✅ **无服务器** - 无需管理服务器  
✅ **移动端优化** - 自动适配移动设备  

## 🚀 5分钟快速部署

### 方法一：通过GitHub部署（推荐）

#### 步骤1：创建GitHub仓库

1. 访问 https://github.com 并登录
2. 点击右上角"+" → "New repository"
3. 填写仓库信息：
   - Repository name: `gratitude-journey`
   - Description: `感恩之旅相册网站`
   - 选择 Public（公开）
   - 勾选 "Add a README file"

#### 步骤2：上传项目到GitHub

```bash
# 在项目目录初始化Git
git init
git add .
git commit -m "初始提交：感恩之旅项目"

# 连接到GitHub仓库
git remote add origin https://github.com/您的用户名/gratitude-journey.git
git branch -M main
git push -u origin main
```

#### 步骤3：Vercel部署

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击"New Project"
4. 选择刚创建的 `gratitude-journey` 仓库
5. 配置构建设置：
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. 点击"Deploy"

### 方法二：通过Vercel CLI部署

#### 步骤1：安装Vercel CLI

```bash
# 全局安装Vercel CLI
npm install -g vercel
```

#### 步骤2：登录Vercel

```bash
# 登录Vercel
vercel login
```

#### 步骤3：部署项目

```bash
# 进入项目目录
cd d:/下载/project_11

# 部署到生产环境
vercel --prod
```

## 🔧 项目配置说明

### Vercel配置文件 (vercel.json)

```json
{
  "version": 2,
  "name": "gratitude-journey",
  "builds": [
    {
      "src": "dist/**",
      "use": "@vercel/static"
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### 服务器配置 (server.js)

- 支持ES模块 (type: module)
- 自动检测移动设备
- Gzip压缩优化
- SPA路由支持
- 健康检查端点

## 🌐 部署成功后的操作

### 1. 测试网站功能

部署完成后，访问您的Vercel域名：
- 主页面：https://您的项目名.vercel.app
- 健康检查：https://您的项目名.vercel.app/health

### 2. 移动端测试

用手机浏览器访问：
- 测试触摸滑动
- 检查响应式布局
- 验证图片加载
- 测试音乐播放

### 3. 自定义域名（可选）

1. 在Vercel项目设置中添加自定义域名
2. 在域名服务商处配置CNAME记录
3. Vercel自动配置HTTPS证书

## 📊 Vercel免费套餐限制

| 资源类型 | 免费额度 | 说明 |
|---------|---------|------|
| 带宽 | 100GB/月 | 足够个人项目使用 |
| 函数执行 | 100小时/月 | 无服务器函数执行时间 |
| 构建时间 | 100小时/月 | 自动构建时间 |
| 团队协作 | 1个成员 | 个人项目足够 |

## 🔄 自动部署配置

### GitHub Actions自动构建

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build project
      run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🛠️ 常见问题解决

### 问题1：构建失败

**错误信息**: Build failed
**解决方案**:
```bash
# 本地测试构建
npm run build

# 检查构建日志
cat vercel-build.log
```

### 问题2：路由404

**错误信息**: 页面刷新后404
**解决方案**:
- 确保server.js中的SPA路由配置正确
- 检查vercel.json中的路由配置

### 问题3：静态资源加载失败

**错误信息**: 图片或CSS加载失败
**解决方案**:
- 检查dist目录结构
- 验证资源路径是否正确
- 清除浏览器缓存

### 问题4：移动端显示异常

**解决方案**:
- 测试不同移动设备
- 检查响应式CSS
- 验证触摸事件支持

## 📱 移动端优化检查清单

- [ ] 响应式布局正常
- [ ] 触摸滑动流畅
- [ ] 图片自适应屏幕
- [ ] 字体大小合适
- [ ] 导航菜单易操作
- [ ] 音乐播放正常

## 🎉 部署成功标志

- ✅ 网站可以通过Vercel域名访问
- ✅ 健康检查接口返回200
- ✅ 移动端显示正常
- ✅ 所有功能正常工作
- ✅ HTTPS证书自动配置

## 🔗 有用的链接

- [Vercel官方文档](https://vercel.com/docs)
- [Vercel CLI使用指南](https://vercel.com/docs/cli)
- [GitHub Actions文档](https://docs.github.com/actions)
- [自定义域名配置](https://vercel.com/docs/concepts/projects/custom-domains)

---

**需要帮助？** 如果在部署过程中遇到问题：

1. 查看Vercel部署日志
2. 检查GitHub Actions运行状态
3. 测试本地构建是否正常
4. 联系技术支持

祝您部署顺利！🚀