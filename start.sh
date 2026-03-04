#!/bin/bash

# E-Commerce SaaS Platform Startup Script
# =========================================

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "=============================================="
echo "  E-Commerce SaaS Platform"
echo "  Starting all services..."
echo "=============================================="
echo -e "${NC}"

# Set Docker host for Colima
export DOCKER_HOST=unix://${HOME}/.colima/docker.sock

# Check if Docker/Colima is running
echo -e "${YELLOW}Checking Docker...${NC}"
if ! docker info &>/dev/null; then
    echo -e "${YELLOW}Starting Colima...${NC}"
    colima start --cpu 4 --memory 8 --disk 60
fi
echo -e "${GREEN}Docker is running${NC}"

# Start infrastructure containers
echo ""
echo -e "${YELLOW}Starting infrastructure containers...${NC}"
cd "$(dirname "$0")"
docker compose up -d

# Wait for PostgreSQL
echo ""
echo -e "${YELLOW}Waiting for PostgreSQL...${NC}"
until docker exec ecommerce-postgres pg_isready -U postgres &>/dev/null; do
    echo "  Waiting..."
    sleep 1
done
echo -e "${GREEN}PostgreSQL is ready${NC}"

# Wait for Redis
echo ""
echo -e "${YELLOW}Waiting for Redis...${NC}"
until docker exec ecommerce-redis redis-cli ping 2>/dev/null | grep -q PONG; do
    echo "  Waiting..."
    sleep 1
done
echo -e "${GREEN}Redis is ready${NC}"

# Create database if not exists
echo ""
echo -e "${YELLOW}Creating database if not exists...${NC}"
docker exec ecommerce-postgres psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'ecommerce_saas'" | grep -q 1 || \
docker exec ecommerce-postgres psql -U postgres -c "CREATE DATABASE ecommerce_saas"
echo -e "${GREEN}Database ready${NC}"

# Kill any existing services on ports
echo ""
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
lsof -ti :4000 | xargs kill -9 2>/dev/null || true
lsof -ti :4001 | xargs kill -9 2>/dev/null || true
lsof -ti :4002 | xargs kill -9 2>/dev/null || true
lsof -ti :4003 | xargs kill -9 2>/dev/null || true
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
lsof -ti :3001 | xargs kill -9 2>/dev/null || true
lsof -ti :3002 | xargs kill -9 2>/dev/null || true

# Start API Gateway
echo ""
echo -e "${YELLOW}Starting API Gateway (port 4000)...${NC}"
cd apps/api-gateway
pnpm run build > /dev/null 2>&1
node dist/main.js > /tmp/api-gateway.log 2>&1 &
cd ../..

# Start Core Service
echo -e "${YELLOW}Starting Core Service (port 4001)...${NC}"
cd apps/core-service
pnpm run build > /dev/null 2>&1 || true
node dist/main.js > /tmp/core-service.log 2>&1 &
cd ../..

# Start Tenant Service
echo -e "${YELLOW}Starting Tenant Service (port 4002)...${NC}"
cd apps/tenant-service
pnpm run build > /dev/null 2>&1 || true
node dist/main.js > /tmp/tenant-service.log 2>&1 &
cd ../..

# Start Plugin Service
echo -e "${YELLOW}Starting Plugin Service (port 4003)...${NC}"
cd apps/plugin-service
pnpm run build > /dev/null 2>&1 || true
node dist/main.js > /tmp/plugin-service.log 2>&1 &
cd ../..

# Wait for services
sleep 5

# Start Admin Panel
echo -e "${YELLOW}Starting Admin Panel (port 3001)...${NC}"
cd apps/admin-panel
pnpm run dev > /tmp/admin-panel.log 2>&1 &
cd ../..

# Start Storefront
echo -e "${YELLOW}Starting Storefront (port 3000)...${NC}"
cd apps/storefront
pnpm run dev > /tmp/storefront.log 2>&1 &
cd ../..

# Wait for all services
sleep 5

echo ""
echo -e "${GREEN}=============================================="
echo "  All services started successfully!"
echo "==============================================${NC}"
echo ""
echo -e "${BLUE}Services:${NC}"
echo "  - API Gateway:     http://localhost:4000"
echo "  - Core Service:    http://localhost:4001"
echo "  - Tenant Service:  http://localhost:4002"
echo "  - Plugin Service:  http://localhost:4003"
echo "  - Admin Panel:     http://localhost:3001"
echo "  - Storefront:      http://localhost:3000"
echo ""
echo -e "${BLUE}Infrastructure:${NC}"
echo "  - PostgreSQL:      localhost:5432 (user: postgres, pass: postgres)"
echo "  - Redis:           localhost:6379"
echo "  - MinIO API:       http://localhost:9000"
echo "  - MinIO Console:   http://localhost:9001 (user: minioadmin, pass: minioadmin)"
echo ""
echo -e "${BLUE}API Endpoints:${NC}"
echo "  - Health:          http://localhost:4000/api/v1/health"
echo "  - Auth Login:      POST http://localhost:4000/api/v1/auth/login"
echo "  - Admin Products:  http://localhost:4000/api/v1/admin/products"
echo "  - Storefront:      http://localhost:4000/api/v1/storefront/products"
echo ""
echo -e "${YELLOW}Logs are available at:${NC}"
echo "  - /tmp/api-gateway.log"
echo "  - /tmp/core-service.log"
echo "  - /tmp/tenant-service.log"
echo "  - /tmp/plugin-service.log"
echo "  - /tmp/admin-panel.log"
echo "  - /tmp/storefront.log"
echo ""
