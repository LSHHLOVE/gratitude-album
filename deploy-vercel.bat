@echo off
chcp 65001 >nul

echo.
echo ========================================
echo   感恩之旅 - Vercel一键部署脚本
echo ========================================
echo.

echo [1/5] 检查Node.js环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js版本：
node --version

echo.
echo [2/5] 检查npm环境...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm未正确安装
    pause
    exit /b 1
)

echo ✅ npm版本：
npm --version

echo.
echo [3/5] 安装Vercel CLI...
npm list -g vercel >nul 2>&1
if errorlevel 1 (
    echo 📦 正在安装Vercel CLI...
    npm install -g vercel
    if errorlevel 1 (
        echo ❌ Vercel CLI安装失败
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI安装成功
) else (
    echo ✅ Vercel CLI已安装
)

echo.
echo [4/5] 构建项目...
echo 📦 正在安装项目依赖...
npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo 📦 正在构建项目...
npm run build
if errorlevel 1 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)

echo ✅ 项目构建成功

echo.
echo [5/5] 部署到Vercel...
echo.
echo 📝 部署说明：
echo   1. 首次部署需要登录Vercel账号
echo   2. 按照提示完成配置
echo   3. 部署完成后会显示访问地址
echo.
echo 🚀 开始部署...
echo.

vercel --prod

if errorlevel 1 (
    echo ❌ 部署失败
    echo.
    echo 💡 解决方法：
    echo   1. 检查网络连接
    echo   2. 确认Vercel账号登录状态
    echo   3. 手动运行：vercel --prod
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 部署完成！
echo ========================================
echo.
echo 🌐 您的网站已部署到Vercel
echo 📱 支持移动端访问
echo 🔒 自动HTTPS加密
echo 🌍 全球CDN加速
echo.
echo 💡 后续更新：
echo   只需推送代码到GitHub，Vercel会自动部署
echo.
pause