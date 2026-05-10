# 本地开发环境

这一页讲怎么把 Ember 完整开发栈在本机跑起来：装依赖、起 PostgreSQL、按服务启动、改完代码看到效果。

## 你需要装什么

- **Go 1.23+**：API 服务
- **Node.js 18+ / npm**：Web 服务
- **Python 3.11**：Bot 服务（建议用虚拟环境）
- **PostgreSQL 15**：本地直装或通过 Docker 启动均可
- **Docker / Docker Compose**：用于一键起 PostgreSQL，或验证完整 Compose 链路
- **make**：跑 Makefile 中的常用命令

如果只改某一个服务，可以只装对应栈，PostgreSQL 通过 Compose 起一份就够。

## 一键准备依赖

主仓 `Makefile` 提供了快速命令：

```bash
cd ember
make init    # 创建必要目录、复制 .env.example 到 .env
make setup   # 安装 Go / Web / Bot 依赖
```

`make init` 会做这几件事：

- 在 `services/api/`、`services/bot/`、`infrastructure/nginx/`、`infrastructure/database/backups/` 下建必要目录
- 把 `infrastructure/docker/.env.example` 复制为 `infrastructure/docker/.env`
- 把 `services/api/.env.example` 复制为 `services/api/.env`
- 把 `services/bot/.env.example` 复制为 `services/bot/.env`（如果存在）

`make setup` 会装：

- Go：`go mod download`
- Web：`npm ci`
- Bot：`pip install -r requirements.txt`

也可以自己跑 `make help` 看所有 target。

## 数据库怎么准备

最简单的方法是直接用 Compose 起一份本地 PostgreSQL：

```bash
cd ember/infrastructure/docker
docker compose up -d postgres
```

这会按 `.env` 里的 `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` 起一个独立 PostgreSQL，监听 `5432`。

然后让 API 直接连它（编辑 `services/api/.env`）：

```bash
DATABASE_URL=postgres://ember:<your-password>@localhost:5432/ember?sslmode=disable
```

API 启动期会自动应用全部迁移，不用手工跑 SQL。

## 分服务启动

### API

```bash
cd services/api
go run cmd/server/main.go
# 或 make dev-api（从仓库根目录）
```

端口 `8080`。健康检查 `http://localhost:8080/health`。

### Web

```bash
cd services/web
npm run dev
# 或 make dev-web
```

端口 `3000`，默认通过 vite 代理把 `/api/*` 转发到 `http://localhost:8080`。

### Bot

```bash
cd services/bot
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
python main.py
# 或 make dev-bot（使用系统 Python，建议先激活虚拟环境）
```

端口 `8000`。Bot 默认 webhook 模式需要公网，本地开发通常切到 `polling`：

```bash
# services/bot/.env
TELEGRAM_UPDATE_MODE=polling
```

或者用 [Cloudflared 本地联调](https://github.com/konghanghang/ember/blob/master/docs/runbooks/cloudflared-local-testing.md) 拿一条临时 HTTPS 隧道，继续用 webhook。

## 最小验证

每个服务最低跑这些命令确认改动没断：

| 服务 | 最小验证 |
|------|----------|
| API | `cd services/api && go vet ./... && go test ./... && go build ./...` |
| Web | `cd services/web && npm ci && npm run build` |
| Bot | `cd services/bot && pip install -r requirements.txt && python -m py_compile main.py` |

更细的测试与什么时候要补手工测试见 [测试与验证](./testing.md)。

## 常用 make 命令速查

| 命令 | 作用 |
|------|------|
| `make help` | 列出所有 target |
| `make init` | 初始化目录与 `.env` |
| `make setup` | 安装三服务依赖 |
| `make dev-api` / `make dev-web` / `make dev-bot` | 分服务启动 |
| `make build-api` / `make build-web` | 构建产物 |
| `make test-api` / `make test-web` / `make test-bot` / `make test` | 跑测试 |
| `make docker-up` / `make docker-down` / `make docker-logs` | Compose 管理 |
| `make db-backup` / `make db-restore FILE=xxx.sql` | 数据库备份恢复 |
| `make fmt-api` | Go 代码格式化 |
| `make clean` / `make clean-deps` / `make clean-docker` | 清理 |

## 相关文档

- [开发流程速览](./workflow.md)
- [测试与验证](./testing.md)
- [Docker Compose 部署](../deployment/docker-compose.md)
- [API 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/api/README.md)
- [Web 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/web/README.md)
- [Bot 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/bot/README.md)
- [Makefile（主仓）](https://github.com/konghanghang/ember/blob/master/Makefile)
