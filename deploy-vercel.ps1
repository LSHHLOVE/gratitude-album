# 感恩之旅 - Vercel一键部署脚本 (PowerShell版本)
# 作者：AI助手
# 描述：自动部署感恩之旅项目到Vercel平台

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   感恩之旅 - Vercel一键部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Node.js环境
Write-Host "[1/5] 检查Node.js环境..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ 未检测到Node.js，请先安装Node.js" -ForegroundColor Red
    Write-Host "下载地址：https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}
Write-Host "✅ Node.js版本: $nodeVersion" -ForegroundColor Green

# 检查npm环境
Write-Host "[2/5] 检查npm环境..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if (-not $npmVersion) {
    Write-Host "❌ npm未正确安装" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}
Write-Host "✅ npm版本: $npmVersion" -ForegroundColor Green

# 安装Vercel CLI
Write-Host "[3/5] 检查Vercel CLI..." -ForegroundColor Yellow
$vercelCheck = npm list -g vercel 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📦 正在安装Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Vercel CLI安装失败" -ForegroundColor Red
        Read-Host "按Enter键退出"
        exit 1
    }
    Write-Host "✅ Vercel CLI安装成功" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI已安装" -ForegroundColor Green
}

# 构建项目
Write-Host "[4/5] 构建项目..." -ForegroundColor Yellow
Write-Host "📦 正在安装项目依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host "📦 正在构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 项目构建失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}
Write-Host "✅ 项目构建成功" -ForegroundColor Green

# 部署到Vercel
Write-Host "[5/5] 部署到Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 部署说明：" -ForegroundColor Cyan
Write-Host "   1. 首次部署需要登录Vercel账号" -ForegroundColor Gray
Write-Host "   2. 按照提示完成配置" -ForegroundColor Gray
Write-Host "   3. 部署完成后会显示访问地址" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 开始部署..." -ForegroundColor Cyan
Write-Host ""

# 执行部署
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ 部署失败" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 解决方法：" -ForegroundColor Yellow
    Write-Host "   1. 检查网络连接" -ForegroundColor Gray
    Write-Host "   2. 确认Vercel账号登录状态" -ForegroundColor Gray
    Write-Host "   3. 手动运行：vercel --prod" -ForegroundColor Gray
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "🎉 部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 您的网站已部署到Vercel" -ForegroundColor Cyan
Write-Host "📱 支持移动端访问" -ForegroundColor Cyan
Write-Host "🔒 自动HTTPS加密" -ForegroundColor Cyan
Write-Host "🌍 全球CDN加速" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 后续更新：" -ForegroundColor Yellow
Write-Host "   只需推送代码到GitHub，Vercel会自动部署" -ForegroundColor Gray
Write-Host ""

# 等待用户确认
Write-Host "按Enter键完成" -ForegroundColor Yellow
Read-Host