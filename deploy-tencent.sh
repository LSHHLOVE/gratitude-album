#!/bin/bash

# 感恩之旅 - 腾讯云一键部署脚本
# 作者：AI助手
# 版本：1.0
# 描述：自动部署感恩之旅项目到腾讯云服务器

echo "🚀 开始部署感恩之旅到腾讯云..."
echo "========================================"

# 检查参数
if [ $# -eq 0 ]; then
    echo "❌ 使用方法: $0 <服务器IP> [用户名]"
    echo "   例如: $0 123.123.123.123 root"
    exit 1
fi

SERVER_IP=$1
USERNAME=${2:-"root"}
PROJECT_DIR="/home/gratitude-journey"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查SSH连接
check_ssh_connection() {
    print_info "检查SSH连接到服务器 $SERVER_IP..."
    ssh -o ConnectTimeout=5 -o BatchMode=yes -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "echo 'SSH连接成功'" 2>/dev/null
    if [ $? -ne 0 ]; then
        print_error "无法连接到服务器，请检查："
        echo "  1. 服务器IP是否正确"
        echo "  2. SSH服务是否开启"
        echo "  3. 防火墙是否允许SSH连接"
        echo "  4. 用户名和密码/密钥是否正确"
        exit 1
    fi
    print_success "SSH连接检查通过"
}

# 检查服务器环境
check_server_environment() {
    print_info "检查服务器环境..."
    
    # 检查操作系统
    OS_INFO=$(ssh $USERNAME@$SERVER_IP "cat /etc/os-release | grep PRETTY_NAME")
    print_info "操作系统: $OS_INFO"
    
    # 检查Node.js
    NODE_VERSION=$(ssh $USERNAME@$SERVER_IP "node --version 2>/dev/null || echo '未安装'")
    print_info "Node.js版本: $NODE_VERSION"
    
    # 检查npm
    NPM_VERSION=$(ssh $USERNAME@$SERVER_IP "npm --version 2>/dev/null || echo '未安装'")
    print_info "npm版本: $NPM_VERSION"
    
    # 检查磁盘空间
    DISK_SPACE=$(ssh $USERNAME@$SERVER_IP "df -h / | tail -1 | awk '{print \$4}'")
    print_info "磁盘可用空间: $DISK_SPACE"
    
    # 检查内存
    MEMORY=$(ssh $USERNAME@$SERVER_IP "free -h | grep Mem | awk '{print \$2}'")
    print_info "内存总量: $MEMORY"
}

# 安装必要的软件
install_required_software() {
    print_info "安装必要的软件..."
    
    # 更新系统包管理器
    ssh $USERNAME@$SERVER_IP "sudo apt update && sudo apt upgrade -y"
    
    # 安装Node.js（如果未安装）
    ssh $USERNAME@$SERVER_IP "which node > /dev/null 2>&1"
    if [ $? -ne 0 ]; then
        print_info "安装Node.js..."
        ssh $USERNAME@$SERVER_IP << 'EOF'
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
EOF
    fi
    
    # 安装PM2（进程管理器）
    ssh $USERNAME@$SERVER_IP "which pm2 > /dev/null 2>&1"
    if [ $? -ne 0 ]; then
        print_info "安装PM2..."
        ssh $USERNAME@$SERVER_IP "sudo npm install -g pm2"
    fi
    
    print_success "软件安装完成"
}

# 创建项目目录
create_project_directory() {
    print_info "创建项目目录..."
    ssh $USERNAME@$SERVER_IP "sudo mkdir -p $PROJECT_DIR && sudo chown $USERNAME:$USERNAME $PROJECT_DIR"
    print_success "项目目录创建完成: $PROJECT_DIR"
}

# 上传项目文件
upload_project_files() {
    print_info "上传项目文件到服务器..."
    
    # 检查本地文件是否存在
    if [ ! -f "server.js" ]; then
        print_error "本地server.js文件不存在，请确保在项目根目录运行此脚本"
        exit 1
    fi
    
    # 创建临时文件列表
    FILES_TO_UPLOAD=(
        "server.js"
        "package-server.json"
        "package-lock.json"
        "dist/"
        "public/"
        "deploy.sh"
        "Dockerfile"
        "docker-compose.yml"
        "nginx.conf"
    )
    
    # 上传文件
    for file in "${FILES_TO_UPLOAD[@]}"; do
        if [ -e "$file" ]; then
            print_info "上传: $file"
            if [ -d "$file" ]; then
                # 上传目录
                scp -r "$file" $USERNAME@$SERVER_IP:$PROJECT_DIR/
            else
                # 上传文件
                scp "$file" $USERNAME@$SERVER_IP:$PROJECT_DIR/
            fi
        else
            print_warning "文件不存在，跳过: $file"
        fi
    done
    
    # 重命名package-server.json为package.json
    ssh $USERNAME@$SERVER_IP "cd $PROJECT_DIR && cp package-server.json package.json"
    
    print_success "文件上传完成"
}

# 安装项目依赖
install_dependencies() {
    print_info "安装项目依赖..."
    ssh $USERNAME@$SERVER_IP "cd $PROJECT_DIR && npm install --production"
    
    if [ $? -eq 0 ]; then
        print_success "依赖安装完成"
    else
        print_error "依赖安装失败"
        exit 1
    fi
}

# 配置防火墙
configure_firewall() {
    print_info "配置防火墙..."
    
    # 检查ufw是否安装
    ssh $USERNAME@$SERVER_IP "which ufw > /dev/null 2>&1"
    if [ $? -eq 0 ]; then
        ssh $USERNAME@$SERVER_IP << 'EOF'
# 允许SSH
sudo ufw allow ssh
# 允许3000端口
sudo ufw allow 3000/tcp
# 启用防火墙
sudo ufw --force enable
# 查看状态
sudo ufw status
EOF
    else
        print_warning "ufw未安装，跳过防火墙配置"
    fi
    
    print_success "防火墙配置完成"
}

# 启动服务
start_service() {
    print_info "启动感恩之旅服务..."
    
    # 停止已存在的服务
    ssh $USERNAME@$SERVER_IP "pm2 stop gratitude-journey 2>/dev/null || true"
    ssh $USERNAME@$SERVER_IP "pm2 delete gratitude-journey 2>/dev/null || true"
    
    # 启动新服务
    ssh $USERNAME@$SERVER_IP "cd $PROJECT_DIR && pm2 start server.js --name gratitude-journey"
    
    # 设置开机自启
    ssh $USERNAME@$SERVER_IP "pm2 startup"
    ssh $USERNAME@$SERVER_IP "pm2 save"
    
    # 等待服务启动
    sleep 5
    
    # 检查服务状态
    SERVICE_STATUS=$(ssh $USERNAME@$SERVER_IP "pm2 show gratitude-journey | grep status | head -1 | awk '{print \$4}'")
    
    if [ "$SERVICE_STATUS" = "online" ]; then
        print_success "服务启动成功"
    else
        print_error "服务启动失败"
        ssh $USERNAME@$SERVER_IP "pm2 logs gratitude-journey --lines 20"
        exit 1
    fi
}

# 测试服务
test_service() {
    print_info "测试服务是否正常..."
    
    # 测试健康检查接口
    HEALTH_RESPONSE=$(ssh $USERNAME@$SERVER_IP "curl -s http://localhost:3000/health || echo 'FAILED'")
    
    if echo "$HEALTH_RESPONSE" | grep -q "status"; then
        print_success "健康检查接口正常"
        echo "响应: $HEALTH_RESPONSE"
    else
        print_error "健康检查接口异常"
        echo "响应: $HEALTH_RESPONSE"
    fi
    
    # 测试主页访问
    HOME_RESPONSE=$(ssh $USERNAME@$SERVER_IP "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ || echo 'FAILED'")
    
    if [ "$HOME_RESPONSE" = "200" ]; then
        print_success "主页访问正常 (HTTP 200)"
    else
        print_error "主页访问异常 (HTTP $HOME_RESPONSE)"
    fi
}

# 显示部署结果
show_deployment_result() {
    echo ""
    echo "🎉 部署完成！"
    echo "========================================"
    echo "🌐 访问地址: http://$SERVER_IP:3000"
    echo "📱 移动端测试: 用手机浏览器访问上述地址"
    echo "🔧 管理命令:"
    echo "   查看服务状态: ssh $USERNAME@$SERVER_IP 'pm2 status'"
    echo "   查看服务日志: ssh $USERNAME@$SERVER_IP 'pm2 logs gratitude-journey'"
    echo "   重启服务: ssh $USERNAME@$SERVER_IP 'pm2 restart gratitude-journey'"
    echo "   停止服务: ssh $USERNAME@$SERVER_IP 'pm2 stop gratitude-journey'"
    echo ""
    echo "📋 下一步操作:"
    echo "   1. 在浏览器中访问 http://$SERVER_IP:3000 测试网站"
    echo "   2. 使用手机测试移动端兼容性"
    echo "   3. 配置域名和HTTPS（可选）"
    echo "   4. 设置监控和告警（可选）"
    echo ""
}

# 主部署流程
main() {
    echo "感恩之旅 - 腾讯云一键部署"
    echo "服务器: $SERVER_IP"
    echo "用户名: $USERNAME"
    echo "项目目录: $PROJECT_DIR"
    echo ""
    
    # 执行部署步骤
    check_ssh_connection
    check_server_environment
    install_required_software
    create_project_directory
    upload_project_files
    install_dependencies
    configure_firewall
    start_service
    test_service
    show_deployment_result
}

# 执行主函数
main "$@"