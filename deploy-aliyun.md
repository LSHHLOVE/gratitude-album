# 阿里云OSS+CDN部署指南

## 概述
阿里云对象存储OSS配合内容分发网络CDN是部署静态网站的经典方案：
- **高可靠性**：99.9999999999%的数据可靠性
- **低成本**：按量付费，存储和流量费用低廉
- **全球加速**：通过CDN实现全球快速访问
- **安全稳定**：支持HTTPS、防盗链等安全功能

## 部署步骤

### 1. 准备工作
1. 注册阿里云账号并完成实名认证
2. 开通OSS和CDN服务
3. 准备AccessKey ID和AccessKey Secret

### 2. 创建OSS存储桶
1. 登录阿里云控制台，进入OSS服务
2. 创建存储桶（Bucket），名称建议：`ganenzhilv`
3. 区域选择：华东1（杭州）或离您最近的区域
4. 存储类型：标准存储
5. 读写权限：公共读（重要）

### 3. 配置静态网站托管
1. 在存储桶的"基础设置"中开启"静态页面"功能
2. 默认首页：`index.html`
3. 默认404页：`index.html`（支持SPA路由）
4. 子目录首页：开启

### 4. 配置CDN加速
1. 进入CDN控制台，添加域名
2. 加速域名：建议使用子域名，如`ganen.yourdomain.com`
3. 业务类型：图片小文件
4. 源站信息：选择OSS源站，选择刚才创建的存储桶
5. 加速区域：中国大陆（或全球）

### 5. 部署脚本
创建部署脚本`deploy-aliyun.sh`：

```bash
#!/bin/bash

# 配置信息
OSS_ENDPOINT="oss-cn-hangzhou.aliyuncs.com"
OSS_BUCKET="ganenzhilv"
CDN_DOMAIN="ganen.yourdomain.com"

# 构建项目
echo "构建项目..."
npm run build

# 安装OSS工具
echo "安装OSS命令行工具..."
npm install -g ossutil

# 配置OSS工具
echo "配置OSS工具..."
ossutil config -e $OSS_ENDPOINT -i $ALIYUN_ACCESS_KEY_ID -k $ALIYUN_ACCESS_KEY_SECRET

# 上传文件到OSS
echo "上传文件到OSS..."
ossutil cp -r dist/ oss://$OSS_BUCKET/ --update

# 刷新CDN缓存
echo "刷新CDN缓存..."
curl -X POST "https://cdn.aliyuncs.com/?Action=RefreshObjectCaches" \
  -d "ObjectPath=http://$CDN_DOMAIN/&ObjectType=Directory" \
  -H "Authorization: ..."

echo "部署完成！访问地址：https://$CDN_DOMAIN"
```

### 6. GitHub Actions自动部署
创建`.github/workflows/deploy-aliyun.yml`：

```yaml
name: Deploy to Aliyun OSS+CDN

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Configure OSS credentials
      run: |
        echo "[Credentials]" > ~/.ossutilconfig
        echo "language=EN" >> ~/.ossutilconfig
        echo "endpoint=oss-cn-hangzhou.aliyuncs.com" >> ~/.ossutilconfig
        echo "accessKeyID=${{ secrets.ALIYUN_ACCESS_KEY_ID }}" >> ~/.ossutilconfig
        echo "accessKeySecret=${{ secrets.ALIYUN_ACCESS_KEY_SECRET }}" >> ~/.ossutilconfig
        
    - name: Upload to OSS
      run: |
        wget -q http://gosspublic.alicdn.com/ossutil/1.7.16/ossutil64
        chmod +x ossutil64
        ./ossutil64 cp -r dist/ oss://ganenzhilv/ --update
        
    - name: Refresh CDN cache
      run: |
        curl -X POST "https://cdn.aliyuncs.com/?Action=RefreshObjectCaches" \
          -d "ObjectPath=http://ganen.yourdomain.com/&ObjectType=Directory" \
          -H "Authorization: ..."
```

## 配置说明

### 路由配置
由于OSS支持静态网站托管，SPA路由可以通过以下方式解决：
- 设置404页面为`index.html`
- 对于子目录，开启子目录首页功能

### 安全配置
1. **防盗链**：在OSS中配置Referer白名单
2. **HTTPS**：CDN自动配置SSL证书
3. **权限控制**：合理设置Bucket权限

### 性能优化
1. **缓存策略**：设置合适的缓存时间
2. **压缩**：开启Gzip压缩
3. **图片优化**：使用OSS图片处理功能

## 成本估算

### 存储费用
- 标准存储：0.12元/GB/月
- 低频存储：0.08元/GB/月（适合访问量较低）

### 流量费用
- CDN回源流量：0.15元/GB
- CDN流出流量：0.24元/GB（中国大陆）

### 请求费用
- PUT/COPY/POST/LIST请求：0.01元/万次
- GET请求：0.01元/万次

## 优势对比

### 优势
- **成本可控**：按量付费，无最低消费
- **高可靠性**：数据多重备份
- **功能丰富**：支持图片处理、版本控制等
- **生态完善**：与阿里云其他服务无缝集成

### 劣势
- **配置复杂**：需要分别配置OSS和CDN
- **学习成本**：需要了解阿里云产品体系
- **手动刷新**：CDN缓存需要手动刷新

## 最佳实践

1. **使用子域名**：避免与主域名冲突
2. **配置监控**：设置流量和费用告警
3. **定期备份**：重要数据定期备份到其他存储
4. **版本控制**：开启OSS版本控制防止误删

阿里云OSS+CDN方案适合对成本敏感、需要高可靠性的项目，"感恩之旅"应用使用此方案可以获得很好的性价比。