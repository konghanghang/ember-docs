# 仓库地图与技术栈

主仓 [`konghanghang/ember`](https://github.com/konghanghang/ember) 是 Monorepo。这一页帮你快速判断「我要改这个事，应该改哪里」。

## 目录约定

```
ember/
├── services/
│   ├── api/                # Go API 服务
│   ├── web/                # Vue 3 前端
│   └── bot/                # Python Telegram Bot
├── infrastructure/
│   ├── docker/             # Docker Compose、.env.example、Nginx 配置
│   └── database/           # 顶层 SQL migration（forward-only）
├── docs/                   # 文档中心（架构、参考、操作手册、提案、归档）
├── Makefile                # 开发常用命令入口
├── README.md
└── LICENSE                 # Apache License 2.0
```

`services/` 与 `infrastructure/` 是「业务代码」与「部署制品」的边界；`docs/` 是文档真相源。

## 技术栈一览

| 层 | 技术 |
|----|------|
| 后端 | Go 1.23 + Gin + GORM |
| 数据库 | PostgreSQL 15 |
| 前端 | Vue 3 + TypeScript + Element Plus + Tailwind CSS |
| Bot | Python 3.11 + python-telegram-bot + FastAPI |
| 支付 | Stripe（一次性支付，Checkout Session 模式） |
| 外部集成 | Emby、TMDB、MoviePilot、Stripe、Telegram |
| 定时任务 | robfig/cron/v3 |
| 部署 | Docker + Docker Compose + Nginx |

数据库 schema 命名约定：

- 表名、列名、索引名统一 `snake_case`
- Go / GORM 字段保持 `CamelCase`，通过显式 `gorm:"column:..."` 映射
- API / 前端 JSON 字段使用 `camelCase`

## 你应该改哪里

按你想改的事项找入口：

| 你想改 | 入口 |
|--------|------|
| 业务接口、定时任务、外部集成 | `services/api/` |
| 控制台页面、管理后台、前端样式 | `services/web/` |
| Telegram 命令、通知格式化 | `services/bot/` |
| 数据库 schema | `infrastructure/database/`（追加新的 forward-only SQL） |
| 部署、Compose、Nginx | `infrastructure/docker/` |
| 系统架构、参考、操作手册 | `docs/` |
| 跨服务命令、本地依赖、测试 | `Makefile` |

每个 `services/<name>/` 下有自己的 `README.md`，给出最小验证命令与目录骨架。改动前请打开看一眼。

## 想看每个服务的目录骨架

各服务目录与代码组织方式见对应 README：

- [`services/api/README.md`](https://github.com/konghanghang/ember/blob/master/services/api/README.md)
- [`services/web/README.md`](https://github.com/konghanghang/ember/blob/master/services/web/README.md)
- [`services/bot/README.md`](https://github.com/konghanghang/ember/blob/master/services/bot/README.md)

完整的目录骨架与文件级职责见主仓 [系统架构 §3](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)。

## 相关文档

- [架构总览](./overview.md)
- [服务边界](./services.md)
- [本地开发环境](../development/setup.md)
- [系统架构（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)
- [文档中心（主仓）](https://github.com/konghanghang/ember/blob/master/docs/README.md)
