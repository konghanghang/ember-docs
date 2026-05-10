# Docker Compose 部署

这一页只回答一件事：怎么把 Ember 用 Docker Compose 跑起来。如果你想看更细的环境变量字典、迁移机制、构建细节，看完这页再去 [配置参考](./configuration.md) 与主仓的部署文档。

## 你需要什么

- 一台能跑 Docker 的机器（Linux / macOS / WSL，已装 Docker 与 Docker Compose）
- 公网或局域网都行；启用 Telegram Bot 的 webhook 模式时才需要公网 HTTPS
- 一个能输入命令的终端
- 大约 5 分钟

不需要：

- 数据库（Compose 会自带 PostgreSQL）
- 手动跑 SQL（`ember-api` 启动期会自动应用迁移）

## 5 步部署

### 1. 克隆仓库并进入 Docker 目录

```bash
git clone https://github.com/konghanghang/ember.git
cd ember/infrastructure/docker
cp .env.example .env
```

### 2. 生成必填密钥并填入 `.env`

四把必填密钥用 `openssl` 生成，把输出粘到 `.env` 对应行：

```bash
echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)"
echo "JWT_SECRET=$(openssl rand -hex 32)"
echo "CONFIG_ENCRYPTION_KEY=$(openssl rand -hex 32)"
echo "INTERNAL_API_SECRET=$(openssl rand -hex 32)"
```

如果你的机器没有 `openssl`（如 Windows 原生 PowerShell），用 WSL 或 Git Bash 跑这几行。

### 3. 拉镜像并启动

不启用 Telegram Bot（默认）：

```bash
docker compose pull
docker compose up -d
```

需要启用 Bot 的话，先在 `.env` 补齐 `TELEGRAM_BOT_TOKEN`、`TELEGRAM_WEBHOOK_SECRET`、`WEBHOOK_URL`，再跑：

```bash
docker compose pull
docker compose --profile bot up -d
```

### 4. 看首次登录用的临时口令

`.env` 里 `ADMIN_PASSWORD` 留空时，API 首启会生成一次性临时口令并写到日志里：

```bash
docker compose logs ember-api | grep "临时口令"
```

如果你在 `.env` 显式提供了 `ADMIN_PASSWORD`，跳过这一步，用你设置的密码登录即可。

### 5. 浏览器打开并改密

打开 `http://localhost`：

- 默认管理员用户名：`admin`
- 密码：上一步拿到的临时口令，或你显式设置的 `ADMIN_PASSWORD`

按提示完成首次改密。

## 必填密钥怎么生成

这四把密钥都不应使用示例值，且必须互不相同：

| 密钥 | 生成命令 | 用途 |
|------|----------|------|
| `POSTGRES_PASSWORD` | `openssl rand -hex 16` | 数据库密码 |
| `JWT_SECRET` | `openssl rand -hex 32` | JWT 签名根密钥 |
| `CONFIG_ENCRYPTION_KEY` | `openssl rand -hex 32` | 设置中心敏感配置加密主密钥 |
| `INTERNAL_API_SECRET` | `openssl rand -hex 32` | API ↔ Bot 内部通信共享密钥 |

修改 `JWT_SECRET` 后所有用户登录态会失效；修改 `CONFIG_ENCRYPTION_KEY` 会让数据库已存的敏感配置无法解密。生产部署后不要乱换。

## 首次登录

- 用户名 `admin` + 临时口令 / 你设置的 `ADMIN_PASSWORD`
- 系统会强制要求第一次登录立刻改密
- 改完密码后进 `/admin/settings` 补齐 Emby / TMDB / SMTP 等运行期配置（这部分由设置中心托管，可在线修改无需重启）

## 启用 Telegram Bot

`ember-bot` 通过 `profiles: ["bot"]` 控制，默认不启动。要启用：

1. 在 `.env` 填入：
   - `TELEGRAM_BOT_TOKEN`：从 BotFather 拿的 token
   - `TELEGRAM_WEBHOOK_SECRET`：用 `openssl rand -hex 32` 生成
   - `WEBHOOK_URL`：Bot 对外可达的公网 HTTPS 基地址（实际回调地址 = `${WEBHOOK_URL}/telegram/webhook`）
2. 启动：
   ```bash
   docker compose --profile bot up -d
   ```
3. 登录到 `/admin/settings` 补齐 `TELEGRAM_ADMIN_CHAT_ID` 与 `TELEGRAM_GROUP_CHAT_ID`。

如果还没准备好公网域名，可以临时用 `polling` 模式（在 `.env` 把 `TELEGRAM_UPDATE_MODE` 改为 `polling`）。`polling` 仅适合单实例。

## 确认服务正常

最小验证：

```bash
docker compose ps
curl http://localhost:8080/health
# 启用 Bot 时再加：
curl http://localhost:8000/health
```

预期：

- `postgres`、`ember-api`、`ember-web` 三个容器都是 `Up`（启用 Bot 时多一个 `ember-bot`）
- `GET http://localhost:8080/health` 返回 `200`
- 浏览器打开 `http://localhost` 能看到登录页

## 下一步

- 想理解每个变量怎么填：看 [配置参考](./configuration.md)
- 想升级新版本：看 [升级与迁移](./upgrade.md)
- 启动失败或某个能力不可用：看 [部署排障](./troubleshooting.md)
- 想理解 Ember 整体形状再继续：看 [架构总览](../architecture/overview.md)

## 相关文档

- [配置参考](./configuration.md)
- [升级与迁移](./upgrade.md)
- [部署排障](./troubleshooting.md)
- [部署指南（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment.md)
- [部署环境与配置（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md)
- [Docker 目录说明（主仓）](https://github.com/konghanghang/ember/blob/master/infrastructure/docker/README.md)
- [.env.example（主仓）](https://github.com/konghanghang/ember/blob/master/infrastructure/docker/.env.example)
