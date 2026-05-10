# 配置参考

Ember 的配置分三类。这一页只讲分类、必填项与重要边界，不重复完整字典。完整字典看 [配置参考（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/reference/configuration-reference.md)。

## 配置分三类

1. **API 部署期环境变量**
   - 由部署者通过 `.env` / Compose 注入
   - 包含数据库连接、签名密钥、加密主密钥、内部服务鉴权、Webhook 验签等「不应放进 UI」的边界配置
   - 修改要重启容器才生效

2. **API 运行期数据库配置（设置中心托管）**
   - 由管理员在 `/admin/settings` 在线修改
   - 落库到 `settings` 表
   - 大多数改完即时生效；调度类（cron）改完需要重启 API

3. **Bot 启动期环境变量**
   - 由部署者注入
   - 包含 Telegram token、webhook 地址、Internal 共享密钥
   - 修改要重启 Bot 容器

## 必填环境变量

`.env` 里这五项必须显式提供，否则 `docker compose up` 直接拒绝启动：

| 变量 | 用途 | 生成方式 |
|------|------|----------|
| `POSTGRES_USER` | PostgreSQL 用户名 | 自行决定，如 `ember` |
| `POSTGRES_PASSWORD` | PostgreSQL 密码 | `openssl rand -hex 16` |
| `JWT_SECRET` | JWT 签名密钥 | `openssl rand -hex 32` |
| `CONFIG_ENCRYPTION_KEY` | 设置中心敏感配置加密主密钥 | `openssl rand -hex 32` |
| `INTERNAL_API_SECRET` | API ↔ Bot 共享密钥 | `openssl rand -hex 32` |

`DATABASE_URL` 默认由 Compose 按 `POSTGRES_USER/PASSWORD/DB` 自动拼接到内置 PostgreSQL，**不用手动填**；指向独立 DB 时再显式覆盖。

启用 Bot 时（`docker compose --profile bot up -d`）额外必填：

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET`（webhook 模式必填）
- `WEBHOOK_URL`（webhook 模式必填，公网 HTTPS）

## 常用可选环境变量

下面这些在特定场景下才用得上：

| 变量 | 用途 |
|------|------|
| `ADMIN_USERNAME` | 默认 `admin`；首次启动用来初始化管理员 |
| `ADMIN_PASSWORD` | 显式指定首次管理员密码；留空时 API 生成临时口令并强制首次改密 |
| `EMBY_WEBHOOK_TOKEN` | 启用 Emby Webhook 入库回写时必填 |
| `STRIPE_WEBHOOK_SECRET` | 启用 Stripe Webhook 时必填，**只能走环境变量**，不进入设置中心 |
| `TURNSTILE_SECRET_KEY` | 启用 Turnstile 登录人机校验时必填，**只能走环境变量** |
| `CRON_ENABLED` | 是否启用 API 内置 cron，默认 `true` |
| `RANKING_CRON_ENABLED` | 是否启用排行榜 cron，默认 `false` |

## 设置中心托管的配置

下面这些项已经从 env 迁到了设置中心数据库，**不要再写进 `.env`**。首次启动后进 `/admin/settings` 补齐：

- 媒体集成：`EMBY_URL`、`EMBY_API_KEY`、`TMDB_API_KEY`、`MOVIEPILOT_URL`、`MOVIEPILOT_API_KEY`
- 邮件：`SMTP_HOST` / `SMTP_PORT` / `SMTP_USERNAME` / `SMTP_PASSWORD` / `SMTP_FROM` 与验证码限流参数
- 通知：`BOT_NOTIFY_URL`、`TELEGRAM_ADMIN_CHAT_ID`、`TELEGRAM_GROUP_CHAT_ID`
- 支付：`STRIPE_SECRET_KEY`、`STRIPE_SUCCESS_URL`、`STRIPE_CANCEL_URL`
- 调度：`CRON_SCHEDULE`、`CRON_TIMEZONE`、`RANKING_DAILY_SCHEDULE`、`RANKING_WEEKLY_SCHEDULE`、`TV_CALENDAR_*`
- 业务：`registration_mode`、`default_trial_days`、`email_verification`、`registration_allowed_email_domains`、`turnstile_login_enabled` 等

新空库部署后这些都是空，对应能力会处于「未配置」态（接口返回业务标志位，不会把它当成上游错误）。补齐后即时生效。

## 修改后是否需要重启

| 类别 | 是否需重启 |
|------|-----------|
| `.env` 里的环境变量 | 是（`docker compose up -d` 重建容器） |
| 设置中心 → 大多数业务配置 | 否（即时生效） |
| 设置中心 → 调度配置（`CRON_*`、`RANKING_*`、`TV_CALENDAR_*`） | 是（重启 API） |

## 关键密钥不要混用

下面这五把密钥彼此用途不同，**不要复用同一个值**：

- `JWT_SECRET`：用户登录态信任根
- `CONFIG_ENCRYPTION_KEY`：数据库敏感配置加密主密钥
- `INTERNAL_API_SECRET`：服务间信任根
- `STRIPE_WEBHOOK_SECRET`：Stripe 平台签名密钥
- `EMBY_WEBHOOK_TOKEN`：项目自定义的 Emby Webhook 口令

## 完整字典在哪

完整的配置项清单（含敏感性、是否需重启、来源、默认值）维护在主仓：

- [配置参考（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/reference/configuration-reference.md)
- [部署环境与配置（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md)

## 相关文档

- [Docker Compose 部署](./docker-compose.md)
- [升级与迁移](./upgrade.md)
- [部署排障](./troubleshooting.md)
- [配置参考（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/reference/configuration-reference.md)
- [部署环境与配置（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md)
- [.env.example（主仓）](https://github.com/konghanghang/ember/blob/master/infrastructure/docker/.env.example)
