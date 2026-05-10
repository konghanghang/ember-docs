---
layout: home

hero:
  name: Ember
  text: Emby 用户管理系统
  tagline: 用户找操作，开发者找部署与架构。两个入口，各自对路。
  actions:
    - theme: brand
      text: 我是用户
      link: /getting-started
    - theme: alt
      text: 我要部署或开发
      link: /developer/

features:
  - title: 我第一次登录该做什么
    details: 从概览、账号中心到续费和 Bot 绑定，按最短顺序带你走一遍。
  - title: 我还没有账号或忘了密码
    details: 直接看登录、注册与找回密码，先把账号接入链路走通。
  - title: 我想看片、找片或续费
    details: 再进入媒体库、订阅管理、追剧日历、续费中心这些高频页面。
  - title: 我要把 Ember 部署起来
    details: Docker Compose 一把梭，必填密钥怎么生成、首次登录怎么改密、Bot 怎么开。
  - title: 我想理解 Ember 的架构
    details: 三大服务边界、五个外部集成、数据流和仓库地图，5 分钟读懂。
  - title: 我想给 Ember 提 PR 或反馈问题
    details: 贡献指南、Issue / PR 模板、协议，全在开发者指南里。
---

# Ember 文档首页

这套站点分两个入口：

- **用户指南**：你是 Ember 的使用者，想知道菜单怎么用、播放器装哪个、Bot 怎么绑定，就走这里。
- **开发者指南**：你想自部署、二次开发或给项目提 PR，就走 [开发者指南](./developer/)。

## 你可以直接从这里分流

- 我还没登录或忘了密码：看 [登录、注册与找回密码](./features/account-access.md)
- 我第一次登录：看 [第一次使用](./getting-started.md)
- 我想了解控制台菜单都有什么：看 [功能地图](./features/overview.md)
- 我先装哪个播放器：看 [播放器推荐](./features/players.md)
- 我想用 Telegram Bot：看 [Telegram Bot](./features/telegram-bot.md)
- 我想进群或看通知：看 [社群与通知](./community.md)
- 我要部署 Ember 或贡献代码：看 [开发者指南](./developer/)

## 最短阅读顺序（用户）

如果你是第一次接触这个站，建议这样看：

1. [登录、注册与找回密码](./features/account-access.md)
2. [第一次使用](./getting-started.md)
3. [概览](./features/dashboard.md)
4. [账号中心](./features/account-center.md)
5. [Telegram Bot](./features/telegram-bot.md)

## 最短阅读顺序（开发者）

如果你想自部署或上手 Ember 代码：

1. [开发者总入口](./developer/)
2. [架构总览](./developer/architecture/overview.md)
3. [Docker Compose 部署](./developer/deployment/docker-compose.md)
4. [本地开发环境](./developer/development/setup.md)
5. [贡献指南](./developer/contributing.md)

## 高频操作

- 想查账号状态：看 [概览](./features/dashboard.md)
- 想改邮箱、密码或绑定 Bot：看 [账号中心](./features/account-center.md)
- 想看片：看 [媒体库](./features/library.md)
- 想找热门内容：看 [播放排行榜](./features/rankings.md)
- 想申请想看的内容：看 [订阅管理](./features/subscriptions.md)
- 想追更新：看 [追剧日历](./features/tv-calendar.md)
- 想续费：看 [续费中心](./features/payments.md)

## 这套文档适合谁

- 还没有账号、正在注册或需要找回密码的用户
- 想知道自己该装哪个播放器的用户
- 想快速学会网站菜单怎么用的用户
- 想知道 Bot 能做什么的用户
- 想找官网、聊天频道和入库通知入口的用户
- 想自部署 Ember、读懂架构、参与贡献的开发者

## 说明

- 用户指南只面向普通用户，不写部署、不写实现。
- 开发者指南只面向公开使用者、部署者、贡献者，深度内部细节去主仓 [`konghanghang/ember`](https://github.com/konghanghang/ember) 看。
- 两个入口互不替代，各走各路。
