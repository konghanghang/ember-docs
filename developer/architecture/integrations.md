# 外部集成

Ember 接了五个外部系统。这一页只讲它们承担什么角色、被谁调用、需要哪些配置入口，不讲实现细节。

## Emby

Ember 的「依赖根」：Ember 不是媒体服务器，它围绕 Emby 提供用户管理。

**承担的角色**：

- 创建 / 封禁 / 解封 Emby 账号
- 修改 Emby 用户密码
- 拉取媒体库统计、最近入库、活跃会话、设备列表
- 提供登录权威认证（用户登录走 Emby `AuthenticateByName`）

**调用方**：API 直连。Bot 不直连。

**关键配置**：`EMBY_URL`、`EMBY_API_KEY`（设置中心托管，不再走 env）。

## TMDB

The Movie Database。

**承担的角色**：

- 影视元数据搜索（求片订阅、追剧日历搜索来源）
- 剧集季 / 集结构查询（用于整剧订阅完成度计算）
- 提供海报、评分、首播日期等公开元数据

**调用方**：API。

**关键配置**：`TMDB_API_KEY`（设置中心托管）。

## MoviePilot

媒体下载自动化平台。

**承担的角色**：

- 求片订阅审批通过后，由 API 下发到 MoviePilot 触发自动下载
- 缺集工单：API 调用 MoviePilot 搜索候选、下发选中候选

**调用方**：API。

**关键配置**：`MOVIEPILOT_URL`、`MOVIEPILOT_API_KEY`（设置中心托管，鉴权走 `X-API-KEY`）。

## Stripe

一次性支付平台（Checkout Session 模式）。

**承担的角色**：

- 用户在续费中心创建 Checkout Session 完成付费
- Stripe Webhook 回调，由 API 校验签名后落地支付状态、延长用户有效期

**调用方**：API 直连；浏览器跳到 Stripe Checkout 页面再回跳。

**关键配置**：

- `STRIPE_SECRET_KEY`（设置中心托管，敏感）
- `STRIPE_WEBHOOK_SECRET`（环境变量，敏感，**不进入设置中心**）
- `STRIPE_SUCCESS_URL` / `STRIPE_CANCEL_URL`（设置中心托管）

## Telegram

Telegram Bot 平台。

**承担的角色**：

- 推送 API 事件（注册、订阅审批、支付成功、播放排行）到管理员或群组
- 接收 Telegram 用户命令并调用 API Internal 接口完成绑定 / 兑换 / 查询 / 重置密码 / 订阅

**调用方**：Bot 服务直连 Telegram；API 不直连 Telegram，全部通过 Bot 中转。

**关键配置**：

- `TELEGRAM_BOT_TOKEN`（环境变量，Bot 启动必填）
- `TELEGRAM_WEBHOOK_SECRET`（webhook 模式必填）
- `WEBHOOK_URL`（webhook 模式必填，公网 HTTPS）
- `TELEGRAM_ADMIN_CHAT_ID` / `TELEGRAM_GROUP_CHAT_ID`（设置中心托管，env 仅作启动期兜底）

## 想看每项配置的完整字典

本页只列「集成是什么、谁调用、必需哪些配置」。完整字典（敏感性、是否需重启、设置中心 vs 环境变量边界）去主仓真相源：

- [配置参考（主仓）](https://github.com/konghanghang/ember/blob/master/docs/reference/configuration-reference.md)

## 相关文档

- [架构总览](./overview.md)
- [服务边界](./services.md)
- [配置参考](../deployment/configuration.md)
- [配置参考（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/reference/configuration-reference.md)
- [系统架构（主仓）](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)
