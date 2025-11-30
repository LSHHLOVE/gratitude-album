#!/bin/bash

# 感恩之旅 - 一键部署脚本
# 支持多种云平台部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    if command -v node &> /dev/null; then
        log_success "Node.js 已安装: $(node --version)"
    else
        log_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi

    if command -v npm &> /dev/null; then
        log_success "npm 已安装: $(npm --version)"
    else
        log_error "npm 未安装"
        exit 1
    fi

    if command -v docker &> /dev/null; then
        log_success "Docker 已安装: $(docker --version)"
    else
        log_warning "Docker 未安装，将跳过容器化部署"
    fi
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    
    # 复制服务器版package.json
    cp package-server.json package.json
    
    if npm install; then
        log_success "依赖安装完成"
    else
        log_error "依赖安装失败"
        exit 1
    fi
}

# 构建项目
build_project() {
    log_info "构建项目..."
    
    if [ -f "package.json" ] && grep -q "build" package.json; then
        if npm run build; then
            log_success "项目构建完成"
        else
            log_error "项目构建失败"
            exit 1
        fi
    else
        log_warning "未找到构建脚本，跳过构建步骤"
    fi
}

# Docker部署
docker_deploy() {
    if command -v docker &> /dev/null; then
        log_info "开始Docker部署..."
        
        # 构建Docker镜像
        if docker build -t gratitude-journey .; then
            log_success "Docker镜像构建成功"
        else
            log_error "Docker镜像构建失败"
            return 1
        fi
        
        # 停止并删除旧容器
        docker stop gratitude-journey || true
        docker rm gratitude-journey || true
        
        # 运行新容器
        if docker run -d --name gratitude-journey -p 3000:3000 gratitude-journey; then
            log_success "Docker容器启动成功"
            log_info "访问地址: http://localhost:3000"
        else
            log_error "Docker容器启动失败"
            return 1
        fi
    else
        log_warning "Docker未安装，跳过容器化部署"
    fi
}

# 直接Node.js部署
node_deploy() {
    log_info "开始Node.js部署..."
    
    # 停止可能正在运行的进程
    pkill -f "node server.js" || true
    
    # 后台启动服务
    nohup node server.js > server.log 2>&1 &
    
    # 等待服务启动
    sleep 3
    
    # 检查服务状态
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log_success "Node.js服务启动成功"
        log_info "访问地址: http://localhost:3000"
        log_info "日志文件: server.log"
    else
        log_error "Node.js服务启动失败"
        return 1
    fi
}

# 显示部署信息
show_deploy_info() {
    echo ""
    echo "=========================================="
    echo "          感恩之旅部署完成"
    echo "=========================================="
    echo ""
    echo "📱 移动端访问: http://您的服务器IP:3000"
    echo "💻 电脑端访问: http://localhost:3000"
    echo ""
    echo "🔧 部署方式:"
    echo "   - Node.js直接运行: node server.js"
    echo "   - PM2运行: pm2 start server.js"
    echo "   - Docker运行: docker-compose up -d"
    echo ""
    echo "📊 健康检查: http://localhost:3000/health"
    echo ""
    echo "=========================================="
}

# 主函数
main() {
    echo ""
    echo "🚀 感恩之旅 - 一键部署脚本"
    echo "=========================================="
    echo ""
    
    # 检查依赖
    check_dependencies
    
    # 安装依赖
    install_dependencies
    
    # 构建项目
    build_project
    
    # 选择部署方式
    echo ""
    echo "请选择部署方式:"
    echo "1) Docker部署 (推荐)"
    echo "2) Node.js直接部署"
    echo "3) 两种方式都部署"
    read -p "请输入选择 (1-3): " deploy_choice
    
    case $deploy_choice in
        1)
            docker_deploy
            ;;
        2)
            node_deploy
            ;;
        3)
            docker_deploy
            node_deploy
            ;;
        *)
            log_error "无效选择"
            exit 1
            ;;
    esac
    
    # 显示部署信息
    show_deploy_info
}

# 执行主函数
main "$@"