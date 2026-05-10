# 架构总览

这一页只回答一件事：Ember 的整体形状是什么样。看完你应该能回答「它由哪些服务组成、各自做什么、对外接哪些第三方」。

## 系统能做什么

Ember 是围绕 Emby 媒体服务器的用户管理与运营系统，覆盖：

- 用户注册 / 登录（开放注册或兑换码注册，可选邮箱验证码）
- Emby 账号生命周期（试用、续期、过期封禁、管理员手动启停）
- 兑换码（统一模型，注册门控 + 续期）
- Stripe 一次性支付与套餐方案
- 求片订阅（TMDB 搜索、管理员审批、MoviePilot 自动下载）
- 播放排行榜与用户播放画像
- Telegram Bot：通知推送、订阅审批、账号绑定 / 查询 / 续期
- 定时任务：过期检查、验证码清理、排行榜生成、追剧日历同步

## 三大服务边界

Ember 是一个 Monorepo，工作期由三个服务组成：

- **API（Go）**：所有业务逻辑、数据库、外部集成、定时任务的中心。默认端口 `8080`。
- **Web（Vue 3）**：登录页、首页、统一控制台、管理后台。默认通过 nginx 反代到 `http://localhost`。
- **Bot（Python）**：Telegram Bot 服务。负责接收 Telegram 用户命令调用 API，以及接收 API 推来的事件转发到 Telegram。默认端口 `8000`。

服务之间的关系：

- Web 通过浏览器走 `/api/v1/*` 调 API。
- Bot 通过 `INTERNAL_API_SECRET` 走内部 API 调 API；API 通过 `BOT_NOTIFY_URL` 火忘式推事件给 Bot。
- API 直接调 Emby、TMDB、MoviePilot、Stripe；Bot 不直连这些第三方。
- 三个服务共享同一份 PostgreSQL。

更细的服务职责见 [服务边界](./services.md)。

## 数据流（注册 → 兑换 → 使用 → 续费）

一条标准的用户旅程在 Ember 里是这样跑的：

1. **注册**：Web 调 API `/auth/register`。API 按注册模式校验兑换码或邮箱验证码，调 Emby 创建账号，落库本地用户，签发 JWT，火忘式通知 Bot「新用户注册」。
2. **登录**：Web 调 API `/auth/login`。API 优先以 Emby 为权威认证，签发 JWT。
3. **续期**：用户在续费中心选套餐 → API 创建 Stripe Checkout Session → 用户支付 → Stripe Webhook 回调 API → API 延长 `expiresAt`、解封 Emby 账号；或用户输入兑换码，API 在事务里完成 redemption + 续期。
4. **使用**：Web 与 Bot 走 API 查媒体统计、最近入库、播放排行、用户画像。
5. **过期**：API cron 周期性扫 `expiresAt < now` 的用户，调 Emby 设置 `IsDisabled=true`。

## 外部集成一览

| 集成 | 用途 | 谁调它 |
|------|------|--------|
| Emby | 用户开通 / 封禁、播放统计、媒体库 | API |
| TMDB | 影视元数据搜索、追剧日历 | API |
| MoviePilot | 求片审批后自动下载 | API |
| Stripe | 一次性支付与 Webhook 回调 | API |
| Telegram | 通知推送 / Bot 命令交互 | Bot 直连，API 走 Bot 中转 |

更细的集成清单见 [外部集成](./integrations.md)。

## 想看更细的架构

本页只承担「5 分钟读懂」。想要看完整的服务实现细节、handler 列表、cron 任务、数据模型等，去主仓的真相源：

- [系统架构（主仓）](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)
- [数据模型参考（主仓）](https://github.com/konghanghang/ember/blob/master/docs/reference/data-model-reference.md)
- [API 端点目录（主仓）](https://github.com/konghanghang/ember/blob/master/docs/reference/api-endpoint-catalog.md)

## 相关文档

- [服务边界](./services.md)
- [外部集成](./integrations.md)
- [仓库地图与技术栈](./repo-map.md)
- [系统架构（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)
