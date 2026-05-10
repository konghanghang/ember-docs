# AI 协作指南

本文件用于约束 AI 在 `ember-docs` 仓库中的协作方式。

## 仓库定位

- 这是 Ember 的公开文档站。
- 站点分两个入口：用户指南（`/`、`/getting-started`、`/features/*`、`/community`、`/faq`、`/changelog`）与开发者指南（`/developer/*`）。
- 用户指南只写普通用户可见、可操作、可验证的使用说明。
- 开发者指南只写公开 OSS 使用者、部署者、贡献者视角的内容；深度内部细节由主仓 `ember/docs/` 承载。
- 这里不是内部架构文档仓库，也不是内部治理、发布流程、内部排障手册仓库。

## 核心原则

- 用户指南只写用户视角：只描述用户会看到什么、该点哪里、会发生什么。
- 开发者指南只写公开使用者视角：只描述部署者、二次开发者、贡献者会做什么、需要什么、能去哪里看更细。
- 不编造行为：功能、文案、入口、状态说明必须和实际产品 / 主仓行为一致。
- 不泄露内部细节：用户指南不写内部接口、数据库结构、配置项、部署方式；开发者指南只写公开必要的部分，不写内部治理、发布流程、内部排障 case 等。
- 保持直接：文案要短、清楚、能执行，不写空话，不写营销腔。
- 优先改边界：发现内容跨到不该承载的范围时，先删错位内容，不要硬补。

## 内容范围

### 用户指南

适合：

- 第一次使用指引
- 播放器推荐
- 用户控制台功能说明
- Telegram Bot 用户用法
- FAQ、更新记录、社群入口

不适合：

- 后端、前端、Bot 的实现细节
- API、数据库、环境变量、部署步骤
- 内部排障手册、测试手册、迁移方案
- 尚未上线或无法验证的功能规划

### 开发者指南

适合：

- 项目架构总览（高层、5 分钟读懂）
- 服务边界（API / Web / Bot）
- 仓库地图与技术栈
- Docker Compose 部署、必填配置、升级
- 部署排障入口（仅最高频症状，深入排障外链回主仓）
- 本地开发环境、最小验证命令
- 贡献指南（Issue / PR 模板说明、协议）

不适合：

- 完整的环境变量字典与枚举（外链回主仓 `docs/reference/configuration-reference.md`）
- 完整的数据模型字段表、API 端点目录
- 内部治理（多 Agent 协作、归档治理、计划目录治理、项目治理经验）
- 发布流程、Repo Public Checklist、release-process
- 内部排障 case（testing-troubleshooting、stripe-payment-testing、cloudflared-local-testing、database-* 等）
- 设计草稿、提案、归档（`docs/{plan,proposals,archive}/*`）

## 写作规则

- 所有内容使用中文。用户指南与开发者指南统一沿用「你」称呼读者；句子短；段落 2-4 句；多用列表与编号步骤；文末加 `## 相关文档`。
- 保留必要英文原文：路径、命令、代码标识符、产品名。
- 优先使用「先做什么，再做什么」的顺序表达。
- 一段只讲一件事，避免大段概念解释。
- 如果某个能力受账号状态、配置、版本影响，要明确写清前置条件和限制。
- 如果某个页面或入口名称已经在产品 / 主仓里固定，文档命名必须跟主仓一致。

## 主仓内部链接的写法

- 指向主仓内部文件时，一律使用 GitHub 公网 URL：`https://github.com/konghanghang/ember/blob/master/...`，目录用 `tree/master/...`。
- 禁止使用 `../ember/...` 这种相对仓库路径（读者不在你的本地）。
- 当主仓某个 runbooks / reference 升级或路径变更时，本仓只更新外链 URL，不复制内容。

## 修改要求

- 改文档前，先确认改动对应的真实产品行为或主仓内容已经存在。
- 改导航、目录、文案分流时，要同时检查：
  - `README.md`
  - `.vitepress/config.ts`
  - `index.md`
  - `developer/index.md`
  - 相关页面间的交叉链接
- 新增页面时，默认要补：
  - 站点导航或侧边栏入口
  - 首页 / 上级目录 / 相关页面的跳转入口
  - 必要的前置条件说明
  - 文末 `## 相关文档`，并至少包含 1 条主仓 GitHub URL（针对开发者指南页面）

## 禁止事项

- 不要提交 `node_modules/`
- 不要提交 `.vitepress/dist/`
- 不要提交 `.vitepress/cache/`
- 不要提交 `.DS_Store`
- 不要把主仓 `ember/docs/{archive,plan,proposals,reference,runbooks}` 下任何文件原样搬过来
- 不要把以下内部文档的实质内容重新写一份在本仓：
  - `docs/runbooks/{deployment-troubleshooting,testing-troubleshooting,manual-testing-checklist,release-process,repo-public-checklist,cloudflared-local-testing,stripe-payment-testing,database-migration-baseline,database-backup,docker-build-guide}.md`
  - `docs/reference/{multi-agent-collaboration-guide,project-governance-guide,archive-governance,plan-directory-governance,api-development-conventions,api-endpoint-catalog,api-response-standard,data-model-reference,web-design-guide,web-build-optimization-guide,web-information-architecture,bot-architecture-reference}.md`
  - `docs/{archive,plan,proposals}/*`
- 不要把「可能如此」「后续会支持」这类未落地内容写进公开文档

## 验证要求

提交前至少执行：

```bash
npm run docs:build
```

如改动了站点结构或链接，额外建议执行：

```bash
npm run docs:preview
```

构建失败时，不算完成。

## Git 与提交流程

- 不主动提交，除非用户明确要求。
- 提交前先确认 `npm run docs:build` 通过。
- 提交信息使用中文，保持简短明确。

推荐格式：

- `docs: 中文主题`
- `feat(docs): 中文主题`
- `fix(docs): 中文主题`

## 和主仓的边界

- 产品真实行为仍以主仓 `ember` 为准。
- 主仓 `ember/docs/` 是 Ember 文档的唯一真相源；本仓只承载「精选公开版」。
- 主仓功能或路径变化时，本仓需要同步更新对应页面与外链。
- 主仓内部治理（多 Agent 协作、归档治理、发布流程、内部排障、内部测试清单等）一律仅外链不复制。
