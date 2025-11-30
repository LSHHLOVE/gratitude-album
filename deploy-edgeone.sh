#!/bin/bash

# 腾讯云EdgeOne Pages部署脚本
# 使用方法：./deploy-edgeone.sh

echo "=== 感恩之旅应用 - EdgeOne Pages部署 ==="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误：Node.js未安装，请先安装Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "错误：npm未安装，请先安装npm"
    exit 1
fi

echo "1. 安装项目依赖..."
npm ci

echo "2. 构建生产版本..."
npm run build

echo "3. 检查构建结果..."
if [ ! -d "dist" ]; then
    echo "错误：构建失败，dist目录不存在"
    exit 1
fi

echo "4. 构建成功！dist目录内容："
ls -la dist/

echo ""
echo "=== 部署说明 ==="
echo ""
echo "EdgeOne Pages支持两种部署方式："
echo ""
echo "方式一：通过控制台手动部署（推荐初次使用）"
echo "1. 登录腾讯云控制台：https://console.cloud.tencent.com/edgeone"
echo "2. 进入EdgeOne Pages服务"
echo "3. 点击'新建站点'"
echo "4. 选择'手动上传'"
echo "5. 上传dist文件夹中的所有文件"
echo "6. 配置站点名称为'感恩之旅'"
echo ""
echo "方式二：通过CLI工具部署"
echo "1. 安装EdgeOne CLI：npm install -g @tencent/edgeone-cli"
echo "2. 登录腾讯云：edgeone login"
echo "3. 执行部署：edgeone deploy --dir dist --site-name 感恩之旅"
echo ""
echo "方式三：GitHub Actions自动部署（推荐生产环境）"
echo "1. 将项目推送到GitHub仓库"
echo "2. 在GitHub仓库设置中配置TENCENT_CLOUD_SECRET_ID和TENCENT_CLOUD_SECRET_KEY"
echo "3. 每次push到main分支时会自动部署"
echo ""
echo "=== 重要提示 ==="
echo "1. 需要先注册腾讯云账号并完成实名认证"
echo "2. 开通EdgeOne Pages服务"
echo "3. 建议使用自定义域名提升访问体验"
echo "4. 部署完成后可配置自动HTTPS和CDN加速"
echo ""
echo "部署文档详见：deploy-edgeone.md"
echo "方案比较详见：托管方案比较.md"
echo ""
echo "构建完成！请按照上述说明进行部署。"