# 服务边界

Ember 由三个服务组成。这一页只讲它们各自的职责、入口和最小验证方式，不讲实现细节。

## API 服务

**定位**：Go 后端，负责认证、用户生命周期、兑换码、订阅、支付、媒体能力、设置中心和 Bot 内部接口。所有业务逻辑、数据库读写、外部集成、定时任务都在这里。

**默认端口**：`8080`。

**健康检查**：`GET /health`。

**核心接口面**：

- 公开：登录、注册、忘记密码、Stripe Webhook、Emby Webhook、TMDB 搜索
- 用户认证：个人信息、兑换、媒体统计、最近入库、排行、支付、Telegram 绑定码、追剧日历
- 管理员：用户、兑换码、配置中心、订阅、会话、播放历史、媒体质量、设备、方案、支付、cron、Emby 账号自助绑定
- 内部（仅供 Bot 调用，需 `X-Internal-Secret`）：Bot 绑定 / 查询 / 兑换 / 重置密码 / 订阅，订阅审批

**最小验证**：

```bash
cd services/api
go vet ./...
go test ./...
go build ./...
```

实现细节看主仓 [`services/api/README.md`](https://github.com/konghanghang/ember/blob/master/services/api/README.md)。

## Web 服务

**定位**：Vue 3 + TypeScript 前端，承载首页、登录注册、统一控制台和管理后台。

**部署形态**：构建产物由 nginx 容器托管，反代 `/api/v1/*` 到 API 容器。

**核心页面分组**：

- 公开页：`HomeView`、`LoginView`、`RegisterView`、`ForgotPasswordView`
- 统一控制台 `/console/*`：概览、账号中心、订阅、追剧日历、排行、续费、画像
- 管理后台 `/admin/*`：用户、兑换码、设置、方案、支付、会话、播放历史、媒体质量、设备

**最小验证**：

```bash
cd services/web
npm ci
npm run build
```

实现细节看主仓 [`services/web/README.md`](https://github.com/konghanghang/ember/blob/master/services/web/README.md)。

## Bot 服务

**定位**：Python Telegram Bot，承担两类能力：

- 接收 Go API 推来的事件，转发到 Telegram
- 接收 Telegram 用户命令，调用 Go API Internal API

**默认端口**：`8000`。

**健康检查**：`GET /health`。

**核心入口**：

- 通知入口（要求 `X-Internal-Secret`）：`POST /notify/{subscription,registration,payment,ranking}`
- Telegram 入口：`POST /telegram/webhook`
- 用户命令：`/bind`、`/info`、`/redeem`、`/resetpw`、`/search`、`/refresh_menu`

**更新模式**：

- `webhook`（默认）：需要公网 HTTPS 地址供 Telegram 回调
- `polling`：单实例部署，Bot 主动拉取更新

**最小验证**：

```bash
cd services/bot
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
python -m py_compile main.py
python -m pytest tests
```

实现细节看主仓 [`services/bot/README.md`](https://github.com/konghanghang/ember/blob/master/services/bot/README.md)。

## 服务间如何调用

- **Web → API**：浏览器同源 `/api/v1/*`，由 nginx 反代到 API 容器。鉴权走 JWT。
- **API → Bot**：API 通过 `BOT_NOTIFY_URL` 火忘式 POST 到 Bot 的 `/notify/*`。鉴权走 `X-Internal-Secret`。
- **Bot → API**：Bot 处理 Telegram 命令时调用 `POST /api/v1/internal/*`。鉴权走 `X-Internal-Secret`。
- **三服务 → PostgreSQL**：API 直接连 PostgreSQL；Web 不连 DB；Bot 不连 DB（Bot 当前对运行期设置走 API Internal 读，仅 polling 租约锁直连 DB）。
- **API → Emby / TMDB / MoviePilot / Stripe**：API 直连。Bot 不直连这些第三方。

## 相关文档

- [架构总览](./overview.md)
- [外部集成](./integrations.md)
- [仓库地图与技术栈](./repo-map.md)
- [API 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/api/README.md)
- [Web 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/web/README.md)
- [Bot 服务（主仓）](https://github.com/konghanghang/ember/blob/master/services/bot/README.md)
