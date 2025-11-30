# 腾讯云EdgeOne Pages部署指南

## 概述
腾讯云EdgeOne Pages是腾讯云推出的静态网站托管服务，具有以下优势：
- **国内访问速度快**：基于腾讯云CDN网络
- **免费额度充足**：每月免费流量和构建次数
- **自动HTTPS**：自动配置SSL证书
- **Git集成**：支持GitHub、GitLab等代码仓库自动部署

## 部署步骤

### 1. 准备工作
1. 注册腾讯云账号并完成实名认证
2. 开通EdgeOne Pages服务
3. 准备GitHub或GitLab仓库（可选）

### 2. 手动部署（推荐初次使用）

#### 方式一：通过控制台部署
1. 登录腾讯云控制台，进入EdgeOne Pages
2. 点击"新建站点"
3. 选择"手动上传"方式
4. 上传`dist`文件夹内容（先执行`npm run build`）
5. 配置站点名称和域名

#### 方式二：通过CLI工具部署
```bash
# 安装EdgeOne CLI
npm install -g @tencent/edgeone-cli

# 登录腾讯云
edgeone login

# 构建项目
npm run build

# 部署到EdgeOne Pages
edgeone deploy --dir dist --site-name 感恩之旅
```

### 3. 自动部署（推荐生产环境）

#### GitHub Actions自动部署
创建`.github/workflows/deploy-edgeone.yml`：

```yaml
name: Deploy to EdgeOne Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to EdgeOne Pages
      uses: tencentcloud/edgeone-pages-action@v1
      with:
        secret_id: ${{ secrets.TENCENT_CLOUD_SECRET_ID }}
        secret_key: ${{ secrets.TENCENT_CLOUD_SECRET_KEY }}
        site_name: 感恩之旅
        dist_dir: dist
```

## 配置文件说明

### edgeone-pages.json
```json
{
  "name": "感恩之旅",
  "framework": "vite",
  "build": {
    "command": "npm run build",
    "output": "dist"
  },
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/images/(.*)",
      "dest": "/images/$1"
    },
    {
      "src": "/music/(.*)",
      "dest": "/music/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_VERSION": "18"
  }
}
```

## 自定义域名
1. 在EdgeOne Pages控制台绑定自定义域名
2. 在域名服务商处配置CNAME记录
3. 等待SSL证书自动签发（通常几分钟）

## 性能优化建议
1. **图片优化**：使用WebP格式，压缩图片大小
2. **CDN缓存**：合理设置缓存策略
3. **代码分割**：利用Vite的代码分割功能
4. **预加载**：配置关键资源预加载

## 监控和统计
- 使用腾讯云监控查看访问统计
- 配置告警规则监控异常
- 使用百度统计或腾讯分析进行用户行为分析

## 故障排除

### 常见问题
1. **部署失败**：检查构建日志，确认Node.js版本兼容性
2. **资源404**：确认路由配置正确，资源路径无误
3. **HTTPS证书问题**：等待证书自动签发或手动上传

### 技术支持
- 腾讯云官方文档：https://cloud.tencent.com/document/product/1552
- 社区论坛：https://cloud.tencent.com/developer/community
- 工单系统：控制台内提交工单

## 成本估算
- **免费额度**：每月100GB流量，1000次构建
- **超出部分**：按量计费，价格实惠
- **域名费用**：自定义域名需单独购买

EdgeOne Pages是"感恩之旅"应用在国内部署的理想选择，访问速度快，管理方便。